'use client';

import React, { useState, useRef, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Paperclip, ArrowUp } from 'lucide-react';
import clsx from 'clsx';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
    }
  };

  const hasContent = value.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl mx-auto px-6 pb-6"
    >
      <div
        className={clsx(
          'flex items-end gap-3 px-4 py-3',
          'bg-surface border border-border rounded-2xl',
          'shadow-sm transition-shadow duration-200',
          'focus-within:shadow-md focus-within:border-primary-300'
        )}
      >
        {/* Attach button */}
        <button
          className="flex-shrink-0 p-2 rounded-xl text-text-tertiary hover:text-text-secondary hover:bg-surface-tertiary transition-colors cursor-pointer"
          title="Attach file"
        >
          <Paperclip size={20} />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder="Type your question here..."
          rows={1}
          disabled={disabled}
          className={clsx(
            'flex-1 resize-none bg-transparent text-[15px] text-text-primary',
            'placeholder:text-text-tertiary',
            'outline-none border-none py-1',
            'max-h-40'
          )}
          style={{ boxShadow: 'none' }}
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!hasContent || disabled}
          className={clsx(
            'flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center',
            'transition-all duration-200 cursor-pointer',
            hasContent && !disabled
              ? 'bg-primary-500 text-white shadow-sm hover:bg-primary-600 active:scale-95'
              : 'bg-surface-tertiary text-text-tertiary'
          )}
        >
          <ArrowUp size={18} strokeWidth={2.5} />
        </button>
      </div>
    </motion.div>
  );
}
