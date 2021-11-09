"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FumoClient = void 0;
const tslib_1 = require("tslib");
const Cache_1 = require("./Cache");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
;
class FumoClient {
    constructor(fetchAllFumos) {
        this.cache = new Cache_1.FumoCache();
        this.url = 'https://fumoapi.herokuapp.com';
        this.fetchAllFumos = fetchAllFumos ?? true;
        if (this.fetchAllFumos)
            this.updateFumoCache();
    }
    ;
    async request(path) {
        const res = await node_fetch_1.default(`${this.url}/${path}`);
        if (res.headers.get("content-type") !== 'application/json'
            && path.includes('/'))
            return;
        return await res.json();
    }
    async updateFumoCache() {
        const fumos = await this.fetchFumos();
        fumos
            .filter(({ _id }) => !this.cache.has(_id))
            .forEach((fumo) => this.cache.set(fumo._id, fumo));
    }
    async fetchFumos() {
        const data = await this.request("fumos");
        return data;
    }
    async fetchFumo(id) {
        return await this.request(`fumos/${id}`);
    }
    async fetchRandomFumo() {
        const data = await this.request("random");
        return data;
    }
}
exports.FumoClient = FumoClient;
//# sourceMappingURL=Client.js.map