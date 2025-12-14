import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { expenseService } from '../api/expenseService';

const CATEGORY_ICONS = {
  food: '🍔',
  transport: '🚗',
  entertainment: '🎬',
  utilities: '💡',
  other: '📦'
};

export const ExpenseSummary = () => {
  const { isDark } = useTheme();
  const [summary, setSummary] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await expenseService.getSummary();
        setSummary(response.data);
        setTotalAmount(response.totalAmount);
      } catch (err) {
        // Handle silently
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className={isDark 
        ? "p-6 rounded-lg border-2 text-center bg-gray-800 border-gray-700 text-gray-400" 
        : "p-6 rounded-lg border-2 text-center bg-white border-gray-200 text-gray-600"
      }>
        Loading summary...
      </div>
    );
  }

  return (
    <div className={isDark 
      ? "p-6 rounded-lg border-2 bg-gray-800 border-gray-700" 
      : "p-6 rounded-lg border-2 bg-white border-gray-200"
    }>
      <h2 className={isDark ? "text-2xl font-bold mb-4 text-white" : "text-2xl font-bold mb-4 text-gray-900"}>
        Spending by Category
      </h2>

      <div className={isDark ? "p-4 rounded-lg mb-4 bg-gray-700" : "p-4 rounded-lg mb-4 bg-gray-50"}>
        <p className={isDark ? "text-sm mb-1 text-gray-400" : "text-sm mb-1 text-gray-600"}>
          Grand Total
        </p>
        <p className={isDark ? "text-3xl font-bold text-green-400" : "text-3xl font-bold text-green-600"}>
          ₹{totalAmount.toFixed(2)}
        </p>
      </div>

      <div className="space-y-3">
        {summary.map(item => (
          <div
            key={item.category}
            className={isDark 
              ? "p-4 rounded-lg border-2 flex items-center justify-between bg-gray-700 border-gray-600" 
              : "p-4 rounded-lg border-2 flex items-center justify-between bg-gray-50 border-gray-200"
            }
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{CATEGORY_ICONS[item.category]}</span>
              <div>
                <p className={isDark ? "font-semibold capitalize text-white" : "font-semibold capitalize text-gray-900"}>
                  {item.category}
                </p>
                <p className={isDark ? "text-sm text-gray-400" : "text-sm text-gray-600"}>
                  {item.count} {item.count === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            <p className={isDark ? "text-xl font-bold text-green-400" : "text-xl font-bold text-green-600"}>
              ₹{item.total.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
