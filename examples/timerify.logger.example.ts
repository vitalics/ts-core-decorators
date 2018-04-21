import { timerify } from 'ts-core-decorators/decorators/performance';
import { Log } from 'ts-core-decorators/decorators/common';

import { logService } from 'ts-core-decorators/services/log';
import { performanceService } from 'ts-core-decorators/services/performance';

@Log()
class Temp {
  constructor() {}

  @timerify()
  someFn() {
    return 1;
  }

  @timerify()
  public lognTask() {
    return 500;
  }
}

const a = new Temp();
a.someFn();
a.lognTask();

logService.writeToFile('./logger.json');
performanceService.profiler.writeToFile('./performance.json');
