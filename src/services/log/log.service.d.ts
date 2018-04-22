import { WritableService } from '../types';
export interface LogInfo {
    fnName: string;
    args: string | string[];
}
export declare class LogService implements WritableService<LogInfo[]> {
    private static loggerProfile;
    constructor();
    static append(logInfo: LogInfo): void;
    writeToFile(path: string, data?: LogInfo[]): void;
}
export declare const logService: LogService;
