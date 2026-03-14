'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import type { Keyword } from '@/types/alert';

interface KeywordsListProps {
  keywords: Keyword[];
  onAdd: (keyword: string) => void;
}

export function KeywordsList({ keywords, onAdd }: KeywordsListProps) {
  const [showInput, setShowInput] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');

  const handleAdd = () => {
    if (newKeyword.trim()) {
      onAdd(newKeyword.trim());
      setNewKeyword('');
      setShowInput(false);
    }
  };

  return (
    <Card padding="lg" className="h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[16px] font-semibold text-text-primary">Keywords</h3>
        <button
          onClick={() => setShowInput(true)}
          className="flex items-center gap-1.5 text-[13px] font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
        >
          <Plus size={14} />
          Add Keyword
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {showInput && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-1 px-3 py-1.5 bg-primary-50 border border-primary-200 rounded-lg"
            >
              <input
                autoFocus
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                placeholder="Keyword..."
                className="w-24 bg-transparent text-[13px] outline-none text-text-primary"
              />
              <button onClick={handleAdd} className="text-primary-500 cursor-pointer">
                <Plus size={14} />
              </button>
              <button onClick={() => setShowInput(false)} className="text-text-tertiary cursor-pointer">
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {keywords.map((kw, i) => (
          <motion.span
            key={kw.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            className="px-3 py-1.5 bg-primary-50 text-primary-600 text-[13px] font-medium rounded-lg border border-primary-100 hover:bg-primary-100 transition-colors cursor-default"
          >
            {kw.keyword}
          </motion.span>
        ))}
      </div>
    </Card>
  );
}
