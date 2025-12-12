import mongoose from 'mongoose';
import * as z from 'zod';
import { Category } from '../models/Category.js'
import {categorySchema} from '../schemas/categorySchema.js'
import { response } from 'express';


export async function getCategory(req, res) {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "Invalid category id" });
    };

    let category;
    try{
        category = await Category.findById(id);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ success: false, error: "A database error has occurred"});
    }
    

    if (!category) {
        return res.status(404).json({ success: false, error: "Category not found" });
    }

    return res.json({success: true, data: category});

};

export async function getCategories(req, res) {

    let categories;

    try{
        categories = await Category.find().sort({name: -1});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ success: false, error: "A database error has occurred"});
    }

    return res.json({success: true, data: categories});
};

export async function addCategory(req, res) {

    const result = categorySchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ success: false, error: z.flattenError(result.error) });
    }

    const {name, color} = result.data;

    const newCategory = {
        name: name,
        color: color
    };

    let createdCategory;
    try {
        createdCategory = await Category.create(newCategory);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ success: false, error: "A database error has occurred"});
    }

    return res.status(201).json({success: true, data: createdCategory })
    
 };

export function editCategory(req, res) { };

export function deleteCategory(req, res) { };