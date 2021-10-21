export interface Data {
    _id: string;
    URL: string;
    __v: number;
}

export function allFumos(): Promise<Data[]>;

export function getFumoByID(id: string, allData: true): Promise<Data>;
export function getFumoByID(id: string, allData?: boolean): Promise<string>;
export function getFumoByID(id: string): Promise<string>;

export function randomFumo(allData: true): Promise<Data>;
export function randomFumo(allData?: boolean): Promise<string>;
export function randomFumo(): Promise<string>;