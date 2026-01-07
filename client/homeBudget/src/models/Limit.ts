
export interface Limit {
    _id: string;
    value: number;
    category_id: string;
    month: number;
    year: number;
    spent?: number;
}

export interface newLimit {
    value: number;
    category_id: string;
    month: number;
    year: number;
}