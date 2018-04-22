"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class ProfilerService {
    constructor(profileMap) {
        this.profileMap = profileMap;
    }
    getTotalDuration() {
        let totalDuration = 0;
        this.profileMap.forEach((value, key) => (totalDuration += value));
        return totalDuration;
    }
    getMaxDuration() {
        const durations = [];
        for (const item of [...this.profileMap.entries()]) {
            durations.push(item['1']);
        }
        return Math.max(...durations);
    }
    getAnalisysInfo() {
        const totalDuration = this.getTotalDuration();
        const maxDuration = this.getMaxDuration();
        const entries = [...this.profileMap.entries()];
        const findableMaxEntry = entries.find((entry) => entry['1'] === maxDuration) || ['', 0];
        const profiler = [...this.profileMap];
        const resultProfiler = [];
        for (const profile of profiler) {
            resultProfiler.push({ type: "execution" /* execution */, duration: profile['1'], function: profile['0'] });
        }
        resultProfiler.push({
            type: "longest" /* longest */,
            duration: findableMaxEntry['1'],
            function: findableMaxEntry['0']
        });
        resultProfiler.push({
            type: "total" /* total */,
            duration: totalDuration
        });
        return resultProfiler;
    }
    writeToFile(path) {
        const profiler = this.getAnalisysInfo();
        fs_1.writeFileSync(path, JSON.stringify(profiler));
    }
}
exports.ProfilerService = ProfilerService;
//# sourceMappingURL=profiler.service.js.map