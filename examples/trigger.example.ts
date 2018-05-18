import { trigger } from '../src/decorators/common/trigger.decorator';

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
