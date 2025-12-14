import { useTheme } from '../context/ThemeContext';

const CATEGORY_ICONS = {
  food: '🍔',
  transport: '🚗',
  entertainment: '🎬',
  utilities: '💡',
  other: '📦'
};

export const ExpenseItem = ({ expense, onDelete }) => {
  const { isDark } = useTheme();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryBadge = () => {
    if (isDark) {
      const colors = {
        food: 'bg-orange-900 text-orange-200 border-orange-700',
        transport: 'bg-blue-900 text-blue-200 border-blue-700',
        entertainment: 'bg-purple-900 text-purple-200 border-purple-700',
        utilities: 'bg-green-900 text-green-200 border-green-700',
        other: 'bg-gray-800 text-gray-300 border-gray-600'
      };
      return colors[expense.category] || colors.other;
    } else {
      const colors = {
        food: 'bg-orange-100 text-orange-700 border-orange-300',
        transport: 'bg-blue-100 text-blue-700 border-blue-300',
        entertainment: 'bg-purple-100 text-purple-700 border-purple-300',
        utilities: 'bg-green-100 text-green-700 border-green-300',
        other: 'bg-gray-100 text-gray-700 border-gray-300'
      };
      return colors[expense.category] || colors.other;
    }
  };

  return (
    <div className={isDark 
      ? "p-5 rounded-lg border-2 flex items-start justify-between gap-4 bg-gray-800 border-gray-700" 
      : "p-5 rounded-lg border-2 flex items-start justify-between gap-4 bg-white border-gray-200"
    }>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{CATEGORY_ICONS[expense.category]}</span>
          <h3 className={isDark ? "text-lg font-semibold text-white" : "text-lg font-semibold text-gray-900"}>
            {expense.title}
          </h3>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap mb-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryBadge()}`}>
            {expense.category}
          </span>
          <span className={isDark ? "text-sm text-gray-400" : "text-sm text-gray-600"}>
            {formatDate(expense.date)}
          </span>
        </div>

        {expense.notes && (
          <p className={isDark ? "text-sm mt-2 text-gray-400" : "text-sm mt-2 text-gray-600"}>
            {expense.notes}
          </p>
        )}
      </div>

      <div className="flex flex-col items-end gap-3">
        <span className={isDark ? "text-2xl font-bold text-green-400" : "text-2xl font-bold text-green-600"}>
          ₹{expense.amount.toFixed(2)}
        </span>
        <button
          onClick={() => onDelete(expense._id)}
          className={isDark 
            ? "px-4 py-2 rounded-lg font-medium bg-red-900 hover:bg-red-800 text-red-200" 
            : "px-4 py-2 rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white"
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
};
