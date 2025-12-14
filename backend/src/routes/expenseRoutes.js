import express from 'express';
import {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenseSummary
} from '../controllers/expenseController.js';

const router = express.Router();

router.get('/summary', getExpenseSummary);
router.post('/', createExpense);
router.get('/', getAllExpenses);
router.get('/:id', getExpenseById);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;
