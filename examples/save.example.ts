import { save } from '../src/decorators/common/save.decorator';
import { SaveError } from '../src/errors';
class SaveDecoratorExample {
    @save()
    public static unsaveFunction2(arg: any): boolean {
        return arg.length > 0;
    }

    @save()
    public unsaveFunction(arg: any): boolean {
        return arg.length > 0;
    }
}
const saveDecoratorExample = new SaveDecoratorExample();

console.log('start executing');
saveDecoratorExample.unsaveFunction(null);
console.log('continue executing');
// console output:
// start executing
// SaveError: continue executing SaveDecoratorExample.unsaveFunction()
// continue executing
