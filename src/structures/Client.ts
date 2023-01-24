import { FumoCache, CacheOptions } from './Cache';
import fetch from 'node-fetch';

export interface FumoData {
    _id: string;
    URL: string;
    caption: string;
    fumos: string[];
}

/**
 * Client class for interacting with the cache and the Fumo api
 * @since 1.0.0
 */
export class FumoClient {
    /** Use cache instead of requests */
    public cacheOptions: CacheOptions;

    /** Default cache options */
    public defaultCacheOptions: CacheOptions = {
        enabled: true
    };

    /** The fumo cache, it will be empty if `fetchAllFumos` is set to false. */
    public cache = new FumoCache();

    /** The fumo api URl */
    public url = 'https://fumo-api.nosesisaid.com';

    public constructor(cacheOptions?: CacheOptions) {
        this.cacheOptions = cacheOptions || this.defaultCacheOptions;

        if (this.cacheOptions.customCache) {
            const isValid = this.validateCustomCache();

            if (!isValid)
                throw new Error(
                    'Custom cache provided isn\'t an instance of "FumoData[]"'
                );

            for (const value of this.cacheOptions.customCache) {
                this.cache.set(value._id, value);
            }
        } else if (this.cacheOptions.enabled) {
            this.updateFumoCache();
        }
    }

    /** Request for all the fumos in the fumo-api */
    public async fetchFumos() {
        const data = await this.request<true>('fumos');
        return data!;
    }

    /** Request for a fumo by its ID */
    public async fetchFumo(id: string) {
        return await this.request<false>(`fumos/${id}`);
    }

    /** Request a random fumo */
    public async fetchRandomFumo() {
        const data = await this.request<false>('random');
        return data!;
    }

    /** Request to the fumo api */
    public async request<T extends boolean>(
        path: string
    ): Promise<(T extends true ? FumoData[] : FumoData) | undefined> {
        const res = await fetch(`${this.url}/${path}`);

        if (
            res.headers.get('content-type') !== 'application/json' &&
            path.includes('/')
        )
            return;

        return res.json();
    }

    /** Update the fumo cache  */
    public async updateFumoCache() {
        const fumos = await this.fetchFumos();
        const notCachedFumos = fumos.filter(({ _id }) => !this.cache.has(_id));

        for (const fumo of notCachedFumos) this.cache.set(fumo._id, fumo);
    }

    /** Check if the custom cache provided is valid */
    public validateCustomCache() {
        const cache = this.cacheOptions.customCache!;

        return cache.every((value) => {
            return 'URL' in value || '_id' in value;
        });
    }
}
