import mongoose from 'mongoose';
import {Category} from './Category.js';



const transactionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    value: {type: Number, required: true},
    date: {type: Date, required: true},
    category_id: {type: mongoose.Schema.Types.ObjectId, ref: Category, required: true},
    description: {type: String, required:false}
})

export const Transaction = mongoose.Model("Transaction", transactionSchema);