import { WritableService } from '../types';
import { writeFileSync } from 'fs';
import { isUndefined, isNull } from 'util';

export interface ParallelInfo {
  fn: Function;
  name?: string;
  args?: any[];
  result?: any | undefined;
}

export class ParallelService implements WritableService<ParallelInfo[]> {
  public static readonly instance = new ParallelService();
  private static parallelInfoResult: ParallelInfo[] = [];

  constructor() {}
  static append(parallelInfo: ParallelInfo): void {
    this.parallelInfoResult.push(parallelInfo);
  }
  writeToFile(path: string, data: ParallelInfo[] | undefined = ParallelService.parallelInfoResult): void {
    for (const parallelInfo of data) {
      if (isUndefined(parallelInfo.result)) {
        parallelInfo.result = 'undefined';
      }
      if (isNull(parallelInfo.result)) {
        parallelInfo.result = 'null';
      }
      if (isNaN(parallelInfo.result)) {
        parallelInfo.result = 'NaN';
      }
    }
    writeFileSync(path, JSON.stringify(data));
  }
}

export const parallelService = new ParallelService();
