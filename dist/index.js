"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FumoClient = void 0;
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
;
class FumoClient {
    constructor(fetchAllFumos) {
        this.cache = new Map();
        this.url = 'http://fumoapi.herokuapp.com';
        this.fetchAllFumos = fetchAllFumos ?? false;
        if (this.fetchAllFumos)
            this.updateFumoCache();
    }
    get list() {
        return [...this.cache.values()];
    }
    get random() {
        return this.list[Math.floor(Math.random() * this.list.length)];
    }
    async request(path) {
        const res = await node_fetch_1.default(`${this.url}/${path}`);
        return await res.json();
    }
    async updateFumoCache() {
        const fumos = await this.fetchFumos();
        fumos
            .filter(({ _id }) => !this.cache.has(_id))
            .forEach((fumo) => this.cache.set(fumo._id, fumo));
    }
    async fetchFumos() {
        return await this.request("fumos");
    }
    async fetchFumo(id) {
        return await this.request(`fumos/${id}`);
    }
    async fetchRandomFumo() {
        return await this.request("fumos/random");
    }
}
exports.FumoClient = FumoClient;
//# sourceMappingURL=index.js.map