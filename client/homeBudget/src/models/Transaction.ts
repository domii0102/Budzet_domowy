
export class Transaction {
    id: string
    name: string;
    value: number;
    date: Date;
    category_id: string;
    description?: string;

    constructor(id: string, name: string, value: number, date: Date, category_id: string, description?: string){
        this.id = id;
        this.name = name;
        this.value = value;
        this.date = date;
        this.category_id = category_id;
        this.description = description;
    }
}