'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, TrendingUp, TrendingDown, Minus, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { Competitor, TrendDirection } from '@/types/alert';
import clsx from 'clsx';

const trendIcons: Record<TrendDirection, React.ReactNode> = {
  up: <TrendingUp size={16} className="text-danger" />,
  down: <TrendingDown size={16} className="text-success" />,
  stable: <Minus size={16} className="text-text-tertiary" />,
};

interface CompetitorTrackingProps {
  competitors: Competitor[];
  onAdd: (name: string) => void;
}

export function CompetitorTracking({ competitors, onAdd }: CompetitorTrackingProps) {
  const [showInput, setShowInput] = useState(false);
  const [newName, setNewName] = useState('');

  const handleAdd = () => {
    if (newName.trim()) {
      onAdd(newName.trim());
      setNewName('');
      setShowInput(false);
    }
  };

  return (
    <Card padding="lg" className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[16px] font-semibold text-text-primary">Competitor Tracking</h3>
        <Button
          variant="primary"
          size="sm"
          icon={<Plus size={14} />}
          onClick={() => setShowInput(true)}
        >
          Add Competitor
        </Button>
      </div>

      <div className="space-y-1">
        {/* Add input */}
        <AnimatePresence>
          {showInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-3 mb-2 bg-primary-50 rounded-xl border border-primary-200">
                <input
                  autoFocus
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                  placeholder="Company name..."
                  className="flex-1 bg-transparent text-[14px] outline-none text-text-primary placeholder:text-text-tertiary"
                />
                <button onClick={handleAdd} className="text-primary-500 hover:text-primary-600 cursor-pointer">
                  <Plus size={16} />
                </button>
                <button onClick={() => setShowInput(false)} className="text-text-tertiary hover:text-text-secondary cursor-pointer">
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {competitors.map((comp, i) => (
          <motion.div
            key={comp.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={clsx(
              'flex items-center gap-4 px-4 py-3.5 rounded-xl',
              'hover:bg-surface-secondary transition-colors duration-150'
            )}
          >
            <span className="flex-shrink-0">{trendIcons[comp.trend]}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium text-text-primary">{comp.name}</p>
              <p className="text-[12px] text-text-tertiary">{comp.patentCount} patents tracked</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
