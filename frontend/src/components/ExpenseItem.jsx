import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Trash2, Calendar, MessageSquare, Edit2, UtensilsCrossed, Car, Film, Lightbulb, Package } from 'lucide-react';
import { ConfirmDialog } from './ConfirmDialog';

const CATEGORY_ICONS = {
  food: UtensilsCrossed,
  transport: Car,
  entertainment: Film,
  utilities: Lightbulb,
  other: Package
};

export const ExpenseItem = ({ expense, onDelete, onEdit }) => {
  const { isDark } = useTheme();
  const [showConfirm, setShowConfirm] = useState(false);
  const CategoryIcon = CATEGORY_ICONS[expense.category] || Package;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(expense._id);
    setShowConfirm(false);
  };

  const getCategoryBadge = () => {
    if (isDark) {
      const colors = {
        food: 'bg-orange-950 text-orange-300 border-orange-900',
        transport: 'bg-blue-950 text-blue-300 border-blue-900',
        entertainment: 'bg-purple-950 text-purple-300 border-purple-900',
        utilities: 'bg-green-950 text-green-300 border-green-900',
        other: 'bg-gray-900 text-gray-400 border-gray-800'
      };
      return colors[expense.category] || colors.other;
    } else {
      const colors = {
        food: 'bg-orange-100 text-orange-800 border-orange-200',
        transport: 'bg-blue-100 text-blue-800 border-blue-200',
        entertainment: 'bg-purple-100 text-purple-800 border-purple-200',
        utilities: 'bg-green-100 text-green-800 border-green-200',
        other: 'bg-gray-100 text-gray-800 border-gray-200'
      };
      return colors[expense.category] || colors.other;
    }
  };

  return (
    <>
      <div className={isDark 
        ? "p-6 rounded-xl border border-gray-800 flex items-start justify-between gap-4 bg-zinc-900 hover:border-gray-700 transition-all" 
        : "p-6 rounded-xl border border-gray-200 flex items-start justify-between gap-4 bg-gray-50 hover:border-gray-300 transition-all"
      }>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <CategoryIcon className="w-8 h-8" />
            <h3 className={isDark ? "text-xl font-bold text-white" : "text-xl font-bold text-gray-900"}>
              {expense.title}
            </h3>
          </div>
          
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getCategoryBadge()}`}>
              <CategoryIcon className="w-3 h-3" />
              {expense.category.toUpperCase()}
            </span>
            <span className={isDark ? "text-sm text-gray-500 flex items-center gap-1" : "text-sm text-gray-600 flex items-center gap-1"}>
              <Calendar className="w-4 h-4" />
              {formatDate(expense.date)}
            </span>
          </div>

          {expense.notes && (
            <p className={isDark ? "text-sm mt-2 text-gray-400 flex items-start gap-2" : "text-sm mt-2 text-gray-600 flex items-start gap-2"}>
              <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {expense.notes}
            </p>
          )}
        </div>

        <div className="flex flex-col items-end gap-3">
          <span className={isDark ? "text-3xl font-bold text-green-400" : "text-3xl font-bold text-green-600"}>
            ₹{expense.amount.toFixed(2)}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(expense)}
              className={isDark 
                ? "px-4 py-2 rounded-lg font-semibold bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-900 transition-all flex items-center gap-2" 
                : "px-4 py-2 rounded-lg font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-all flex items-center gap-2"
              }
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
              className={isDark 
                ? "px-4 py-2 rounded-lg font-semibold bg-red-950 hover:bg-red-900 text-red-300 border border-red-900 transition-all flex items-center gap-2" 
                : "px-4 py-2 rounded-lg font-semibold bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-all flex items-center gap-2"
              }
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Expense?"
        message="Are you sure you want to delete this expense? This action cannot be undone."
      />
    </>
  );
};
