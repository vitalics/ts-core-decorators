export interface LogParameters {
    toConsole?: boolean;
}
/**
 * Class decorator allows to log all methods calls.
 * Will log method name and its arguments.
 */
export declare function Log(logParams?: LogParameters): any;
