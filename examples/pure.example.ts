import { pure } from '../decorators/common';

class Temp {
  constructor() {}

  @pure<number>()
  public someFn(@pure<number>() someArg?: number, anotherNumber?: number): number {
    return someArg || 1;
  }

  @pure<number>()
  public anotherFn(@pure<number>() someArg?: number, @pure<number>() anotherNumber?: number): number {
    return someArg || 1;
  }
}
const temp = new Temp();

temp.someFn(2, 3);
temp.anotherFn(1); // error here. someArg is defined, but anotherNumber is not
