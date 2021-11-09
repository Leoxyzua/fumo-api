/**
 * The collection to save fumos in cache.
 * @since 2.0.0
 */
export class FumoCache<T> extends Map<string, T> {
    /** All the fumos saved in cache */
    get list() {
        return [...this.values()];
    }

    /** A random fumo */
    get random() {
        return this.list[Math.floor(Math.random() * this.list.length)];
    }
}