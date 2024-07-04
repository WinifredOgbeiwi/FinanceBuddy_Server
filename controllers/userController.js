import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { error } from "console";
import jsonwebtoken from "jsonwebtoken";
import mongoose from "mongoose";

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const registerUsers = async (req, res) => {
  const { firstName, lastName, email, password, occupation, location, role } =
    req.body;

  const exisitingUser = await userModel.findOne({ email });
  if (exisitingUser) {
    return res.status(400).json({ error: "Email already exisit" });
  }

  bcrypt.hash(password, 5, async (err, hash) => {
    if (err) return res.status(500).json({ error: err.message });

    try {
      const register = await userModel.create({
        firstName,
        lastName,
        email,
        password: hash,
        occupation,
        location,
        role,
      });
      res
        .status(200)
        .json({ user: register, message: "User registered successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

const editUsers = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    occupation,
    location,
    oldPassword,
    newPassword,
    role,
  } = req.body;

  try {
    const edit = await userModel.findById(id);

    if (!edit) {
      return res.status(404).json({ error: "User not found" });
    }

    if (firstName) edit.firstName = firstName;
    if (lastName) edit.lastName = lastName;
    if (occupation) edit.occupation = occupation;
    if (location) edit.location = location;
    if (role) edit.role = role;

    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, edit.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Old password is incorrect" });
      }
      3;
      const hashedPassword = await bcrypt.hash(newPassword, 5);
      edit.password = hashedPassword;
    }

    await edit.save();
    res.status(200).json({ edit, message: "User updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUsers = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUser = await userModel.findByIdAndDelete(id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: error.message });
    }

    res.status(200).json({ deleteUser, message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUsers = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jsonwebtoken.sign(
          { userId: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.status(200).json({ message: "Successful login", token, user });
      } else {
        res.status(400).json({ message: "Incorrect password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export {
  getUsers,
  registerUsers,
  editUsers,
  deleteUsers,
  loginUsers,
  getSingleUser,
};
