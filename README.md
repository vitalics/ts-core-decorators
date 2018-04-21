# ts-helpers
## typescript wrappers decorators and services

Motivation: decorators is cool :heart: :fire:

table of decorators:

| decorator |               arguments              |                                         description                                         |      target      |       service      |
|:---------:|:------------------------------------:|:-------------------------------------------------------------------------------------------:|:----------------:|:------------------:|
| Log       | toConosle - default is false         | logging all method calls and set to logService                                              |       class      | logService         |
| timerify  | -                                    | record function time execution. Also have statistic as total time and long execing function |      method      | performanceService |
| select    | map - Map<K,V> ot WeakMap<V> key - K | Select value by key from map like collection                                                |     property     | -                  |
| pure      | -                                    | checking function or argument for not undefined and throw error if is not pure              | method, argument | -                  |

### want get more usage? see examples below

usage: `@Log()` decorator
```ts
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

logService.writeToFile('./logger.json'); // writing result to file
```
another example:
```ts
import { Log } from 'ts-core-decorators/decorators/common';
import { logService } from 'ts-core-decorators/services/log';

@Log()
class Temp {
  constructor() {}

  someFn(test: number) {
    return test;
  }
}

const a = new Temp();
a.someFn(21);

logService.writeToFile('./logger.json'); // writing result to file
```

usage: `@timerify()` decorator

``` ts
import { timerify } from 'ts-core-decorators/decorators/performance';

import { PerformanceService } from 'ts-core-decorators/services/performance';

const performance = PerformanceService.connect(); // one time only. for example on prepare hook

class Temp {
  constructor() {}

  @timerify()
  public lognTask() {
    return 500;
  }
}

new Temp().lognTask(); // usage

performance.profiler.writeToFile('./profiler.json'); // write performance information to file
performance.disconect(); // clear GC from performance information. for example on destroy
```

usage: `@select()` decorator
```ts
import { select } from 'ts-core-decorators/decorators/collections';

const map: Map<string, number> = new Map();

map.set('test', 123);
map.set('test2', 4564);

class Temp {
  @select(map, 'test')
  public test?: number; // 123

  constructor() {
    console.log(this.test);
  }
}
```

usage: `@pure()` decorator
```ts
import { pure } from 'ts-core-decorators/decorators/common';

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
temp.anotherFn(1); // runtime error here. someArg is defined, but anotherNumber is not
```

More examples? Visit examples folder for more.
### Still question or problem? Write issue. Let's create more useful decorators together!