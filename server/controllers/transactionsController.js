import mongoose from 'mongoose';
import * as z from 'zod';
import { Transaction } from '../models/Transaction.js';
import { Category } from '../models/Category.js'
import { monthAndYearSchema } from '../schemas/monthAndYearSchema.js';
import { transactionSchema } from '../schemas/transactionSchema.js';

export async function getTransaction(req, res) {

    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "Invalid transaction id" });
    };

    let transaction;

    try {
        transaction = await Transaction.findById(id);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: "A database error has occurred" });
    }

    if (!transaction) {
        return res.status(404).json({ success: false, error: "Transaction not found" });
    }

    return res.json({ success: true, data: transaction });
};

export async function getMonthlyTransactions(req, res) {

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

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 1);
    let transactions;

    try {
        transactions = await Transaction.find({
            date: {
                $gte: startDate,
                $lt: endDate
            }
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: "A database error has occurred" });
    }


    return res.json({ success: true, data: transactions });
};

export async function addTransaction(req, res) {


    const result = transactionSchema.safeParse(req.body);


    if (!result.success) {
        return res.status(400).json({ success: false, error: z.flattenError(result.error) });
    }

    const { name, value, date, category_id, description } = result.data;

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

    const newTransaction = {
        name: name,
        value: value,
        date: date,
        category_id: category_id,
        description: description
    };

    let createdTransaction;
    try {
        createdTransaction = await Transaction.create(newTransaction);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: "A database error has occurred" });
    }

    return res.status(201).json({ success: true, data: createdTransaction })

};

export function editTransaction(req, res) { };

export function deleteTransaction(req, res) { };