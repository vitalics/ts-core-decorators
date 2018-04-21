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

const a = new Temp();
