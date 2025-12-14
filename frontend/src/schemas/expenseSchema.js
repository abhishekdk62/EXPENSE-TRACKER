// src/schemas/expenseSchema.js
import { z } from 'zod';

export const expenseSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters')
    .trim(),
  
  amount: z
    .coerce // ADD THIS - automatically converts string to number
    .number({ 
      required_error: 'Amount is required',
      invalid_type_error: 'Please enter a valid amount',
    })
    .positive('Amount must be a positive number')
    .min(0.01, 'Amount must be at least ₹0.01'),
  
  category: z.enum(['food', 'transport', 'entertainment', 'utilities', 'other'], {
    errorMap: () => ({ message: 'Please select a valid category' }),
  }),
  
  date: z
    .string({ required_error: 'Date is required' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please select a valid date'),
  
  notes: z
    .string()
    .max(500, 'Notes must be less than 500 characters')
    .optional()
    .or(z.literal('')),
});

export const CATEGORIES = ['food', 'transport', 'entertainment', 'utilities', 'other'];
