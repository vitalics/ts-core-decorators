import { WritableService } from '../types';
export declare class ProfilerService implements WritableService<Map<string, number>> {
    private profileMap;
    constructor(profileMap: Map<string, number>);
    private getTotalDuration();
    private getMaxDuration();
    private getAnalisysInfo();
    writeToFile(path: string): void;
}
