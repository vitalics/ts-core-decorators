# typescript core decorators
## typescript wrappers decorators and services

Motivation: decorators is cool :heart: :fire:

table of decorators:

| decorator |               arguments              |                                         description                                         |      target      |       service      |
|:---------:|:------------------------------------:|:-------------------------------------------------------------------------------------------:|:----------------:|:------------------:|
| log       | toConosle - default is false         | logging all method calls and set to logService                                              |       class      | logService         |
| timerify  | -                                    | record function time execution. Also have statistic as total time and long execing function |      method      | performanceService |
| select    | map - Map<K,V> ot WeakMap<V> key - K | Select value by key from map like collection                                                |     property     | -                  |
| pure      | -                                    | checking function or argument for not undefined and throw error if is not pure              | method, argument | -                  |
|autowired| args: any[]| creating new instance of type annotation | property | - |
| save | handler: () => never | make function `save` - if handler is not set - don't stop executing program| method| - |
| trigger | ProxyObject | make class as Proxy. Make intercept functions, contructor calling and may redirect to new target | class | - |
### want get more usage? see examples below

usage: `@autowired()` decorator:
```ts
import { autowired } from '../src/decorators/common';

class Autowired {
    public readonly someReadOnlyProp = 4;
}

class Autowired2 {
    constructor(private prop: string) {
    }
}

class Temp {

    @autowired('123')
    public autoWired2!: Autowired2; // create Autowired2 instance

    @autowired()
    public autoWired!: Autowired; // note: ! symbol for strict mode
}

const temp = new Temp();
console.dir(temp.autoWired); // Autowired {someReadOnlyProp: 4}
console.dir(temp.autoWired2); // Autowired2 {prop: "123"}
```


usage: `@log()` decorator
```ts
import { log } from 'ts-core-decorators/core/decorators/common';
import { logService } from 'ts-core-decorators/core/services/log';

@log({ toConsole: true })
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
import { Log } from 'ts-core-decorators/core/decorators/common';
import { logService } from 'ts-core-decorators/core/services/log';

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
import { timerify } from 'ts-core-decorators/core/decorators/performance';

import { PerformanceService } from 'ts-core-decorators/core/services/performance';

const performance = PerformanceService.connect(); // one time only. for example on prepare hook

class Temp {
  constructor() {}

  @timerify()
  public longTask() {
    return 500;
  }
}

new Temp().lognTask(); // usage

performance.profiler.writeToFile('./profiler.json'); // write performance information to file
performance.disconect(); // clear GC from performance information. for example on destroy
```

usage: `@select()` decorator
```ts
import { select } from 'ts-core-decorators/core/decorators/collections';

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
import { pure } from 'ts-core-decorators/core/decorators/common';

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


```ts 
import { save } from 'ts-core-decorators/core/decorators/common';
class SaveDecoratorExample {
    @save()
    public unsaveFunction(arg: any) {
        return arg.length > 0;
    }
}
const saveDecoratorExample = new SaveDecoratorExample();

console.log('start executing');
saveDecoratorExample.unsaveFunction(null);
console.log('continue executing');
// start executing
// cannot read property 'length' of null
// continue executing

```

``` ts
import { trigger } from 'ts-core-decorators/core/decorators/common';

@trigger({
    construct: function (target: any, arrayList: any) {
        const instance = new target(...arrayList) as Temp;
        // can use Temp methods here
        console.dir(instance);
        return instance;
    },
})
class Temp {
    constructor() { }

    public longTask() {
        console.log('long task executed');
        return 500;
    }
}

const temp = new Temp();
temp.longTask();

```
More examples? Visit examples folder for more.
### Still question or problem? Write issue. Let's create more useful decorators together!