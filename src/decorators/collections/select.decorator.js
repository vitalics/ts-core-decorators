"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function select(map, key) {
    return function (target, propertyKey) {
        const mapLikePrototype = Object.getPrototypeOf(map);
        if (mapLikePrototype === Map.prototype) {
            const gettableMap = map;
            Reflect.defineProperty(target, propertyKey, {
                value: gettableMap.get(key)
            });
        }
        if (mapLikePrototype === WeakMap.prototype) {
            const gettableMap = map;
            const gettableKey = Object.create(key);
            Reflect.defineProperty(target, propertyKey, {
                value: gettableMap.get(gettableKey)
            });
        }
    };
}
exports.select = select;
//# sourceMappingURL=select.decorator.js.map