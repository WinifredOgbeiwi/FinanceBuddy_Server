import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { error } from "console";
import jsonwebtoken from "jsonwebtoken";

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
  const { firstName, lastName, email, password, occupation, location,paymentMode,role } =
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
        paymentMode,
        role
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
const editUsers = async (req, res) =>{
    
}
export { getUsers, registerUsers, editUsers };
