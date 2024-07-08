import express from "express";
import { createExpenses, deleteExpenses, editexpenses, getExpenses, getSingleExpenses, getUserexpenses } from "../controllers/expensesController.js";

const router = express.Router();

router.get("/", getExpenses);
router.get("/:id", getSingleExpenses);
router.get("/user/:userId", getUserexpenses);
router.post("/add", createExpenses);
router.put("/edit/:id", editexpenses);
router.delete("/delete/:id", deleteExpenses);

export default router;
