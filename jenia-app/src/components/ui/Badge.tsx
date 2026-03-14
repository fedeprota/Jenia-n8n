'use client';

import React from 'react';
import clsx from 'clsx';

type BadgeVariant = 'danger' | 'warning' | 'success' | 'info' | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

const variantStyles: Record<BadgeVariant, string> = {
  danger: 'bg-danger-bg text-danger border border-danger/20',
  warning: 'bg-warning-bg text-warning border border-warning/20',
  success: 'bg-success-bg text-success border border-success/20',
  info: 'bg-primary-100 text-primary-600 border border-primary-200',
  neutral: 'bg-surface-tertiary text-text-secondary border border-border',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-[11px]',
  md: 'px-2.5 py-1 text-[12px]',
};

export function Badge({ variant = 'neutral', children, className, size = 'sm' }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-semibold rounded-md uppercase tracking-wide',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
