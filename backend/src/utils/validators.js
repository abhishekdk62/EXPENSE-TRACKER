export const validateExpense = (data) => {
    const errors = [];
  
    if (!data.title || data.title.trim().length === 0) {
      errors.push('Title is required');
    }
  
    if (!data.amount || isNaN(data.amount) || data.amount <= 0) {
      errors.push('Amount must be a positive number');
    }
  
    const validCategories = ['food', 'transport', 'entertainment', 'utilities', 'other'];
    if (!data.category || !validCategories.includes(data.category)) {
      errors.push(`Category must be one of: ${validCategories.join(', ')}`);
    }
  
    if (errors.length > 0) {
      return {
        error: {
          details: [{ message: errors.join('; ') }]
        }
      };
    }
  
    return {};
  };
  