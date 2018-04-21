import { writeFileSync, writeFile } from 'fs';
import { WritableService } from '../types';

export class ProfilerService implements WritableService<Map<string, number>> {
  public constructor(private profileMap: Map<string, number>) {}

  private getTotalDuration(): number {
    let totalDuration = 0;
    this.profileMap.forEach((value, key) => (totalDuration += value));
    return totalDuration;
  }

  private getMaxDuration(): number {
    const durations = [];

    for (const item of [ ...this.profileMap.entries() ]) {
      durations.push(item['1']);
    }
    return Math.max(...durations);
  }

  private getAnalisysInfo(): TimerifyInfo[] {
    const totalDuration = this.getTotalDuration();
    const maxDuration = this.getMaxDuration();

    const entries = [ ...this.profileMap.entries() ];

    const findableMaxEntry = entries.find((entry) => entry['1'] === maxDuration) || [ '', 0 ];

    const profiler = [ ...this.profileMap ];
    const resultProfiler: TimerifyInfo[] = [];
    for (const profile of profiler) {
      resultProfiler.push({ type: TimerifyInfoTypes.execution, duration: profile['1'], function: profile['0'] });
    }
    resultProfiler.push({
      type: TimerifyInfoTypes.longest,
      duration: findableMaxEntry['1'],
      function: findableMaxEntry['0']
    });
    resultProfiler.push({
      type: TimerifyInfoTypes.total,
      duration: totalDuration
    });
    return resultProfiler;
  }

  public writeToFile(path: string): void {
    const profiler = this.getAnalisysInfo();

    writeFileSync(path, JSON.stringify(profiler));
  }
}

interface TimerifyInfo {
  type: TimerifyInfoTypes;
  function?: string;
  duration: number;
}

const enum TimerifyInfoTypes {
  longest = 'longest',
  total = 'total',
  execution = 'execution'
}
