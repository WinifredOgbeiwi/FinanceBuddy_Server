import incomeModel from "../models/incomeModel.js";
import mongoose from "mongoose";
const getIncomes = async (req, res) => {
  try {
    const incomes = await incomeModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getSingleIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await incomeModel.findById(id);
    if (!income) {
      return res.status(404).json({ error: "income not found" });
    }
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const createIncome = async (req, res) => {
  const { userId, source, amount, date, category } = req.body;

  try {
    const newIncome = await incomeModel.create({
      userId,
      source,
      amount,
      date,
      category,
    });
    await newIncome.save();
    res.status(201).json({ newIncome, message: "New income added" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editIncome = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid ID" });
    }
    const edit = await incomeModel.findByIdAndUpdate(id, { ...req.body });

    if (!edit) {
      return res.status(404).json({ error: "Could not edit" });
    }

    res.status(200).json({ edit, message: "Income updated successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: error.message });
    }
    const deleteIncome = await incomeModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ deleteIncome, message: "Income deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export { createIncome, getIncomes, getSingleIncome, editIncome, deleteIncome };
