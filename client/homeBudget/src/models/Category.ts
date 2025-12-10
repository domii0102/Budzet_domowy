export enum Color {
    Red = "#fe6f6f",
    Blue = "#6fd0fe",
    Purple = "#736ffe",
    Pink = "#fe6fc2",
    Green = "#4adb42",
    Orange = "#feaa6f"
}

export class Category {
    id: string;
    name: string;
    color: Color;

    constructor(id: string, name: string, color: Color){
        this.id = id;
        this.name = name;
        this.color = color;
    }
}