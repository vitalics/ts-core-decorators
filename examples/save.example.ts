import { save } from '../src/decorators/common/save.decorator';
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
