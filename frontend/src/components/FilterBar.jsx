import { useTheme } from '../context/ThemeContext';

const CATEGORIES = ['food', 'transport', 'entertainment', 'utilities', 'other'];

export const FilterBar = ({ onFilterChange, currentFilter }) => {
  const { isDark } = useTheme();

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className={isDark ? "font-medium text-gray-300" : "font-medium text-gray-700"}>
        Filter:
      </span>
      <select
        value={currentFilter}
        onChange={(e) => onFilterChange(e.target.value)}
        className={isDark 
          ? "px-4 py-2 rounded-lg border-2 outline-none cursor-pointer bg-gray-700 border-gray-600 text-white" 
          : "px-4 py-2 rounded-lg border-2 outline-none cursor-pointer bg-white border-gray-300 text-gray-900"
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
