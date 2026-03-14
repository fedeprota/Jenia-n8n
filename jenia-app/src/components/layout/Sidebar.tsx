'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  BarChart3,
  Bell,
  Database,
  MessageSquare,
  Clock,
} from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import clsx from 'clsx';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: '/similarity', label: 'Similarity Score', icon: <BarChart3 size={18} /> },
  { href: '/alert', label: 'Alert', icon: <Bell size={18} /> },
  { href: '/database', label: 'Database', icon: <Database size={18} /> },
];

// Mock chat history — will be fetched from Supabase in production
const chatHistory = [
  { id: '1', title: 'Patent analysis for competito...', time: '2 ore fa' },
  { id: '2', title: 'Freedom to operate analysis', time: 'Ieri' },
  { id: '3', title: 'White space opportunities', time: '3 giorni fa' },
  { id: '4', title: 'Litigation risk assessment', time: '1 settimana fa' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { showChatHistory } = useSidebar();

  return (
    <aside className="w-[260px] h-screen flex flex-col border-r border-border bg-surface-secondary/60 backdrop-blur-xl sticky top-0 overflow-hidden">
      {/* New Chat Button */}
      <div className="p-4 pb-2">
        <Link
          href="/"
          className={clsx(
            'flex items-center gap-2 px-4 py-2.5 rounded-xl text-[14px] font-semibold',
            'bg-primary-500 text-white shadow-sm',
            'hover:bg-primary-600 transition-colors duration-200',
            'active:scale-[0.98] transform'
          )}
        >
          <Plus size={16} strokeWidth={2.5} />
          Nuova Chat
        </Link>
      </div>

      {/* Navigation */}
      <nav className="px-2 py-1 flex flex-col gap-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-4 py-2.5 rounded-xl text-[14px] font-medium',
                'transition-all duration-200',
                isActive
                  ? 'bg-primary-50 text-primary-600 font-semibold'
                  : 'text-text-secondary hover:bg-surface-tertiary hover:text-text-primary'
              )}
            >
              <span className={clsx(isActive ? 'text-primary-500' : 'text-text-tertiary')}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Chat History — animated visibility */}
      <AnimatePresence>
        {showChatHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex-1 overflow-hidden flex flex-col"
          >
            <div className="mx-4 my-3 border-t border-border" />

            <div className="px-4 mb-2 flex items-center gap-2">
              <Clock size={14} className="text-text-tertiary" />
              <span className="text-[12px] font-semibold text-text-tertiary uppercase tracking-wider">
                Cronologia Chat
              </span>
            </div>

            <div className="flex-1 overflow-y-auto px-2 pb-4">
              {chatHistory.map((chat) => (
                <button
                  key={chat.id}
                  className={clsx(
                    'w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left',
                    'hover:bg-surface-tertiary transition-colors duration-150',
                    'group cursor-pointer'
                  )}
                >
                  <MessageSquare
                    size={15}
                    className="text-text-tertiary mt-0.5 flex-shrink-0 group-hover:text-text-secondary"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium text-text-primary truncate">
                      {chat.title}
                    </p>
                    <p className="text-[11px] text-text-tertiary mt-0.5">
                      {chat.time}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
