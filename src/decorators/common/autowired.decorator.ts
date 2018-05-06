import 'reflect-metadata';

export function autowired(...args: any[]) {
    return function (target: any, propertyKey: string) {
        const type = Reflect.getMetadata('design:type', target, propertyKey);
        const instance = Reflect.construct(type, args || undefined);
        Reflect.defineMetadata(`${target}_aurowired`, { autowired: instance }, target);
        Reflect.defineProperty(target, propertyKey, {
            value: instance
        });
    };
}
