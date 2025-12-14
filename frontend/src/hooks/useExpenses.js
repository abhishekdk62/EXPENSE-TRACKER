import { useState, useEffect } from 'react';
import { expenseService } from '../api/expenseService';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await expenseService.getAllExpenses();
      setExpenses(response.data);
    } catch (err) {
      setError(err.message);
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
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateExpense = async (id, expenseData) => {
    try {
      setError(null);
      await expenseService.updateExpense(id, expenseData);
      await fetchExpenses();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteExpense = async (id) => {
    try {
      setError(null);
      await expenseService.deleteExpense(id);
      await fetchExpenses();
    } catch (err) {
      setError(err.message);
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
