'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Folder,
  FileText,
  FileSpreadsheet,
  Image,
  File,
  ChevronRight,
  Grid3X3,
  List,
  Upload,
  Sparkles,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import clsx from 'clsx';

type ViewMode = 'grid' | 'list';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  mimeType?: string;
  size?: string;
  modified?: string;
}

const getFileIcon = (item: FileItem) => {
  if (item.type === 'folder') return <Folder size={20} className="text-primary-500" />;
  if (item.mimeType?.includes('spreadsheet') || item.name.endsWith('.csv'))
    return <FileSpreadsheet size={20} className="text-success" />;
  if (item.mimeType?.includes('image'))
    return <Image size={20} className="text-warning" />;
  if (item.mimeType?.includes('pdf') || item.name.endsWith('.pdf'))
    return <FileText size={20} className="text-danger" />;
  return <File size={20} className="text-text-tertiary" />;
};

// Mock file data
const mockFiles: FileItem[] = [
  { id: '1', name: 'Research Documents', type: 'folder', modified: '2026-03-10' },
  { id: '2', name: 'Patent Analysis', type: 'folder', modified: '2026-03-08' },
  { id: '3', name: 'Competitor Reports', type: 'folder', modified: '2026-03-05' },
  { id: '4', name: 'patent_data_2026.csv', type: 'file', mimeType: 'text/csv', size: '2.4 MB', modified: '2026-03-10' },
  { id: '5', name: 'Neural_Network_v3.pdf', type: 'file', mimeType: 'application/pdf', size: '5.1 MB', modified: '2026-03-09' },
  { id: '6', name: 'market_analysis.csv', type: 'file', mimeType: 'text/csv', size: '1.8 MB', modified: '2026-03-07' },
  { id: '7', name: 'edge_computing_report.pdf', type: 'file', mimeType: 'application/pdf', size: '3.2 MB', modified: '2026-03-06' },
  { id: '8', name: 'competitor_data.csv', type: 'file', mimeType: 'text/csv', size: '890 KB', modified: '2026-03-04' },
];

// Mock CSV data
const mockCSVData = {
  headers: ['Patent ID', 'Title', 'Company', 'Filing Date', 'Status', 'Risk Score'],
  rows: [
    ['US-2026-001', 'Neural Network Optimization', 'TechCorp', '2026-01-15', 'Active', '85%'],
    ['US-2026-002', 'Edge Processing Method', 'Innovation Labs', '2026-01-22', 'Pending', '62%'],
    ['US-2026-003', 'Quantum Encryption', 'Global Research', '2026-02-01', 'Active', '34%'],
    ['US-2026-004', 'Adaptive ML System', 'FutureTech', '2026-02-10', 'Review', '71%'],
    ['US-2026-005', 'IoT Communication', 'Advanced Sys', '2026-02-18', 'Active', '45%'],
    ['US-2026-006', 'Data Compression', 'TechCorp', '2026-03-01', 'Pending', '58%'],
    ['US-2026-007', 'Autonomous Navigation', 'Innovation Labs', '2026-03-05', 'Active', '77%'],
    ['US-2026-008', 'Bio-sensor Array', 'Global Research', '2026-03-08', 'Review', '29%'],
  ],
};

export default function DatabasePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [breadcrumb, setBreadcrumb] = useState<string[]>(['My Drive']);
  const [openCSV, setOpenCSV] = useState<string | null>(null);
  const [csvData, setCSVData] = useState(mockCSVData);
  const [isAICleaning, setIsAICleaning] = useState(false);

  const handleFileClick = (item: FileItem) => {
    if (item.type === 'folder') {
      setBreadcrumb([...breadcrumb, item.name]);
    } else if (item.name.endsWith('.csv')) {
      setOpenCSV(item.name);
    }
  };

  const handleAIClean = async () => {
    setIsAICleaning(true);
    // Simulate AI cleaning
    await new Promise((r) => setTimeout(r, 2000));
    // In production: send to n8n webhook
    setCSVData({
      ...csvData,
      rows: csvData.rows.map((row) =>
        row.map((cell) => (cell === 'Pending' ? 'In Review' : cell))
      ),
    });
    setIsAICleaning(false);
  };

  const handleBackToFiles = () => {
    setOpenCSV(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6"
      >
        <h1 className="text-[28px] font-bold text-text-primary tracking-tight">Database</h1>
        <p className="text-[15px] text-text-secondary mt-1">
          Manage your research files and documents
        </p>
      </motion.div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between mb-6"
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-[14px]">
          {breadcrumb.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && <ChevronRight size={14} className="text-text-tertiary mx-1" />}
              <button
                onClick={() => setBreadcrumb(breadcrumb.slice(0, i + 1))}
                className={clsx(
                  'hover:text-primary-500 transition-colors cursor-pointer',
                  i === breadcrumb.length - 1
                    ? 'text-text-primary font-medium'
                    : 'text-text-tertiary'
                )}
              >
                {crumb}
              </button>
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {openCSV && (
            <Button variant="outline" size="sm" onClick={handleBackToFiles}>
              ← Back to Files
            </Button>
          )}
          <Button variant="outline" size="sm" icon={<Upload size={14} />}>
            Upload
          </Button>
          {!openCSV && (
            <div className="flex bg-surface-secondary border border-border rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={clsx(
                  'p-1.5 rounded-md transition-colors cursor-pointer',
                  viewMode === 'grid'
                    ? 'bg-surface text-text-primary shadow-xs'
                    : 'text-text-tertiary'
                )}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={clsx(
                  'p-1.5 rounded-md transition-colors cursor-pointer',
                  viewMode === 'list'
                    ? 'bg-surface text-text-primary shadow-xs'
                    : 'text-text-tertiary'
                )}
              >
                <List size={16} />
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Content */}
      {openCSV ? (
        /* CSV Editor */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileSpreadsheet size={20} className="text-success" />
              <h2 className="text-[16px] font-semibold text-text-primary">{openCSV}</h2>
            </div>
            <Button
              variant="primary"
              size="md"
              icon={
                isAICleaning ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Sparkles size={16} />
                )
              }
              onClick={handleAIClean}
              disabled={isAICleaning}
            >
              {isAICleaning ? 'Cleaning...' : 'Pulisci dati con AI'}
            </Button>
          </div>

          <Card padding="none" className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-surface-secondary border-b border-border">
                    {csvData.headers.map((header, i) => (
                      <th
                        key={i}
                        className="px-4 py-3 text-left font-semibold text-text-secondary whitespace-nowrap"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {csvData.rows.map((row, ri) => (
                    <motion.tr
                      key={ri}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: ri * 0.03 }}
                      className="border-b border-border last:border-0 hover:bg-surface-secondary/50 transition-colors"
                    >
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-4 py-3 text-text-primary whitespace-nowrap">
                          <input
                            defaultValue={cell}
                            className="bg-transparent outline-none w-full hover:bg-primary-50/30 focus:bg-primary-50 px-1 py-0.5 rounded transition-colors"
                            style={{ boxShadow: 'none' }}
                          />
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      ) : (
        /* File Grid/List */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className={clsx(
            viewMode === 'grid'
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
              : 'flex flex-col gap-1'
          )}
        >
          {mockFiles.map((file, i) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              {viewMode === 'grid' ? (
                <button
                  onClick={() => handleFileClick(file)}
                  className="w-full p-4 bg-surface border border-border rounded-2xl hover:shadow-md hover:border-border-strong transition-all duration-200 text-left cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-surface-secondary flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    {getFileIcon(file)}
                  </div>
                  <p className="text-[13px] font-medium text-text-primary truncate">
                    {file.name}
                  </p>
                  <p className="text-[11px] text-text-tertiary mt-1">
                    {file.size || 'Folder'} · {file.modified}
                  </p>
                </button>
              ) : (
                <button
                  onClick={() => handleFileClick(file)}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-surface-secondary transition-colors text-left cursor-pointer"
                >
                  {getFileIcon(file)}
                  <span className="flex-1 text-[14px] font-medium text-text-primary truncate">
                    {file.name}
                  </span>
                  <span className="text-[12px] text-text-tertiary">{file.size || '—'}</span>
                  <span className="text-[12px] text-text-tertiary">{file.modified}</span>
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
