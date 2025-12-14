import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { expenseService } from '../api/expenseService';
import { TrendingUp, UtensilsCrossed, Car, Film, Lightbulb, Package } from 'lucide-react';

const CATEGORY_ICONS = {
  food: UtensilsCrossed,
  transport: Car,
  entertainment: Film,
  utilities: Lightbulb,
  other: Package
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
        ? "p-8 rounded-2xl border border-gray-800 text-center bg-zinc-950 shadow-2xl" 
        : "p-8 rounded-2xl border border-gray-200 text-center bg-white shadow-lg"
      }>
        <p className={isDark ? "text-gray-500" : "text-gray-600"}>Loading summary...</p>
      </div>
    );
  }

  return (
    <div className={isDark 
      ? "p-8 rounded-2xl border border-gray-800 bg-zinc-950 shadow-2xl" 
      : "p-8 rounded-2xl border border-gray-200 bg-white shadow-lg"
    }>
      <h2 className={isDark 
        ? "text-2xl font-bold mb-6 text-white flex items-center gap-2" 
        : "text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2"
      }>
        <TrendingUp className="w-6 h-6" /> Spending Summary
      </h2>

      <div className={isDark 
        ? "p-6 rounded-xl mb-6 bg-gradient-to-br from-zinc-900 to-black border border-gray-800" 
        : "p-6 rounded-xl mb-6 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200"
      }>
        <p className={isDark ? "text-sm mb-1 text-gray-500 uppercase tracking-wide" : "text-sm mb-1 text-gray-600 uppercase tracking-wide"}>
          Grand Total
        </p>
        <p className={isDark ? "text-4xl font-bold text-white" : "text-4xl font-bold text-gray-900"}>
          ₹{totalAmount.toFixed(2)}
        </p>
      </div>

      <div className="space-y-3">
        {summary.map(item => {
          const CategoryIcon = CATEGORY_ICONS[item.category] || Package;
          return (
            <div
              key={item.category}
              className={isDark 
                ? "p-5 rounded-xl border border-gray-800 flex items-center justify-between bg-zinc-900 hover:border-gray-700 transition-all" 
                : "p-5 rounded-xl border border-gray-200 flex items-center justify-between bg-gray-50 hover:border-gray-300 transition-all"
              }
            >
              <div className="flex items-center gap-4">
                <CategoryIcon className="w-8 h-8" />
                <div>
                  <p className={isDark 
                    ? "font-bold capitalize text-lg text-white" 
                    : "font-bold capitalize text-lg text-gray-900"
                  }>
                    {item.category}
                  </p>
                  <p className={isDark ? "text-sm text-gray-500" : "text-sm text-gray-600"}>
                    {item.count} {item.count === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <p className={isDark ? "text-2xl font-bold text-green-400" : "text-2xl font-bold text-green-600"}>
                ₹{item.total.toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
