'use client';

import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({ children, className, hover = false, padding = 'md' }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-surface border border-border rounded-2xl shadow-xs',
        'transition-all duration-200',
        hover && 'hover:shadow-md hover:border-border-strong',
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
