"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("./structures/Client");
const client = new Client_1.FumoClient(true);
setTimeout(function () {
    console.log(`Random fumo: ${client.cache.random.URL}`);
}, 2500);
//# sourceMappingURL=index.js.map