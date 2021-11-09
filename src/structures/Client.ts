import { FumoCache } from './Cache';
import fetch from 'node-fetch';

export interface FumoData {
    _id: string;
    URL: string;
    __v: number;
};

/**
 * Client class for interacting with the cache and the fumo api
 * @since 1.0.0
 */
export class FumoClient {
    fetchAllFumos: boolean;

    /** The fumo cache, it will be empty if `fetchAllFumos` is set to false. */
    public cache: FumoCache<FumoData> = new FumoCache();;
    /** The fumo api URl */
    public url = 'http://fumoapi.herokuapp.com';

    constructor(fetchAllFumos?: boolean) {
        this.fetchAllFumos = fetchAllFumos ?? true;

        if (this.fetchAllFumos) this.updateFumoCache();
    }

    /** Request to the fumo api */
    async request<T extends boolean>(path: string):
        Promise<T extends true
            ? FumoData[]
            : FumoData> {

        const res = await fetch(`${this.url}/${path}`);
        return await res.json();
    }

    /** Update the fumo cache  */
    async updateFumoCache() {
        const fumos = await this.fetchFumos();

        fumos
            .filter(({ _id }) => !this.cache.has(_id))
            .forEach((fumo) => this.cache.set(fumo._id, fumo));
    }

    /** Request for all the fumos in the fumo-api */
    async fetchFumos() {
        return await this.request<true>("fumos");
    }

    /** Request for a fumo by its ID */
    async fetchFumo(id: string) {
        return await this.request<false>(`fumos/${id}`);
    }

    /** Request a random fumo */
    async fetchRandomFumo() {
        return await this.request<false>("fumos/random");
    }
}