import { timerify } from '../src/decorators/performance';
import { Log } from '../src/decorators/common';

import { logService } from '../src/services/log';
import { performanceService } from '../src/services/performance';

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
