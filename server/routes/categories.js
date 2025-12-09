import express from 'express';

const router = express.Router();

router.get("/categories/:id", getCategory);
router.get("/categories", getCategories);
router.post("/categories", addCategory);
router.put("/categories", editCategory);
router.delete("/categories", deleteCategory);