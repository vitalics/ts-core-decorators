export class PureError extends Error {
    public readonly name = 'PureError';
    constructor(public message: string, public target: 'property' | 'parameter' | 'method') {
        super(message);
    }
}
