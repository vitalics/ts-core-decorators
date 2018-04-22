export interface WritableService<T> {
    writeToFile(path: string, data?: T | undefined): void;
}
