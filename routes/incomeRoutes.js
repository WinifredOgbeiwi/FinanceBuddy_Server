import express from "express";
import { createIncome, deleteIncome, editIncome, getIncomes, getSingleIncome } from "../controllers/incomeController.js";

const router = express.Router();

router.get("/",getIncomes);
router.get("/:id",getSingleIncome);
router.post("/add", createIncome);
router.put("/edit/:id", editIncome);
router.delete("/delete/:id", deleteIncome);
export default router;
