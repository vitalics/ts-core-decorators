"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class LogService {
    constructor() { }
    static append(logInfo) {
        this.loggerProfile.push(logInfo);
    }
    writeToFile(path, data = LogService.loggerProfile) {
        fs_1.writeFileSync(path, JSON.stringify(data));
    }
}
LogService.loggerProfile = [];
exports.LogService = LogService;
exports.logService = new LogService();
//# sourceMappingURL=log.service.js.map