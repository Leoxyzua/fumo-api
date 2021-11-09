This is a fork of the [fumo api](https://github.com/Nosesisaid/fumo-api), but better.

## Added
- A client class where all functions are passed
- Cache systems

**Install** with `npm install Leoxyzua/fumo-api#master` or `yarn add Leoxyzua/fumo-api#master`

## Example Usage
```js
const { FumoClient } = require('fumo-api');

const client = new FumoClient(true);

// Wait a bit for the fumos to get cached
setTimeout(function () {
    console.log(`Random fumo: ${client.random.URL}`)
}, 2500)
```