import { useTheme } from '../context/ThemeContext';
import { AlertTriangle, X } from 'lucide-react';

export const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={isDark 
        ? "relative w-full max-w-md p-6 rounded-2xl border border-gray-800 bg-zinc-950 shadow-2xl" 
        : "relative w-full max-w-md p-6 rounded-2xl border border-gray-200 bg-white shadow-2xl"
      }>
        {/* Close button */}
        <button
          onClick={onClose}
          className={isDark 
            ? "absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-800 transition-colors" 
            : "absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          }
        >
          <X className={isDark ? "w-5 h-5 text-gray-400" : "w-5 h-5 text-gray-600"} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className={isDark 
            ? "w-16 h-16 rounded-full bg-red-950 border border-red-900 flex items-center justify-center" 
            : "w-16 h-16 rounded-full bg-red-50 border border-red-200 flex items-center justify-center"
          }>
            <AlertTriangle className={isDark ? "w-8 h-8 text-red-400" : "w-8 h-8 text-red-600"} />
          </div>
        </div>

        {/* Title */}
        <h3 className={isDark 
          ? "text-xl font-bold text-center mb-2 text-white" 
          : "text-xl font-bold text-center mb-2 text-gray-900"
        }>
          {title}
        </h3>

        {/* Message */}
        <p className={isDark 
          ? "text-center text-gray-400 mb-6" 
          : "text-center text-gray-600 mb-6"
        }>
          {message}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className={isDark
              ? "flex-1 py-3 px-6 rounded-xl font-semibold bg-zinc-800 text-white hover:bg-zinc-700 transition-all"
              : "flex-1 py-3 px-6 rounded-xl font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all"
            }
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={isDark
              ? "flex-1 py-3 px-6 rounded-xl font-semibold bg-red-600 text-white hover:bg-red-700 transition-all"
              : "flex-1 py-3 px-6 rounded-xl font-semibold bg-red-600 text-white hover:bg-red-700 transition-all"
            }
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
