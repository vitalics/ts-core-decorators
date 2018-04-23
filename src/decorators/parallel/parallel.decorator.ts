import { isUndefined, isNullOrUndefined } from 'util';
import { isMaster, fork, isWorker, workers, worker } from 'cluster';

import { ParallelService } from '../../services/parallel';

export function parallel<T>() {
  return function(
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => T | void>
  ) {
    const oldDecriptor = descriptor.value;
    if (isNullOrUndefined(oldDecriptor)) {
      throw new Error(`descriptor is not a function`);
    }
    descriptor.value = function(...args: any[]) {
      const fnresult = runParallel(oldDecriptor, this, args);
      return fnresult;
    };
  };
}

function runParallel(fn: (...args: any[]) => any, ...args: any[]) {
  if (isMaster) {
    fork();
  } else if (isWorker) {
    const executableFn = fn.bind(args);
    let name = fn.name;
    if (!name) {
      name = '<anonymous>';
    }
    const result = executableFn();
    ParallelService.append({ fn, args, name, result });

    worker.kill();
    worker.disconnect();
    return result;
  }
}
