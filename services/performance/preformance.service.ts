import { PerformanceObserver, performance } from 'perf_hooks';
import { ProfilerService } from './profiler.service';
import { WritableService } from '../types';

export class PerformanceService {
  private static readonly Instance: PerformanceService = new PerformanceService();

  public static connected = false;
  private map: Map<string, number> = new Map();

  private profilerService = new ProfilerService(this.map);

  private obs: PerformanceObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    for (const entry of entries) {
      const duration = entry.duration;

      let name = entry.name;
      if (name === 'Object') {
        name = 'object constructor';
      }
      this.map.set(name, duration);
    }
  });

  private constructor() {
    this.obs.observe({ entryTypes: [ 'function' ] });
  }

  public static connect() {
    this.connected = true;
    return this.Instance;
  }

  public disconect() {
    PerformanceService.connected = false;
    if (!this.obs) {
      throw new Error(`performance observer is not defined`);
    }
    this.obs.disconnect();
    performance.clearFunctions();
  }

  public get profiler(): ProfilerService {
    return this.profilerService;
  }
}

export const performanceService = PerformanceService.connect();
