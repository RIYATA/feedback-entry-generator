import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Copy,
  RotateCcw,
  Check,
  ChevronRight,
  Settings2,
  Layers,
  History,
  Zap,
  Plus,
  Trash2,
  Edit2,
  Save,
  MessageSquare
} from 'lucide-react';
import FeedbackCard from './components/FeedbackCard';
import CategorySelector from './components/CategorySelector';
import { categories as initialCategories, generateFeedback, GROUPS } from './generators/feedbackLogic';
import { cn } from './lib/utils';

function App() {
  const [categories, setCategories] = useState(initialCategories);
  const [generationMode, setGenerationMode] = useState('random'); // 'random' or 'scenario'
  const [selectedCategories, setSelectedCategories] = useState(initialCategories.map(c => c.id));
  const [importCategory, setImportCategory] = useState('');
  const [oldFeedback, setOldFeedback] = useState('');
  const [results, setResults] = useState([]);
  const [selectedResults, setSelectedResults] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);

  // When switching to scenario mode, pick the first category if none or many are selected
  const handleModeChange = (mode) => {
    setGenerationMode(mode);
    if (mode === 'scenario') {
      if (selectedCategories.length !== 1) {
        setSelectedCategories([categories[0].id]);
      }
    } else {
      setSelectedCategories(categories.map(c => c.id));
    }
  };

  const toggleCategory = (id) => {
    if (generationMode === 'scenario') {
      setSelectedCategories([id]);
    } else {
      setSelectedCategories(prev =>
        prev.includes(id)
          ? prev.length > 1 ? prev.filter(c => c !== id) : prev
          : [...prev, id]
      );
    }
  };

  const handleGenerate = () => {
    if (selectedCategories.length === 0) return;

    setIsGenerating(true);
    setTimeout(() => {
      // In scenario mode, we only use the one selected category
      const newEntries = generateFeedback(selectedCategories, 5, oldFeedback, importCategory);
      setResults(newEntries.map(text => ({
        id: Math.random().toString(36).substr(2, 9),
        text,
        categoryId: generationMode === 'scenario' ? selectedCategories[0] : null
      })));
      setSelectedResults([]); // Clear selection on new generation
      setIsGenerating(false);
    }, 600);
  };

  const handleSaveToLibrary = (categoryId, text) => {
    if (!categoryId) return; // Cannot save if category unknown
    setCategories(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          templates: [text, ...cat.templates]
        };
      }
      return cat;
    }));
    // We could persist to localStorage here
  };

  const handleUpdateResult = (id, newText) => {
    setResults(prev => prev.map(r => r.id === id ? { ...r, text: newText } : r));
  };

  const handleSelectAll = (select) => {
    if (generationMode === 'scenario') return;
    if (select) {
      setSelectedCategories(categories.map(c => c.id));
    } else {
      setSelectedCategories([]);
    }
  };

  const toggleResultSelection = (id) => {
    setSelectedResults(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      }
      if (prev.length >= 5) return prev;
      return [...prev, id];
    });
  };

  const handleBatchCopy = async () => {
    if (selectedResults.length === 0) return;
    const selectedTexts = results
      .filter(r => selectedResults.includes(r.id))
      .map(r => r.text)
      .join('\n\n');

    try {
      await navigator.clipboard.writeText(selectedTexts);
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000);
    } catch (err) {
      console.error('Failed to copy entries: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-white opacity-60"></div>

      <div className="max-w-7xl mx-auto p-4 lg:p-8 flex flex-col lg:flex-row gap-8 min-h-screen">

        {/* Sidebar / Configuration Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/3 flex flex-col gap-5"
        >
          <header className="mb-2">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center gap-3">
              <Sparkles className="text-blue-500" />
              反馈词条生成器
            </h1>
            <p className="text-slate-500 mt-2">一线服务人员专属辅助工具</p>
          </header>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex-1 flex flex-col gap-6">
            {/* Mode Toggle */}
            <div className="p-1 bg-slate-100 rounded-xl flex">
              <button
                onClick={() => handleModeChange('random')}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${generationMode === 'random' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                随机生成
              </button>
              <button
                onClick={() => handleModeChange('scenario')}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${generationMode === 'scenario' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                场景类生成
              </button>
            </div>

            {/* Import Section */}
            <div className={`transition-all duration-300 rounded-xl ${oldFeedback ? 'ring-2 ring-blue-400/30' : ''}`}>
              <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2"><RotateCcw size={16} /> 导入旧反馈 (智能调优)</span>
                {oldFeedback && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      opacity: { duration: 0.2 },
                      scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                    }}
                    className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full shadow-sm border border-blue-500 font-bold"
                  >
                    Context Active
                  </motion.span>
                )}
              </label>
              <div className="space-y-3">
                <select
                  value={importCategory}
                  onChange={(e) => setImportCategory(e.target.value)}
                  className={`w-full p-2 border rounded-lg text-sm outline-none transition-all ${importCategory ? 'bg-blue-50 border-blue-400 text-blue-700 font-medium' : 'bg-slate-50 border-slate-200 text-slate-600'}`}
                >
                  <option value="">- 请选择导入类别 (提升匹配度) -</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
                <div className="relative">
                  <textarea
                    value={oldFeedback}
                    onChange={(e) => setOldFeedback(e.target.value)}
                    placeholder="在此粘贴旧的大概反馈，如“需要等孩子回来商量”..."
                    className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none h-28 text-sm leading-relaxed ${oldFeedback ? 'bg-blue-50/50 border-blue-400 shadow-inner' : 'bg-slate-50 border-slate-200'}`}
                  />
                  {oldFeedback && (
                    <button
                      onClick={() => setOldFeedback('')}
                      className="absolute bottom-2 right-2 text-slate-400 hover:text-red-500 text-xs px-2 py-1 bg-white/90 rounded border border-slate-200 shadow-sm transition-colors"
                    >
                      清空输入
                    </button>
                  )}
                </div>
              </div>
              <p className={`mt-2 text-[11px] transition-colors duration-300 ${oldFeedback ? 'text-blue-500 font-medium italic' : 'text-slate-400'}`}>
                {oldFeedback ? '✨ 智能优化已开启，生成的词条将结合以上语境' : '导入后点击“立即生成”将自动结合上下文进行优化'}
              </p>
            </div>

            {/* Category selection */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="mb-4 flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Settings2 size={16} /> {generationMode === 'random' ? '选择生成类别' : '选择目标场景'}
                </label>
                {generationMode === 'random' && (
                  <div className="space-x-2 text-xs">
                    <button onClick={() => handleSelectAll(true)} className="text-blue-600 hover:underline">全选</button>
                    <span className="text-slate-300">|</span>
                    <button onClick={() => handleSelectAll(false)} className="text-slate-500 hover:underline">清空</button>
                  </div>
                )}
              </div>

              <div className="overflow-y-auto flex-1 pr-1 custom-scrollbar">
                <CategorySelector
                  categories={categories}
                  groups={GROUPS}
                  selected={selectedCategories}
                  toggleCategory={toggleCategory}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || selectedCategories.length === 0}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-lg shadow-blue-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 shrink-0"
          >
            {isGenerating ? '生成中...' : `立即生成 (${generationMode === 'random' ? '随机5条' : '场景5条'})`}
          </button>
        </motion.div>

        {/* Main Content / Results Panel */}
        <motion.div
          layout
          className="lg:w-2/3 flex flex-col gap-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-700 flex items-center gap-2">
              <MessageSquare className="text-indigo-500" />
              生成结果
              {results.length > 0 && (
                <span className="text-xs font-normal text-slate-400 ml-1">
                  (点击词条进行多选，最多5条)
                </span>
              )}
            </h2>
            <div className="flex items-center gap-4">
              {selectedResults.length > 0 && (
                <button
                  onClick={handleBatchCopy}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-md",
                    copyStatus
                      ? "bg-green-500 text-white shadow-green-100"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100"
                  )}
                >
                  {copyStatus ? (
                    <><Check size={16} /> 已复制所选</>
                  ) : (
                    <><Copy size={16} /> 复制所选 ({selectedResults.length}/5)</>
                  )}
                </button>
              )}
              {results.length > 0 && (
                <span className="text-sm text-slate-400">
                  已生成 {results.length} 条建议
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4 min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {results.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl p-12"
                >
                  <Sparkles size={48} className="mb-4 text-slate-200" />
                  <p>点击左侧“立即生成”开始获取反馈词条</p>
                </motion.div>
              ) : (
                results.map((result, index) => (
                  <FeedbackCard
                    key={result.id}
                    index={index}
                    text={result.text}
                    categoryId={result.categoryId}
                    categoryLabel={categories.find(c => c.id === result.categoryId)?.label}
                    onUpdate={(newText) => handleUpdateResult(result.id, newText)}
                    onSaveToLibrary={(text) => handleSaveToLibrary(result.categoryId, text)}
                    isSelected={selectedResults.includes(result.id)}
                    onToggleSelection={() => toggleResultSelection(result.id)}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
