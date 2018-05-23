import { PureError } from '../../errors';

export function save(error?: Error): MethodDecorator {
    return function (
        target: object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): void | TypedPropertyDescriptor<any> {
        const oldDescriptor = descriptor.value as Function;

        descriptor.value = function (...args: any[]): any {
            try {
                const fnResult = oldDescriptor.apply(this, args);
                return fnResult;
            } catch (e) {
                if (error) {
                    console.error(error);
                    throw error;
                }
                if (e.name === PureError.name) {
                    const saveError = new SaveError(
                        `continue executing ${target.constructor.name}.${propertyKey}(), even ${e.target} is not pure`
                    );
                    console.error(saveError);
                } else {
                    const saveError = new SaveError(`continue executing ${target.constructor.name}.${propertyKey}()`);
                    console.error(saveError);
                }
            }
        };
        return descriptor;
    };
}

class SaveError extends TypeError { }
