import 'reflect-metadata';


/**
 * @param args args for constructor
 * @description auto creating new instance with args
 */
export function autowired(...args: any[]) {
    return function (target: any, propertyKey: string) {
        const type = Reflect.getMetadata('design:type', target, propertyKey);
        const instance = Reflect.construct(type, args || undefined);
        Reflect.defineMetadata(`${target}_autowired`, { autowired: instance }, target);
        Reflect.defineProperty(target, propertyKey, {
            value: instance
        });
    };
}
