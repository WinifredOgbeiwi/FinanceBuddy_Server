import express from "express";
import { createIncomes, deleteIncomes, editIncomes, getIncomes, getSingleIncome, getUserIncomes } from "../controllers/incomeController.js";

const router = express.Router();

router.get("/",getIncomes);
router.get("/:id",getSingleIncome);
router.get("/user/:userId",getUserIncomes)
router.post("/add", createIncomes);
router.put("/edit/:id", editIncomes);
router.delete("/delete/:id", deleteIncomes);

export default router;
