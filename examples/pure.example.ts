import { pure, save, trigger } from '../src/decorators/common';

const admin = Symbol('admin');

class Temp {
  @pure()
  [admin] = 13;

  @pure()
  someProp = 5;
  constructor(public admin1: string) {
    this.someProp = 6;
  }

  @save() // note: save must be first, if method can get error
  @pure()
  public someFn(@pure() someArg?: number, anotherNumber?: number): number | undefined {
    return undefined;
  }

  @save()
  @pure()
  public anotherFn(@pure() someArg?: number, @pure() anotherNumber?: number): number {
    return someArg || 1;
  }
}
const temp = new Temp('12345');
temp.someFn(1);
temp.anotherFn(1); // anotherFn argument at position: 1 is not pure
console.log('continue executing');
// console output:
