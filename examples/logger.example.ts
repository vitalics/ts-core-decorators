import { Log } from '@typescript/helpers/decorators/common';
import { logService } from '@typescript/helpers/services/log';

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
