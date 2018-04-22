import { ProfilerService } from './profiler.service';
export declare class PerformanceService {
    private static readonly Instance;
    static connected: boolean;
    private map;
    private profilerService;
    private obs;
    private constructor();
    static connect(): PerformanceService;
    disconect(): void;
    readonly profiler: ProfilerService;
}
export declare const performanceService: PerformanceService;
