import express from 'express';
import {getTransaction, getMonthlyTransactions, addTransaction, editTransaction, deleteTransaction} from '../controllers/transactionsController.js'

const router = express.Router();

router.get("/:id", getTransaction);
// z parametrów req.params wyciągnąć month i year
router.get("/", getMonthlyTransactions);
router.post("/", addTransaction);
router.put("/", editTransaction);
router.delete("/", deleteTransaction);

export default router;