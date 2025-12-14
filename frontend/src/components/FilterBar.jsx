import { useTheme } from '../context/ThemeContext';
import { Filter } from 'lucide-react';

const CATEGORIES = ['food', 'transport', 'entertainment', 'utilities', 'other'];

export const FilterBar = ({ onFilterChange, currentFilter }) => {
  const { isDark } = useTheme();

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-2">
        <Filter className={isDark ? "w-5 h-5 text-gray-400" : "w-5 h-5 text-gray-600"} />
        <span className={isDark ? "font-medium text-gray-400 text-sm" : "font-medium text-gray-600 text-sm"}>
          Filter:
        </span>
      </div>
      <select
        value={currentFilter}
        onChange={(e) => onFilterChange(e.target.value)}
        className={isDark 
          ? "px-4 py-2 rounded-lg border border-gray-800 outline-none cursor-pointer bg-zinc-900 text-white hover:border-gray-700 transition-all" 
          : "px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer bg-gray-50 text-gray-900 hover:border-gray-400 transition-all"
        }
      >
        <option value="all">All Categories</option>
        {CATEGORIES.map(cat => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};
