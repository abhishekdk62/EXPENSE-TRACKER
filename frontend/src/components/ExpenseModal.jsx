import { useTheme } from '../context/ThemeContext';
import { X } from 'lucide-react';
import { ExpenseForm } from './ExpenseForm';

export const ExpenseModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  const handleSubmit = async (data) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={isDark 
        ? "relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 rounded-2xl border border-gray-800 bg-zinc-950 shadow-2xl" 
        : "relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 rounded-2xl border border-gray-200 bg-white shadow-2xl"
      }>
        {/* Close button */}
        <button
          onClick={onClose}
          className={isDark 
            ? "absolute top-6 right-6 p-2 rounded-lg hover:bg-gray-800 transition-colors" 
            : "absolute top-6 right-6 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          }
        >
          <X className={isDark ? "w-6 h-6 text-gray-400" : "w-6 h-6 text-gray-600"} />
        </button>

        {/* Title */}
        <h2 className={isDark 
          ? "text-2xl font-bold mb-6 text-white pr-12" 
          : "text-2xl font-bold mb-6 text-gray-900 pr-12"
        }>
          {initialData ? 'Edit Expense' : 'Add New Expense'}
        </h2>

        {/* Form */}
        <ExpenseForm 
          onSubmit={handleSubmit}
          initialData={initialData}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};
