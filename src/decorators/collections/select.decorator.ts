import 'reflect-metadata';

export type MapLike<K, V> = Map<K, V> | WeakMap<object, V>;

export function select<K, V>(map: MapLike<K, V>, key: K) {
  return function(target: Object, propertyKey: string): void | undefined {
    const mapLikePrototype = <MapLike<any, any>>Object.getPrototypeOf(map);
    if (mapLikePrototype === Map.prototype) {
      const gettableMap = <Map<K, V>>map;
      Reflect.defineProperty(target, propertyKey, {
        value: gettableMap.get(key)
      });
    }

    if (mapLikePrototype === WeakMap.prototype) {
      const gettableMap = <WeakMap<object, V>>map;
      const gettableKey = <object>Object.create(key);

      Reflect.defineProperty(target, propertyKey, {
        value: gettableMap.get(gettableKey)
      });
    }
  };
}
