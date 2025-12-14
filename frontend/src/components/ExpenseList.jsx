import { useTheme } from '../context/ThemeContext';
import { ExpenseItem } from './ExpenseItem';

export const ExpenseList = ({ expenses, onDelete }) => {
  const { isDark } = useTheme();

  if (expenses.length === 0) {
    return (
      <p className={isDark 
        ? "text-center py-12 text-lg text-gray-400" 
        : "text-center py-12 text-lg text-gray-600"
      }>
        No expenses found. Add your first expense above!
      </p>
    );
  }

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="space-y-4">
      <div className={isDark 
        ? "p-5 rounded-lg border-2 bg-gray-800 border-gray-700" 
        : "p-5 rounded-lg border-2 bg-blue-50 border-blue-200"
      }>
        <h3 className={isDark ? "text-sm font-medium mb-1 text-gray-400" : "text-sm font-medium mb-1 text-gray-600"}>
          Total Expenses
        </h3>
        <p className={isDark ? "text-3xl font-bold text-blue-400" : "text-3xl font-bold text-blue-600"}>
          ₹{totalAmount.toFixed(2)}
        </p>
        <p className={isDark ? "text-sm mt-1 text-gray-500" : "text-sm mt-1 text-gray-600"}>
          {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}
        </p>
      </div>

      <div className="space-y-3">
        {expenses.map(expense => (
          <ExpenseItem
            key={expense._id}
            expense={expense}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};
