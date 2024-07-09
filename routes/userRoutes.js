import express from "express";
import {
  deleteUsers,
  editUsers,
  getUsers,
  loginUsers,
  registerUsers,
  getSingleUser,
} from "../controllers/userController.js";
import upload from "../middlewares/images.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getSingleUser);
router.post("/register", registerUsers);
router.put("/edit/:id", upload.single('image'),editUsers);
router.delete("/delete/:id", deleteUsers);
router.post("/login", loginUsers);
export default router;
