import { performance } from 'perf_hooks';
import { PerformanceService } from '../../services/performance';

export function timerify<T = any>() {
  return function(
    target: Object,
    propertyKey: string,
    descriptor: NonNullable<TypedPropertyDescriptor<() => T | void | undefined>>
  ) {
    if (!PerformanceService.connected) {
      console.warn(`performance service is not connected. connectiong automatically`);
      PerformanceService.connect();
    }
    const oldDescriptor = descriptor.value;
    if (!oldDescriptor) {
      console.log(`oldDescriptor is undefined`);
      return;
    }
    descriptor.value = function(...args: any[]) {
      const fnResult = performance.timerify(oldDescriptor.bind(args))();
      return fnResult;
    };
  };
}
