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
    public autoWired2!: Autowired2;

    @autowired()
    public autoWired!: Autowired; // note: ! symbol for strict mode
}

const temp = new Temp();
console.dir(temp.autoWired); // Autowired {someReadOnlyProp: 4}
console.dir(temp.autoWired2); // autowired2 {prop: "123"}
