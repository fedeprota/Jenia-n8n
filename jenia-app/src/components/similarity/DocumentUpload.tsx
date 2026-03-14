'use client';

import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import clsx from 'clsx';

interface DocumentUploadProps {
  onUpload: (file: File) => void;
  isUploading?: boolean;
}

export function DocumentUpload({ onUpload, isUploading }: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) onUpload(file);
    },
    [onUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onUpload(file);
    },
    [onUpload]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={clsx(
          'relative flex flex-col items-center justify-center',
          'py-16 px-8 rounded-2xl border-2 border-dashed',
          'transition-all duration-300 cursor-pointer',
          isDragging
            ? 'border-primary-400 bg-primary-50/50 scale-[1.01]'
            : 'border-border-strong bg-surface-secondary/50 hover:border-primary-300 hover:bg-primary-50/20'
        )}
      >
        <div
          className={clsx(
            'w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors',
            isDragging ? 'bg-primary-100 text-primary-500' : 'bg-surface-tertiary text-text-tertiary'
          )}
        >
          {isUploading ? (
            <div className="w-6 h-6 border-2 border-primary-300 border-t-primary-500 rounded-full animate-spin" />
          ) : (
            <Upload size={24} />
          )}
        </div>

        <p className="text-[16px] font-semibold text-text-primary mb-2">
          {isUploading ? 'Analyzing document...' : 'Drag and drop your document here'}
        </p>
        <p className="text-[13px] text-text-tertiary mb-5">
          Supported formats: PDF, DOCX, TXT (Max 50MB)
        </p>

        <label>
          <Button
            variant="primary"
            size="md"
            icon={<FileText size={16} />}
            disabled={isUploading}
          >
            Upload Document
          </Button>
          <input
            type="file"
            className="hidden"
            accept=".pdf,.docx,.doc,.txt"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
        </label>
      </div>
    </motion.div>
  );
}
