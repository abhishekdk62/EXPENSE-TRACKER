import { useTheme } from '../context/ThemeContext';
import { ExpenseItem } from './ExpenseItem';
import { Inbox } from 'lucide-react';

export const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  const { isDark } = useTheme();

  if (expenses.length === 0) {
    return (
      <div className="text-center py-20">
        <Inbox className={isDark ? "w-20 h-20 mx-auto mb-4 text-gray-700" : "w-20 h-20 mx-auto mb-4 text-gray-400"} />
        <p className={isDark 
          ? "text-xl text-gray-500" 
          : "text-xl text-gray-600"
        }>
          No expenses yet. Start tracking!
        </p>
      </div>
    );
  }

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="space-y-6">
      <div className={isDark 
        ? "p-6 rounded-xl border border-gray-800 bg-zinc-900" 
        : "p-6 rounded-xl border border-gray-200 bg-gradient-to-br from-green-50 to-emerald-50"
      }>
        <h3 className={isDark ? "text-sm font-semibold mb-2 text-gray-400 uppercase tracking-wide" : "text-sm font-semibold mb-2 text-gray-600 uppercase tracking-wide"}>
          Total Expenses
        </h3>
        <p className={isDark ? "text-4xl font-bold text-white" : "text-4xl font-bold text-gray-900"}>
          ₹{totalAmount.toFixed(2)}
        </p>
        <p className={isDark ? "text-sm mt-2 text-gray-500" : "text-sm mt-2 text-gray-600"}>
          {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'} recorded
        </p>
      </div>

      <div className="space-y-4">
        {expenses.map(expense => (
          <ExpenseItem
            key={expense._id}
            expense={expense}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};
