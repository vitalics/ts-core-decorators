import { timerify } from '../decorators/performance';
import { Log } from '../decorators/common';

import { logService } from '../services/log';
import { performanceService } from '../services/performance';

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
