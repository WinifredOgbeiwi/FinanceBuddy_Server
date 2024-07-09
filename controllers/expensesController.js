import expensesModel from "../models/expensesModel.js";
import mongoose from "mongoose";
const getExpenses = async (req, res) => {
  try {
    const expenses = await expensesModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getSingleExpenses = async (req, res) => {
  const { id } = req.params;
  try {
    const expenses = await expensesModel.findById(id);
    if (!expenses) {
      return res.status(404).json({ error: "expenses not found" });
    }
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const createExpenses = async (req, res) => {
  const { userId, description, amount, date, category } = req.body;

  try {
    const newExpenses = await expensesModel.create({
      userId,
      description,
      amount,
      date,
      category,
    });
    await newExpenses.save();
    res
      .status(201)
      .json({ newExpenses: newExpenses, message: "New expenses added" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editexpenses = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid ID" });
    }
    const edit = await expensesModel.findByIdAndUpdate(id, { ...req.body });

    if (!edit) {
      return res.status(404).json({ error: "Could not edit" });
    }

    res.status(200).json({ edit, message: "expenses updated successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteExpenses = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: error.message });
    }
    const deleteExpenses = await expensesModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({
        deleteExpenses: deleteExpenses,
        message: "Expenses deleted successfully",
      });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getUserexpenses = async (req, res) => {
  const userId = req.params.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const totalExpenses = await expensesModel.countDocuments({
      userId: userId,
    });
    const expenses = await expensesModel
      .find({ userId: userId })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      expenses,
      totalExpenses: totalExpenses,
      currentPage: page,
      totalPages: Math.ceil(totalExpenses / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const getUserexpenses = async (req, res) => {
//   const userId = req.params.userId;
//   try {
//     const expenses = await expensesModel.find({ userId: userId });
//     res.status(200).json({ expenses });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

export {
  createExpenses,
  getExpenses,
  getSingleExpenses,
  editexpenses,
  deleteExpenses,
  getUserexpenses,
};
