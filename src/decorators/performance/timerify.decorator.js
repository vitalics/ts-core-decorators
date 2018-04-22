"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const perf_hooks_1 = require("perf_hooks");
const performance_1 = require("../../services/performance");
function timerify() {
    return function (target, propertyKey, descriptor) {
        if (!performance_1.PerformanceService.connected) {
            console.warn(`performance service is not connected. connectiong automatically`);
            performance_1.PerformanceService.connect();
        }
        const oldDescriptor = descriptor.value;
        if (!oldDescriptor) {
            console.log(`oldDescriptor is undefined`);
            return;
        }
        descriptor.value = function (...args) {
            const fnResult = perf_hooks_1.performance.timerify(oldDescriptor.bind(args))();
            return fnResult;
        };
    };
}
exports.timerify = timerify;
//# sourceMappingURL=timerify.decorator.js.map