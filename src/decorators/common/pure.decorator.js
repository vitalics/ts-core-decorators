"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const puresProperties = [];
const propertiesIndexes = [];
function pure() {
    return function (target, propertyKey, descriptorOrIndex) {
        if (typeof descriptorOrIndex === 'number') {
            return purePropertyDecorator(target, propertyKey, descriptorOrIndex);
        }
        else {
            return pureMethodDecorator(target, propertyKey, descriptorOrIndex);
        }
    };
}
exports.pure = pure;
function pureMethodDecorator(target, propertyKey, descriptor) {
    const oldDescriptor = descriptor.value;
    if (!oldDescriptor) {
        console.log(`oldDescriptor is undefined`);
        return;
    }
    descriptor.value = function (...args) {
        // const reMappedPuresDecorators: PurePropertyInfo[] = [];
        // puresProperties.map((value, index) => {
        //   console.log(value);
        // });
        puresProperties.sort((prev, next) => prev.index - next.index);
        const fnwithPuresDecorated = puresProperties.filter((value) => propertyKey === value.fnName);
        if (!args.length && fnwithPuresDecorated.length) {
            console.log(`${propertyKey} have pures parameters, but you are not set thems`);
            return {};
        }
        for (const item of fnwithPuresDecorated) {
            // tslint:disable-next-line:forin
            for (const argIndx in args) {
                const argIndex = parseInt(argIndx, 10);
                const propertyMetadata = Reflect.getMetadata(`${target.constructor.name}_${propertyKey}_${argIndx}`, target);
                if (argIndex !== item.index) {
                    throw new Error(`${item.fnName}() argument at position: ${item.index} is not pure`);
                }
                if (util_1.isUndefined(propertyMetadata)) {
                    throw new Error(`${item.fnName}() argument at position: ${item.index} is not pure`);
                }
                const index = propertyMetadata.index;
                if (propertyMetadata.pure &&
                    args[index] !== undefined &&
                    item === propertyMetadata &&
                    parseInt(argIndx, 10) === index) {
                    // is pure
                }
                else {
                    throw new Error(`${item.fnName}() argument at position: ${item.index} is not pure`);
                }
            }
        }
        const fnResult = oldDescriptor.apply(this, args);
        if (typeof fnResult === ('undefined' || 'null')) {
            try {
                throw new Error(`function ${propertyKey} result is ${fnResult} and not pure`);
            }
            catch (e) {
                console.log(e);
            }
        }
        return fnResult;
    };
}
function purePropertyDecorator(target, propertyKey, index) {
    const pureProperty = {
        index,
        pure: true,
        fnName: propertyKey
    };
    Reflect.defineMetadata(`${target.constructor.name}_${propertyKey}_${index}`, pureProperty, target);
    puresProperties.push(pureProperty);
    return {};
}
//# sourceMappingURL=pure.decorator.js.map