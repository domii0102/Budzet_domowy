
export interface Transaction {
    _id: string
    name: string;
    value: number;
    date: Date;
    category_id: string;
    description?: string;
}

export interface newTransaction {
    name: string;
    value: number;
    date: Date;
    category_id: string;
    description?: string;
}