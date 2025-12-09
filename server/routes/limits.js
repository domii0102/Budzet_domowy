import express from 'express';

const router = express.Router();

router.get("/limits/:id", getLimit);
// z parametrów req.params wyciągnąć month i year
router.get("/limits", getMonthlyLimits);
router.post("/limits", addLimit);
router.put("/limits", editLimit);
router.delete("/limits", deleteLimit);