import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={isDark 
        ? "p-3 rounded-lg font-medium bg-gray-700 text-yellow-400 hover:bg-gray-600" 
        : "p-3 rounded-lg font-medium bg-gray-200 text-gray-800 hover:bg-gray-300"
      }
    >
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};
