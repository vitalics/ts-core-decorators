import { parallel } from '../src/decorators/parallel/parallel.decorator';
import { parallelService } from '../src/services/parallel';

class Temp {
  constructor() {}

  @parallel()
  inParallelFunction() {
    console.log('worker executed');
  }
}

new Temp().inParallelFunction();

parallelService.writeToFile('./parallel.json');
