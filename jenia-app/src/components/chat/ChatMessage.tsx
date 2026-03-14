'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, User } from 'lucide-react';
import clsx from 'clsx';
import type { ChatMessage as ChatMessageType } from '@/types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={clsx('flex gap-3 max-w-3xl', isUser ? 'ml-auto flex-row-reverse' : '')}
    >
      {/* Avatar */}
      <div
        className={clsx(
          'flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center',
          isUser
            ? 'bg-surface-tertiary text-text-secondary'
            : 'gradient-hero text-white'
        )}
      >
        {isUser ? <User size={16} /> : <Sparkles size={16} />}
      </div>

      {/* Content */}
      <div
        className={clsx(
          'px-4 py-3 rounded-2xl text-[14px] leading-relaxed max-w-[80%]',
          isUser
            ? 'bg-primary-500 text-white rounded-tr-md'
            : 'bg-surface-secondary text-text-primary border border-border rounded-tl-md'
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </motion.div>
  );
}
