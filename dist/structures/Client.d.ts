import { FumoCache } from './Cache';
export interface FumoData {
    _id: string;
    URL: string;
    __v: number;
}
export declare class FumoClient {
    fetchAllFumos: boolean;
    cache: FumoCache<FumoData>;
    url: string;
    constructor(fetchAllFumos?: boolean);
    request<T extends boolean>(path: string): Promise<(T extends true ? FumoData[] : FumoData) | undefined>;
    updateFumoCache(): Promise<void>;
    fetchFumos(): Promise<FumoData[]>;
    fetchFumo(id: string): Promise<FumoData | undefined>;
    fetchRandomFumo(): Promise<FumoData>;
}
