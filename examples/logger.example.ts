import { Log } from 'ts-core-decorators/decorators/common';
import { logService } from 'ts-core-decorators/services/log';

@Log({ toConsole: true })
class Temp {
  constructor() {}

  someFn(test: number) {
    return test;
  }
}

const a = new Temp();
a.someFn(21);

logService.writeToFile('./logger.json');
