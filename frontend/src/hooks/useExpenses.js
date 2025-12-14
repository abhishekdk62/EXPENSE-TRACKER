import { useState, useEffect } from 'react';
import { expenseService } from '../api/expenseService';
import toast from 'react-hot-toast';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = async (category='all') => {
    try {
      setLoading(true);
      setError(null);
      const response = await expenseService.getAllExpenses(category);
      setExpenses(response.data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async (expenseData) => {
    try {
      setError(null);
      await expenseService.createExpense(expenseData);
      await fetchExpenses();
      toast.success('Expense added successfully!');
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Failed to add expense');
      throw err;
    }
  };

  const updateExpense = async (id, expenseData) => {
    try {
      setError(null);
      await expenseService.updateExpense(id, expenseData);
      await fetchExpenses();
      toast.success('Expense updated successfully!');
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Failed to update expense');
      throw err;
    }
  };

  const deleteExpense = async (id) => {
    try {
      setError(null);
      await expenseService.deleteExpense(id);
      await fetchExpenses();
      toast.success('Expense deleted successfully!');
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Failed to delete expense');
      throw err;
    }
  };

  return {
    expenses,
    loading,
    error,
    addExpense,
    updateExpense,
    deleteExpense,
    refetch: fetchExpenses
  };
};
