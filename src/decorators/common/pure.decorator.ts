import 'reflect-metadata';
import { isPrimitive, isUndefined } from 'util';

const puresProperties: PurePropertyInfo[] = [];
const propertiesIndexes: number[] = [];

interface PurePropertyInfo {
  index: number;
  pure: boolean;
  fnName?: string;
}

export function pure<T>(): any {
  return function(
    target: Object,
    propertyKey: string,
    descriptorOrIndex: TypedPropertyDescriptor<() => T | undefined> | number
  ): MethodDecorator | PropertyDecorator {
    checkForPurityProperties(target, propertyKey);

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
  descriptor: TypedPropertyDescriptor<() => T | undefined>
): MethodDecorator {
  const oldDescriptor = descriptor.value;
  if (!oldDescriptor) {
    throw new Error(`oldDescriptor is undefined`);
  }
  return (descriptor.value = function(...args: any[]): T {
    const fnResult = <T>oldDescriptor.apply(this, args);
    if (typeof fnResult === ('undefined' || 'null')) {
      try {
        throw new Error(`function ${propertyKey} result is ${fnResult} and not pure`);
      } catch (e) {
        console.log(e);
      }
    }
    return fnResult;
  });
}

function purePropertyDecorator<T>(target: Object, propertyKey: string, index: number): PropertyDecorator {
  const pureProperty: PurePropertyInfo = {
    index,
    pure: true,
    fnName: propertyKey
  };

  Reflect.defineMetadata(`${target.constructor.name}_${propertyKey}_${index}`, pureProperty, target);

  puresProperties.push(pureProperty);

  Reflect.defineProperty(target, propertyKey, {
    value: checkForPurityProperties
  });
  return () => void 0;
}

interface Iteratable<T> {
  [name: string]: T | any;
}

function checkForPurityProperties(target: Iteratable<Object>, propertyKey: string) {
  const oldDescriptor = target[propertyKey];

  return (target[propertyKey] = function(...args: any[]) {
    puresProperties.sort((prev, next) => prev.index - next.index);
    const fnwithPuresDecorated = puresProperties.filter((value) => propertyKey === value.fnName);
    if (!args.length && fnwithPuresDecorated.length) {
      throw new Error(`${propertyKey} have pures parameters, but they are not defined`);
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
  });
}
