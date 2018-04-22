"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../services/log");
/**
 * Class decorator allows to log all methods calls.
 * Will log method name and its arguments.
 */
function Log(logParams = { toConsole: false }) {
    return function (target) {
        // tslint:disable-next-line:forin
        for (const propertyName of Object.getOwnPropertyNames(target.prototype)) {
            const propertyValue = target.prototype[propertyName];
            const isMethod = propertyValue instanceof Function;
            if (!isMethod) {
                continue;
            }
            const descriptor = getMethodDescriptor(propertyName);
            const originalMethod = descriptor.value;
            // tslint:disable-next-line:only-arrow-functions
            descriptor.value = function (...args) {
                log_1.LogService.append({ fnName: propertyName, args: JSON.stringify(args) });
                if (logParams.toConsole) {
                    console.log(`called ${propertyName} with parameters: `, args);
                }
                // tslint:disable-next-line:no-invalid-this
                const result = originalMethod.value.apply(this, args);
                return result;
            };
            Object.defineProperty(target.prototype, propertyName, descriptor);
        }
        function getMethodDescriptor(propertyName) {
            if (target.prototype.hasOwnProperty(propertyName)) {
                return {
                    value: Object.getOwnPropertyDescriptor(target.prototype, propertyName)
                };
            }
            // create a new property descriptor for the base class' method
            return {
                configurable: true,
                enumerable: true,
                writable: true,
                value: target.prototype[propertyName]
            };
        }
    };
}
exports.Log = Log;
//# sourceMappingURL=log.decorator.js.map