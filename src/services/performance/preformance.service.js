"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const perf_hooks_1 = require("perf_hooks");
const profiler_service_1 = require("./profiler.service");
class PerformanceService {
    constructor() {
        this.map = new Map();
        this.profilerService = new profiler_service_1.ProfilerService(this.map);
        this.obs = new perf_hooks_1.PerformanceObserver((list) => {
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
        this.obs.observe({ entryTypes: ['function'] });
    }
    static connect() {
        this.connected = true;
        return this.Instance;
    }
    disconect() {
        PerformanceService.connected = false;
        if (!this.obs) {
            throw new Error(`performance observer is not defined`);
        }
        this.obs.disconnect();
        perf_hooks_1.performance.clearFunctions();
    }
    get profiler() {
        return this.profilerService;
    }
}
PerformanceService.Instance = new PerformanceService();
PerformanceService.connected = false;
exports.PerformanceService = PerformanceService;
exports.performanceService = PerformanceService.connect();
//# sourceMappingURL=preformance.service.js.map