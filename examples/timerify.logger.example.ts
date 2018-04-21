import { timerify } from '@ts-helpers/decorators/performance';
import { Log } from '@ts-helpers/decorators/common';

import { logService } from '@ts-helpers/services/log';
import { performanceService } from '@ts-helpers/services/performance';

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
