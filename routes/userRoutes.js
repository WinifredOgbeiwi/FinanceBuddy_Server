import express from "express";
import {
  deleteUsers,
  editUsers,
  getUsers,
  registerUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/register", registerUsers);
router.put("/edit/:id", editUsers);
router.delete("/delete/:id", deleteUsers);

export default router;
