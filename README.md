This is a fork of the [fumo api](https://github.com/Nosesisaid/fumo-api), but better.

## Added
- A client class where all functions are passed
- Cache systems

**Install** with `npm install @leoua/fumo-api` or `yarn add @leoua/fumo-api`

## Example Usage
```js
const { FumoClient } = require('@leoua/fumo-api');

const client = new FumoClient(true);

// Wait a bit for the fumos to get cached
setTimeout(function () {
    console.log(`Random fumo: ${client.cache.random().URL}`)
}, 2500)
```