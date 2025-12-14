import { useTheme } from '../context/ThemeContext';

export const Loader = () => {
  const { isDark } = useTheme();

  return (
    <div className="flex justify-center items-center py-12">
      <div className={isDark 
        ? "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400" 
        : "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
      }></div>
    </div>
  );
};
