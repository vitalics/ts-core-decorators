export declare function timerify<T = any>(): (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<() => void | T | undefined>) => void;
