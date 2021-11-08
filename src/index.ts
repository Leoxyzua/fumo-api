import fetch from 'node-fetch';

export interface FumoData {
    _id: string;
    URL: string;
    __v: number;
};

export class FumoClient {
    fetchAllFumos: boolean;

    public cache: Map<string, FumoData> = new Map();
    private url = 'http://fumoapi.herokuapp.com';

    constructor(fetchAllFumos?: boolean) {
        this.fetchAllFumos = fetchAllFumos ?? false;

        if (this.fetchAllFumos) this.updateFumoCache();
    }

    get allFumos() {
        return [...this.cache.values()];
    }

    get randomFumo() {
        return this.allFumos[Math.floor(Math.random() * this.allFumos.length)];
    }

    getFumo(id: string) {
        return this.cache.get(id);
    }

    async request<T extends boolean>(path: string):
        Promise<T extends true
            ? FumoData[]
            : FumoData> {

        const res = await fetch(`${this.url}/${path}`);
        return await res.json();
    }

    async updateFumoCache() {
        const fumos = await this.fetchFumos();

        fumos
            .filter(({ _id }) => !this.cache.has(_id))
            .forEach((fumo) => this.cache.set(fumo._id, fumo));
    }

    async fetchFumos() {
        return await this.request<true>("fumos");
    }

    async fetchFumo(id: string) {
        return await this.request<false>(`fumos/${id}`);
    }

    async fetchRandomFumo() {
        return await this.request<false>("fumos/random");
    }
}