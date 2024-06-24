import express from "express";
import {
  deleteUsers,
  editUsers,
  getUsers,
  loginUsers,
  registerUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/register", registerUsers);
router.put("/edit/:id", editUsers);
router.delete("/delete/:id", deleteUsers);
router.post("/login", loginUsers);
export default router;
