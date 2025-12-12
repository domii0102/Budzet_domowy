import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    color: {type: String, enum:["#fe6f6f", "#6fd0fe", "#736ffe", "#fe6fc2", "#4adb42", "#feaa6f"]}
})

export const Category = mongoose.model("Category", categorySchema);