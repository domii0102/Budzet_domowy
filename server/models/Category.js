import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    color: {type: String, enum:["#FE6F6F", "#6FD0FE", "#736FFE", "#FE6FC2", "#4ADB42", "#FEAA6F"]}
})

export const Category = mongoose.Model("Category", categorySchema);