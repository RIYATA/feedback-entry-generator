import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Edit2, Save, Library, CheckCircle2 } from 'lucide-react'
import { cn } from '../lib/utils'

export default function FeedbackCard({ text, index, categoryId, categoryLabel, onUpdate, onSaveToLibrary, isSelected, onToggleSelection }) {
  const [copied, setCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(text)
  const [isSaved, setIsSaved] = useState(false)
  const textareaRef = useRef(null)

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.setSelectionRange(editText.length, editText.length)
    }
  }, [isEditing])

  const handleCopy = async (e) => {
    e.stopPropagation() // Prevent triggering selection when copying
    try {
      await navigator.clipboard.writeText(editText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleSaveEdit = (e) => {
    e?.stopPropagation()
    onUpdate(editText)
    setIsEditing(false)
  }

  const handleSaveToLibraryInternal = (e) => {
    e.stopPropagation()
    onSaveToLibrary(editText)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  const handleToggleSelection = (e) => {
    // Only toggle if not clicking on buttons or textarea
    if (isEditing) return
    onToggleSelection()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={handleToggleSelection}
      className={cn(
        "group bg-white border p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden cursor-pointer",
        isSelected
          ? "border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/10"
          : "border-slate-100 hover:border-blue-100"
      )}
    >
      {/* Background decoration */}
      <div className={cn(
        "absolute top-0 right-0 w-24 h-24 rounded-full -mr-12 -mt-12 transition-transform pointer-events-none",
        isSelected ? "bg-blue-400/10 scale-125" : "bg-blue-50/30 group-hover:scale-110"
      )} />

      {/* Selection checkmark indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3 text-blue-600 bg-white/80 rounded-full shadow-sm">
          <CheckCircle2 size={18} fill="currentColor" className="text-white" />
          <CheckCircle2 size={18} className="absolute inset-0" />
        </div>
      )}

      <div className="relative flex flex-col gap-3">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={editText}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-2 text-sm text-slate-700 bg-slate-50 border border-blue-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 transition-all min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSaveEdit()
            }}
          />
        ) : (
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            {editText}
          </p>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
          <div className="flex items-center gap-2">
            {categoryLabel && (
              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200 uppercase tracking-wider font-bold">
                {categoryLabel}
              </span>
            )}
            {isEditing && (
              <span className="text-[10px] text-slate-400 italic">
                Ctrl+Enter 保存修改
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {isEditing ? (
              <button
                onClick={handleSaveEdit}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
              >
                <Save size={14} /> 保存
              </button>
            ) : (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  title="修改词条"
                >
                  <Edit2 size={14} />
                </button>

                {categoryId && (
                  <button
                    onClick={handleSaveToLibraryInternal}
                    disabled={isSaved}
                    className={cn(
                      "p-2 rounded-lg transition-all flex items-center gap-1 text-xs font-bold",
                      isSaved
                        ? "text-green-600 bg-green-50"
                        : "text-slate-400 hover:text-amber-600 hover:bg-amber-50"
                    )}
                    title="加入词条库"
                  >
                    {isSaved ? <CheckCircle2 size={14} /> : <Library size={14} />}
                    {isSaved && "已存入"}
                  </button>
                )}

                <button
                  onClick={handleCopy}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm",
                    copied
                      ? "bg-green-500 text-white shadow-green-100"
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100 hover:shadow-blue-200"
                  )}
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="flex items-center gap-1"
                      >
                        <Check size={14} strokeWidth={3} />
                        <span>已复制</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="flex items-center gap-1"
                      >
                        <Copy size={14} strokeWidth={2.5} />
                        <span>复制</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Selection indicator sidebar */}
      <div className={cn(
        "absolute left-0 top-0 bottom-0 w-1 transition-all",
        isSelected ? "bg-blue-500" : "bg-blue-500 opacity-0 group-hover:opacity-100"
      )} />
    </motion.div>
  )
}
