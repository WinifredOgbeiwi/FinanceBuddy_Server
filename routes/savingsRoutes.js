import express from "express";

import { createSavings, deleteSavings, editSavings, getSavings, getSinglesavings, getUserSavings } from "../controllers/savingsController.js";

const router = express.Router();

router.get("/", getSavings);
router.get("/:id", getSinglesavings);
router.get("/user/:userId", getUserSavings);
router.post("/add", createSavings);
router.put("/edit/:id", editSavings);
router.delete("/delete/:id", deleteSavings);

export default router;
