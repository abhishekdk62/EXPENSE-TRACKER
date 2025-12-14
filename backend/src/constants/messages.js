export const ERROR_MESSAGES = {
    EXPENSE_NOT_FOUND: 'Expense not found',
    INVALID_EXPENSE_ID: 'Invalid expense ID',
    EXPENSE_DELETED: 'Expense deleted successfully',
    VALIDATION_ERROR: 'Validation Error',
    DUPLICATE_VALUE: (field) => `Duplicate value for ${field}`,
    INVALID_FIELD: (path, value) => `Invalid ${path}: ${value}`,
    ROUTE_NOT_FOUND: (url) => `Route ${url} not found`,
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
  };
  
  export const SUCCESS_MESSAGES = {
    EXPENSE_CREATED: 'Expense created successfully',
    EXPENSE_UPDATED: 'Expense updated successfully',
    EXPENSE_DELETED: 'Expense deleted successfully',
    EXPENSES_FETCHED: 'Expenses fetched successfully',
  };
  