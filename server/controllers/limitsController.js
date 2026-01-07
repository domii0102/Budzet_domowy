import mongoose from 'mongoose';
import * as z from 'zod';
import { Limit } from '../models/Limit.js';
import { Category } from '../models/Category.js'
import { Transaction } from '../models/Transaction.js';
import { limitSchema} from '../schemas/limitSchema.js';
import { monthAndYearSchema } from '../schemas/monthAndYearSchema.js';


export async function getLimit(req, res) {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "Invalid limit id" });
    };

    let limit;

    try {
        limit = await Limit.findById(id);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: "A database error has occurred" });
    }

    if (!limit) {
        return res.status(404).json({ success: false, error: "Limit not found" });
    }

    return res.json({ success: true, data: limit });
};


export async function getMonthlyLimits(req, res) {
    const result = monthAndYearSchema.safeParse(req.query);
    if (!result.success) {
        return res.status(400).json({ success: false, error: z.flattenError(result.error) });
    }
    let { month, year } = result.data;
    const today = new Date();
    if (month === undefined || month === null) month = today.getMonth(); 
    if (!year) year = today.getFullYear();
    try {
        const limits = await Limit.find({ month: month, year: year }).lean();
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, Number(month) + 1, 0, 23, 59, 59);
        const spending = await Transaction.aggregate([
            {
                $match: {
                    date: { $gte: startDate, $lte: endDate },
                }
            },
            {
                $group: {
                    _id: "$category_id", 
                    totalSpent: { $sum: "$value" } 
                }
            }
        ]);
        const limitsWithSpending = limits.map(limit => {
            const categorySpending = spending.find(s => s._id.toString() === limit.category_id.toString());
            
            return {
                ...limit,
                spent: categorySpending ? categorySpending.totalSpent : 0
            };
        });

        return res.json({ success: true, data: limitsWithSpending });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: "A database error has occurred" });
    }
};

export async function addLimit(req, res) {

    const result = limitSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ success: false, error: z.flattenError(result.error) });
    }

    const { value, category_id, month, year } = result.data;

    if (!mongoose.Types.ObjectId.isValid(category_id)) {
        return res.status(400).json({ success: false, error: "Invalid category_id" });
    }

    let category;

    try {
        category = await Category.findById(category_id);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: "A database error has occurred" });
    }

    if (!category) {
        return res.status(404).json({ success: false, error: `Category with _id: ${category_id} not found` });
    }

    const newLimit = {
        value: value,
        category_id: category_id,
        month: month,
        year: year
    };

    let createdLimit;

    try{
        createdLimit = await Limit.create(newLimit);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: "A database error has occurred" });
    }

     return res.status(201).json({ success: true, data: createdLimit })
};

export async function editLimit(req, res) { 

    const result = limitSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ success: false, error: z.flattenError(result.error) });
    }

    const { value, category_id, month, year } = result.data;
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "Invalid limit id" });
    };

    if (!mongoose.Types.ObjectId.isValid(category_id)) {
        return res.status(400).json({ success: false, error: "Invalid category_id" });
    }

    let category;

    try {
        category = await Category.findById(category_id);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: "A database error has occurred" });
    }

    if (!category) {
        return res.status(404).json({ success: false, error: `Category with _id: ${category_id} not found` });
    }

    try {
        await Limit.findByIdAndUpdate(id, { value: value, category_id: category_id, month: month, year: year });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: "A database error has occurred" });
    }
    return res.json({ success: true, data: { value: value, category_id: category_id, month: month, year: year } });
};

export async function deleteLimit(req, res) { 
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "Invalid limit id" });
    };

    try {
        await Limit.findByIdAndDelete(id);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: "A database error has occurred" });
    };
    return res.json({ success: true, data: {} });

};