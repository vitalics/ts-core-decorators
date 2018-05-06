import { log } from '../src/decorators';
import { logService } from '../src/services/log';

@log({ toConsole: true })
class Temp {
  constructor() {}

  someFn(test: number) {
    return test;
  }
}

const a = new Temp();
a.someFn(21);

logService.writeToFile('./logger.json');
