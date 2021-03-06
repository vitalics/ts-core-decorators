import { timerify } from '../src/decorators/performance';

import { PerformanceService } from '../src/services/performance';

const performance = PerformanceService.connect(); // one time only. for example on prepare hook

class Temp {
  constructor() {}

  @timerify()
  public longTask() {
    return 500;
  }
}

performance.profiler.writeToFile('./profiler.json'); // write performance information to file
performance.disconect(); // clear GC from performance information. for example on destroy
