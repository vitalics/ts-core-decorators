import 'reflect-metadata';


export function trigger<T extends object = object>(handler: ProxyHandler<T>): ClassDecorator {
    return function <U extends Function>(target: U): U {
        target = new Proxy(target as any, handler);
        return target;
    };
}
