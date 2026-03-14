'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { AnalysisReport, RiskLevel } from '@/types/similarity';

const riskVariant: Record<RiskLevel, 'danger' | 'warning' | 'success'> = {
  HIGH: 'danger',
  MEDIUM: 'warning',
  LOW: 'success',
};

interface ReportHistoryProps {
  reports: AnalysisReport[];
}

export function ReportHistory({ reports }: ReportHistoryProps) {
  if (reports.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mt-8"
    >
      <div className="card-flat p-6">
        <div className="flex items-center gap-2 mb-5">
          <Clock size={16} className="text-text-tertiary" />
          <h3 className="text-[15px] font-semibold text-text-primary">
            Cronologia Report
          </h3>
        </div>

        <div className="flex flex-col gap-3">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border hover:shadow-sm transition-shadow cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                <FileText size={18} className="text-primary-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-text-primary truncate">
                  {report.filename}
                </p>
                <p className="text-[12px] text-text-tertiary mt-0.5">
                  {report.date}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[14px] font-semibold text-text-primary">
                  Score: {report.score}%
                </span>
                <Badge variant={riskVariant[report.riskLevel]}>{report.riskLevel}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
