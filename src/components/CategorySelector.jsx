import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import {
  Wrench,
  TrendingUp,
  ClipboardCheck,
  AlertCircle,
  UserCircle2
} from 'lucide-react';

const groupIcons = {
  service: <Wrench size={14} />,
  sales: <TrendingUp size={14} />,
  status: <ClipboardCheck size={14} />,
  issues: <AlertCircle size={14} />,
  profiles: <UserCircle2 size={14} />
};

export default function CategorySelector({ categories, groups, selected, toggleCategory }) {
  const groupKeys = Object.keys(groups);
  const [activeTab, setActiveTab] = useState(groupKeys[0]);

  const activeCategories = categories.filter(c => c.group === activeTab);

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
        {groupKeys.map(key => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border shrink-0",
              activeTab === key
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            )}
          >
            {groupIcons[key]}
            {groups[key]}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="min-h-[240px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 gap-2"
          >
            {activeCategories.map((category) => {
              const isSelected = selected.includes(category.id);
              return (
                <motion.button
                  key={category.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleCategory(category.id)}
                  className={cn(
                    "px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border text-left",
                    isSelected
                      ? "bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-200"
                      : "bg-white text-slate-600 border-slate-100 hover:border-slate-200 hover:bg-slate-50/80"
                  )}
                >
                  {category.label}
                  {isSelected && (
                    <motion.div
                      layoutId="dot"
                      className="w-1.5 h-1.5 rounded-full bg-blue-500 float-right mt-1"
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
