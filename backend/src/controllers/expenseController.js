import Expense from "../models/Expense.js";
import { validateExpense } from "../utils/validators.js";

export const createExpense = async (req, res, next) => {
  try {
    const { error } = validateExpense(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const expense = await Expense.create(req.body);
    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    next(error);
  }
};

export const getExpenseById = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid expense ID",
      });
    }
    next(error);
  }
};

export const updateExpense = async (req, res, next) => {
  try {
    const { error } = validateExpense(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid expense ID",
      });
    }
    next(error);
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid expense ID",
      });
    }
    next(error);
  }
};

export const getExpenseSummary = async (req, res, next) => {
  try {
    const summary = await Expense.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          category: "$_id",
          total: 1,
          count: 1,
          _id: 0,
        },
      },
      {
        $sort: { total: -1 },
      },
    ]);

    const totalAmount = summary.reduce((acc, curr) => acc + curr.total, 0);

    res.status(200).json({
      success: true,
      totalAmount,
      data: summary,
    });
  } catch (error) {
    next(error);
  }
};
