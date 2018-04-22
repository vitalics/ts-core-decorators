import 'reflect-metadata';
export declare type MapLike<K, V> = Map<K, V> | WeakMap<object, V>;
export declare function select<K, V>(map: MapLike<K, V>, key: K): (target: Object, propertyKey: string) => void | undefined;
