import { isPrimitive, isUndefined } from 'util';

const puresProperties: PurePropertyInfo[] = [];
const propertiesIndexes: number[] = [];

interface PurePropertyInfo {
  index: number;
  pure: boolean;
  fnName?: string;
}

export function pure<T = NonNullable<T>>(): any {
  return function(
    target: Object,
    propertyKey: string,
    descriptorOrIndex: NonNullable<TypedPropertyDescriptor<NonNullable<() => T | undefined>>> | number
  ) {
    if (typeof descriptorOrIndex === 'number') {
      return purePropertyDecorator<T>(target, propertyKey, descriptorOrIndex);
    } else {
      return pureMethodDecorator<T>(target, propertyKey, descriptorOrIndex);
    }
  };
}

function pureMethodDecorator<T>(
  target: Object,
  propertyKey: string,
  descriptor: NonNullable<TypedPropertyDescriptor<() => T | undefined>>
) {
  const oldDescriptor = descriptor.value;
  if (!oldDescriptor) {
    console.log(`oldDescriptor is undefined`);
    return;
  }
  descriptor.value = function(...args: any[]): T {
    // const reMappedPuresDecorators: PurePropertyInfo[] = [];
    // puresProperties.map((value, index) => {
    //   console.log(value);
    // });
    puresProperties.sort((prev, next) => prev.index - next.index);
    const fnwithPuresDecorated = puresProperties.filter((value) => propertyKey === value.fnName);
    if (!args.length && fnwithPuresDecorated.length) {
      console.log(`${propertyKey} have pures parameters, but you are not set thems`);
      return <T>{};
    }
    for (const item of fnwithPuresDecorated) {
      // tslint:disable-next-line:forin
      for (const argIndx in args) {
        const argIndex = parseInt(argIndx, 10);
        const propertyMetadata: PurePropertyInfo | undefined = Reflect.getMetadata(
          `${target.constructor.name}_${propertyKey}_${argIndx}`,
          target
        );

        if (argIndex !== item.index) {
          throw new Error(`${item.fnName}() argument at position: ${item.index} is not pure`);
        }

        if (isUndefined(propertyMetadata)) {
          throw new Error(`${item.fnName}() argument at position: ${item.index} is not pure`);
        }

        const index: number = propertyMetadata.index;

        if (
          propertyMetadata.pure &&
          args[index] !== undefined &&
          item === propertyMetadata &&
          parseInt(argIndx, 10) === index
        ) {
          // is pure
        } else {
          throw new Error(`${item.fnName}() argument at position: ${item.index} is not pure`);
        }
      }
    }

    const fnResult = <T>oldDescriptor.apply(this, args);
    if (typeof fnResult === ('undefined' || 'null')) {
      try {
        throw new Error(`function ${propertyKey} result is ${fnResult} and not pure`);
      } catch (e) {
        console.log(e);
      }
    }
    return fnResult;
  };
}

function purePropertyDecorator<T>(target: Object, propertyKey: string, index: number) {
  const pureProperty: PurePropertyInfo = {
    index,
    pure: true,
    fnName: propertyKey
  };

  Reflect.defineMetadata(`${target.constructor.name}_${propertyKey}_${index}`, pureProperty, target);

  puresProperties.push(pureProperty);
  return <T>{};
}
