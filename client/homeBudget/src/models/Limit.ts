
export class Limit {
    id: string;
    value: number;
    category_id: string;
    month: number;
    year: number;

    constructor(id: string, value: number, category_id: string, month: number, year: number){
        this.id = id;
        this.value = value;
        this.category_id = category_id;
        this.month = month;
        this.year = year;
    }
}