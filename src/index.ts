import { FumoClient } from './structures/Client';

const client = new FumoClient(true);

// Wait a bit for the fumos to get cached
setTimeout(function () {
    console.log(`Random fumo: ${client.cache.random.URL}`)
}, 2500)