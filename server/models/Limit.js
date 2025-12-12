import mongoose from 'mongoose';
import { Category } from './Category.js';


const limitSchema = new mongoose.Schema({
    value: {type: Number, required:true},
    category_id: {type: mongoose.Schema.Types.ObjectId, ref: Category, required: true},
    month: {type: Number, required:true},
    year: {type: Number, required:true}
})

export const Limit = mongoose.model("Limit", limitSchema);