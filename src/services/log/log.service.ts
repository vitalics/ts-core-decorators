import { WritableService } from '../types';
import { writeFileSync } from 'fs';

interface LogInfo {
  fnName: string;
  args: string | string[];
}

export class LogService implements WritableService<LogInfo[]> {
  private static loggerProfile: LogInfo[] = [];

  public constructor() {}

  public static append(logInfo: LogInfo): void {
    this.loggerProfile.push(logInfo);
  }

  writeToFile(path: string, data: LogInfo[] = LogService.loggerProfile): void {
    writeFileSync(path, JSON.stringify(data));
  }
}

export const logService = new LogService();
