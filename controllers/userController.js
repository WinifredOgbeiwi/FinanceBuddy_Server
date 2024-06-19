import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { error } from "console";
import jsonwebtoken from "jsonwebtoken";
import mongoose from "mongoose";

//getAllUser
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

// register users
const registerUsers = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    occupation,
    location,
    paymentMode,
    role,
  } = req.body;

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
        paymentMode,
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

//edit users
const editUsers = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    occupation,
    location,
    paymentMode,
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
    if (paymentMode) edit.paymentMode = paymentMode;
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
export { getUsers, registerUsers, editUsers, deleteUsers };
