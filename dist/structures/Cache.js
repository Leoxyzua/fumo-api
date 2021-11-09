"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FumoCache = void 0;
class FumoCache extends Map {
    get list() {
        return [...this.values()];
    }
    get random() {
        return this.list[Math.floor(Math.random() * this.list.length)];
    }
}
exports.FumoCache = FumoCache;
//# sourceMappingURL=Cache.js.map