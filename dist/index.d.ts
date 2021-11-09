export interface FumoData {
    _id: string;
    URL: string;
    __v: number;
}
export declare class FumoClient {
    fetchAllFumos: boolean;
    cache: Map<string, FumoData>;
    private url;
    constructor(fetchAllFumos?: boolean);
    get list(): FumoData[];
    get random(): FumoData;
    request<T extends boolean>(path: string): Promise<T extends true ? FumoData[] : FumoData>;
    updateFumoCache(): Promise<void>;
    fetchFumos(): Promise<FumoData[]>;
    fetchFumo(id: string): Promise<FumoData>;
    fetchRandomFumo(): Promise<FumoData>;
}
