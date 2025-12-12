import express from 'express';
import {getLimit, getMonthlyLimits, addLimit, editLimit, deleteLimit} from '../controllers/limitsController.js'

const router = express.Router();

router.get("/:id", getLimit);
// z parametrów req.params wyciągnąć month i year
router.get("/", getMonthlyLimits);
router.post("/", addLimit);
router.put("/", editLimit);
router.delete("/", deleteLimit);

export default router;