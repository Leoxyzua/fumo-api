export declare class FumoCache<T> extends Map<string, T> {
    get list(): T[];
    get random(): T;
}
