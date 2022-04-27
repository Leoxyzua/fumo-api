import { FumoData } from './Client';

export type RandomCacheFilter = (fumo: FumoData) => boolean;

export interface CacheOptions {
    enabled: boolean;
    customCache?: FumoData[];
}

/**
 * The collection to save fumos in cache.
 * @since 2.0.0
 */
export class FumoCache extends Map<string, FumoData> {
    /** All the fumos saved in cache */
    public get list() {
        return [...this.values()];
    }

    /** A random fumo */
    public random(): FumoData;
    public random(filter: RandomCacheFilter): FumoData | undefined;
    public random(filter?: RandomCacheFilter) {
        const array = filter ? this.list.filter(filter) : this.list;
        return array[Math.floor(Math.random() * array.length)];
    }
}
