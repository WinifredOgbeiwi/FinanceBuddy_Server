import savingModel from "../models/savingsModel.js";
import mongoose from "mongoose";

const getSavings = async (req, res) => {
  try {
    const savings = await savingModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(savings);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getSinglesavings = async (req, res) => {
  const { id } = req.params;
  try {
    const savings = await savingModel.findById(id);
    if (!savings) {
      return res.status(404).json({ error: "Savings not found" });
    }
    res.status(200).json(savings);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const createSavings = async (req, res) => {
  const { userId, description, amount, date, category } = req.body;

  try {
    const newSavings = await savingModel.create({
      userId,
      description,
      amount,
      date,
      category,
    });
    await newSavings.save();
    res
      .status(201)
      .json({ newExpenses: newSavings, message: "New Savings added" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editSavings = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid ID" });
    }
    const edit = await savingModel.findByIdAndUpdate(id, { ...req.body });

    if (!edit) {
      return res.status(404).json({ error: "Could not edit" });
    }

    res.status(200).json({ edit, message: "Savings updated successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteSavings = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: error.message });
    }
    const deleteSavings = await savingModel.findByIdAndDelete(id);
    res.status(200).json({
      deleteExpenses: deleteSavings,
      message: "Savings deleted successfully",
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getUserSavings = async (req, res) => {
  const userId = req.params.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const totalSavings = await savingModel.countDocuments({
      userId: userId,
    });
    const savings = await savingModel
      .find({ userId: userId })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      savings: savings,
      totalSavings: totalSavings,
      currentPage: page,
      totalPages: Math.ceil(totalSavings / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const getUserexpenses = async (req, res) => {
//   const userId = req.params.userId;
//   try {
//     const expenses = await savingModel.find({ userId: userId });
//     res.status(200).json({ expenses });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

export {
  createSavings ,
  getSavings ,
  getSinglesavings ,
  editSavings,
  deleteSavings ,
  getUserSavings ,
};
