export function save(handler?: () => never): MethodDecorator {
    return function (
        target: object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): void | TypedPropertyDescriptor<any> {
        const oldDescriptor = descriptor.value as Function;

        descriptor.value = function (...args: any[]): any {
            try {
                oldDescriptor.apply(this, args);
            } catch (e) {
                console.error(e);
                if (handler) {
                    handler.apply(this, args);
                }
            }
        };
        return descriptor;
    };
}
