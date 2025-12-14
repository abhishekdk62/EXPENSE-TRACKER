import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { expenseSchema, CATEGORIES } from '../schemas/expenseSchema';
import { ZodError } from 'zod';
import { Plus, Loader2 } from 'lucide-react';

export const ExpenseForm = ({ onSubmit }) => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'food',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
  
    try {
      const dataToValidate = {
        title: formData.title,
        amount: formData.amount,
        category: formData.category,
        date: formData.date,
        notes: formData.notes,
      };
  
      const validatedData = expenseSchema.parse(dataToValidate);
  
      setIsSubmitting(true);
      
      await onSubmit(validatedData);
      
      setFormData({
        title: '',
        amount: '',
        category: 'food',
        notes: '',
        date: new Date().toISOString().split('T')[0]
      });
      setErrors({});
      
    } catch (err) {
      if (err instanceof ZodError) {
        const formattedErrors = {};
        err.issues.forEach((error) => {
          const field = error.path[0];
          formattedErrors[field] = error.message;
        });
        setErrors(formattedErrors);
      } else {
        setErrors({ submit: err.message || 'Failed to add expense' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClass = (fieldName) => {
    const baseClass = "w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all";
    const hasError = errors[fieldName];
    
    if (hasError) {
      return `${baseClass} ${isDark 
        ? 'bg-zinc-900 border-red-600 text-white focus:border-red-500 focus:ring-red-500/30' 
        : 'bg-white border-red-400 text-gray-900 focus:border-red-500 focus:ring-red-500/20'
      }`;
    }
    
    return `${baseClass} ${isDark 
      ? 'bg-zinc-900 border-gray-800 text-white focus:border-white focus:ring-white/20' 
      : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-black focus:ring-black/10'
    }`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.submit && (
        <div className={isDark 
          ? "p-4 rounded-xl border bg-red-950 border-red-900 text-red-200" 
          : "p-4 rounded-xl border bg-red-50 border-red-300 text-red-700"
        }>
          {errors.submit}
        </div>
      )}
      
      {/* Title Field */}
      <div>
        <input
          type="text"
          name="title"
          placeholder="Expense title"
          value={formData.title}
          onChange={handleChange}
          className={getInputClass('title')}
        />
        {errors.title && (
          <p className={isDark ? "text-red-400 text-sm mt-1" : "text-red-600 text-sm mt-1"}>
            {errors.title}
          </p>
        )}
      </div>

      {/* Amount & Category */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="number"
            name="amount"
            min={0}
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            step="0.01"
            className={getInputClass('amount')}
          />
          {errors.amount && (
            <p className={isDark ? "text-red-400 text-sm mt-1" : "text-red-600 text-sm mt-1"}>
              {errors.amount}
            </p>
          )}
        </div>

        <div>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={getInputClass('category')}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className={isDark ? "text-red-400 text-sm mt-1" : "text-red-600 text-sm mt-1"}>
              {errors.category}
            </p>
          )}
        </div>
      </div>

      {/* Date Field */}
      <div>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={getInputClass('date')}
        />
        {errors.date && (
          <p className={isDark ? "text-red-400 text-sm mt-1" : "text-red-600 text-sm mt-1"}>
            {errors.date}
          </p>
        )}
      </div>

      {/* Notes Field */}
      <div>
        <textarea
          name="notes"
          placeholder="Notes (optional)"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          className={getInputClass('notes')}
        />
        {errors.notes && (
          <p className={isDark ? "text-red-400 text-sm mt-1" : "text-red-600 text-sm mt-1"}>
            {errors.notes}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={isDark
          ? "w-full py-3.5 px-6 rounded-xl font-semibold bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          : "w-full py-3.5 px-6 rounded-xl font-semibold bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        }
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <Plus className="w-5 h-5" />
            Add Expense
          </>
        )}
      </button>
    </form>
  );
};
