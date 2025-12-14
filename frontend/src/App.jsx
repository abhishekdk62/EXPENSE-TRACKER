import { useState } from 'react';
import { useTheme } from './context/ThemeContext';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseSummary } from './components/ExpenseSummary';
import { FilterBar } from './components/FilterBar';
import { ThemeToggle } from './components/ThemeToggle';
import { Loader } from './components/Loader';
import { useExpenses } from './hooks/useExpenses';
import { Wallet, PlusCircle, BarChart3, AlertCircle } from 'lucide-react';

function App() {
  const { isDark } = useTheme();
  const { expenses, loading, error, addExpense, deleteExpense } = useExpenses();
  const [filter, setFilter] = useState('all');

  const filteredExpenses = filter === 'all'
    ? expenses
    : expenses.filter(exp => exp.category === filter);

  return (
    <div className={isDark ? "min-h-screen bg-black" : "min-h-screen bg-gray-50"}>
      {/* Header */}
      <header className={isDark 
        ? "border-b border-gray-800 bg-zinc-950 shadow-lg" 
        : "border-b border-gray-200 bg-white shadow-sm"
      }>
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={isDark 
              ? "w-10 h-10 rounded-full bg-white flex items-center justify-center" 
              : "w-10 h-10 rounded-full bg-black flex items-center justify-center"
            }>
              <Wallet className={isDark ? "w-6 h-6 text-black" : "w-6 h-6 text-white"} />
            </div>
            <h1 className={isDark 
              ? "text-3xl font-bold text-white" 
              : "text-3xl font-bold text-gray-900"
            }>
              Expense Tracker
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Add Expense Form */}
          <div className="lg:col-span-1">
            <div className={isDark 
              ? "p-8 rounded-2xl border border-gray-800 sticky top-6 bg-zinc-950 shadow-2xl" 
              : "p-8 rounded-2xl border border-gray-200 sticky top-6 bg-white shadow-lg"
            }>
              <h2 className={isDark 
                ? "text-2xl font-bold mb-6 text-white flex items-center gap-2" 
                : "text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2"
              }>
                <PlusCircle className="w-6 h-6" /> Add Expense
              </h2>
              <ExpenseForm onSubmit={addExpense} />
            </div>
          </div>

          {/* Right Column - Summary & List */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary Card */}
            <ExpenseSummary />

            {/* Expenses List Card */}
            <div className={isDark 
              ? "p-8 rounded-2xl border border-gray-800 bg-zinc-950 shadow-2xl" 
              : "p-8 rounded-2xl border border-gray-200 bg-white shadow-lg"
            }>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <h2 className={isDark 
                  ? "text-2xl font-bold text-white flex items-center gap-2" 
                  : "text-2xl font-bold text-gray-900 flex items-center gap-2"
                }>
                  <BarChart3 className="w-6 h-6" /> Your Expenses
                </h2>
                <FilterBar onFilterChange={setFilter} currentFilter={filter} />
              </div>

              {loading && <Loader />}
              
              {error && (
                <div className={isDark 
                  ? "p-5 rounded-xl border border-red-900 bg-red-950 text-red-200" 
                  : "p-5 rounded-xl border border-red-200 bg-red-50 text-red-700"
                }>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">{error}</span>
                  </div>
                </div>
              )}

              {!loading && !error && (
                <ExpenseList 
                  expenses={filteredExpenses} 
                  onDelete={deleteExpense}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={isDark 
        ? "border-t border-gray-800 bg-zinc-950 mt-20" 
        : "border-t border-gray-200 bg-white mt-20"
      }>
        <div className="container mx-auto px-6 py-6 text-center">
          <p className={isDark ? "text-gray-500 text-sm" : "text-gray-600 text-sm"}>
            Built with React & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
