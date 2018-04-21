import { timerify } from '@typescript/helpers/decorators/performance';
import { Log } from '@typescript/helpers/decorators/common';

import { logService } from '@typescript/helpers/services/log';
import { performanceService } from '@typescript/helpers/services/performance';

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
