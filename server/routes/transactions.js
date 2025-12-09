import express from 'express';

const router = express.Router();

router.get("/transaction/:id", getTransaction);
// z parametrów req.params wyciągnąć month i year
router.get("/transactions", getMonthlyTransactions);
router.post("/transactions", addTransaction);
router.put("/transactions", editTransaction);
router.delete("/transactions", deleteTransaction);