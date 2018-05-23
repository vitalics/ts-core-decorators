import 'reflect-metadata';
import { isPrimitive, isUndefined, isNullOrUndefined } from 'util';
import { PureError } from '../../errors';

const pureParameters: PurePropertyInfo[] = [];
const propertiesIndexes: number[] = [];

interface PurePropertyInfo {
  index: number;
  pure: boolean;
  fnName?: string | symbol;
}

export function pure(): any {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptorOrIndex: TypedPropertyDescriptor<any> | number
  ): void | TypedPropertyDescriptor<any> {
    const args = [...arguments];
    if (isUndefined(args[2])) {
      return pureProperty(target, propertyKey);
    }
    if (typeof descriptorOrIndex === 'number') {
      return pureParameter(target, propertyKey, descriptorOrIndex);
    }
    return pureMethod(target, propertyKey, descriptorOrIndex);
  };
}

function pureProperty(target: any, propertyKey: string | symbol) {

  const firstActualValue = target[propertyKey] as any;
  let isChanged = false;
  let value = firstActualValue;
  Object.defineProperty(target, propertyKey, {
    get: function () {
      if (isChanged) {
        if (isNullOrUndefined(value)) {
          if (isChanged && isNullOrUndefined(value)) {
            throw new PureError(`pure property:${target.constructor.name}.${propertyKey} is not defined`, 'property');
          }
          return firstActualValue;
        }
      }
      if (isNullOrUndefined(value)) {
        throw new PureError(`pure property:${value} is not defined`, 'property');
      }
      if (!isChanged) {
        if (isNullOrUndefined(value)) {
          throw new PureError(`pure property: ${value} is not defined`, 'property');
        }
      }
      return value;
    },
    set: function (newVal: any) {
      isChanged = true;
      if (isNullOrUndefined(newVal)) {
        throw new PureError(`${target.constructor.name}.${propertyKey}: cannot set null or undefined for pure property`, 'property');
      }
      value = newVal;
    }
  });
}

function pureMethod(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
  const oldDescriptor = descriptor.value as Function;
  if (!oldDescriptor) {
    throw new Error(`oldDescriptor is undefined`);
  }
  descriptor.value = function (...args: any[]) {
    //#region check for pure parameters
    try {
      pureParameters.sort((prev, next) => prev.index - next.index);
      const fnwithPuresDecorated = pureParameters.filter((value) => propertyKey === value.fnName);
      if (!args.length && fnwithPuresDecorated.length) {
        throw new PureError(`${propertyKey} have pures parameters, but they are not defined`, 'parameter');
      }
      for (const item of fnwithPuresDecorated) {
        // tslint:disable-next-line:forin
        for (const argIndx in args) {
          const argIndex = parseInt(argIndx, 10);
          const propertyMetadata: PurePropertyInfo | undefined = Reflect.getMetadata(
            `${target.constructor.name}_${propertyKey}_${item.index}`,
            target,
            propertyKey
          );

          if (argIndex !== item.index) {
            throw new PureError(`${item.fnName}() argument at position: ${item.index} is not pure`, 'parameter');
          }

          if (isUndefined(propertyMetadata)) {
            throw new PureError(`${item.fnName}() argument at position: ${item.index} is not pure`, 'parameter');
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
            throw new PureError(`${item.fnName}() argument at position: ${item.index} is not pure`, 'parameter');
          }
        }
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    //#endregion
    const fnResult = oldDescriptor.apply(this, args);
    if (isNullOrUndefined(fnResult)) {
      try {
        throw new PureError(
          `function ${propertyKey} result is ${fnResult} and not pure. Try to use @save decorator, for continue executing`, 'method'
        );
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
    return fnResult;
  };
  return descriptor;
}
function pureParameter(target: any, propertyKey: string | symbol, index: number) {
  const parameter: PurePropertyInfo = {
    index,
    pure: true,
    fnName: propertyKey
  };

  Reflect.defineMetadata(`${target.constructor.name}_${propertyKey}_${index}`, parameter, target, propertyKey);

  pureParameters.push(parameter);
}
