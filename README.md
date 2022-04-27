This is a fork of the [fumo api](https://github.com/Nosesisaid/fumo-api), but better.

## Added

-   A client class where all functions are passed
-   Cache systems

**Install** with `npm install @leoua/fumo-api` or `yarn add @leoua/fumo-api`

## Example Usage (no cache)

```js
const client = new FumoClient({ cache: false });

(async () => {
    const fumo = await client.fetchRandomFumo();

    console.log(fumo);
})();
```

## Working With Cache

```js
const client = new FumoClient({ cache: true });

// Wait a bit for the fumos to get cached
setTimeout(function () {
    console.log(`Random fumo: ${client.cache.random().URL}`);
}, 2500);
```

## Working With Custom Cache

```js
const myFumos = [
    {
        URL: 'https://tenor.com/view/yuyuko-yuyuko-saigyouji-touhou-fumo-touhou-fumo-gif-25089428',
        _id: 'yuyuko_dead',
        __v: 0,
    },
];

const client = new FumoClient({
    cache: true,
    customCache: myFumos,
});

console.log(client.cache.random()._id); // yuyuko_dead
```
