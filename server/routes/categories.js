import express from 'express';
import { getCategory, getCategories, addCategory, editCategory, deleteCategory } from '../controllers/categoriesController.js';

const router = express.Router();

router.get("/:id", getCategory);
router.get("/", getCategories);
router.post("/", addCategory);
router.put("/", editCategory);
router.delete("/", deleteCategory);

export default router;