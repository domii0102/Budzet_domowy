export enum Color {
    Red = "#fe6f6f",
    Blue = "#6fd0fe",
    Purple = "#736ffe",
    Pink = "#fe6fc2",
    Green = "#4adb42",
    Orange = "#feaa6f"
}

export interface Category {
    _id: string;
    name: string;
    color: Color;

}

export interface newCategory{
    name: string;
    color: Color;
}