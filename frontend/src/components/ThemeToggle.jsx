import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={isDark 
        ? "px-5 py-2.5 rounded-full font-semibold bg-zinc-800 text-white hover:bg-zinc-700 transition-all flex items-center gap-2 border border-gray-700" 
        : "px-5 py-2.5 rounded-full font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all flex items-center gap-2 border border-gray-300"
      }
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4" />
          Light
        </>
      ) : (
        <>
          <Moon className="w-4 h-4" />
          Dark
        </>
      )}
    </button>
  );
};
