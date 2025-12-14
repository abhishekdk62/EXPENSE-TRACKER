import apiClient from './apiClient';

export const expenseService = {
  getAllExpenses: async () => {
    const response = await apiClient.get('/expenses');
    return response.data;
  },

  getExpenseById: async (id) => {
    const response = await apiClient.get(`/expenses/${id}`);
    return response.data;
  },

  createExpense: async (expenseData) => {
    const response = await apiClient.post('/expenses', expenseData);
    return response.data;
  },

  updateExpense: async (id, expenseData) => {
    const response = await apiClient.put(`/expenses/${id}`, expenseData);
    return response.data;
  },

  deleteExpense: async (id) => {
    const response = await apiClient.delete(`/expenses/${id}`);
    return response.data;
  },

  getSummary: async () => {
    const response = await apiClient.get('/expenses/summary');
    return response.data;
  },
};
