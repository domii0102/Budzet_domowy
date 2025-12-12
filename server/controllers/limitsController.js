import mongoose from 'mongoose';
import * as z from 'zod';
import { Limit } from '../models/Limit.js';
import { Category } from '../models/Category.js'
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

    if (!month) {
        month = today.getMonth();
    }

    if (!year) {
        year = today.getFullYear();
    }

    let limits;

    try {
        limits = await Limit.find({ month: month, year: year });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: "A database error has occurred" });
    }

    return res.json({ success: true, data: limits });
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

export function editLimit(req, res) { };

export function deleteLimit(req, res) { };