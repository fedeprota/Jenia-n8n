'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import type { Patent, RiskLevel } from '@/types/alert';

const riskVariant: Record<RiskLevel, 'danger' | 'warning' | 'success'> = {
  HIGH: 'danger',
  MEDIUM: 'warning',
  LOW: 'success',
};

const riskLabel: Record<RiskLevel, string> = {
  HIGH: 'HIGH RISK',
  MEDIUM: 'MEDIUM RISK',
  LOW: 'LOW RISK',
};

interface PatentTimelineProps {
  patents: Patent[];
}

export function PatentTimeline({ patents }: PatentTimelineProps) {
  return (
    <div className="mt-8">
      <h3 className="text-[18px] font-semibold text-text-primary mb-6">
        Recently Released Patents
      </h3>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-border" />

        <div className="space-y-2">
          {patents.map((patent, i) => (
            <motion.div
              key={patent.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex gap-6 pl-8"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-6 w-6 h-6 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 + 0.2, type: 'spring', stiffness: 300 }}
                  className="w-3 h-3 rounded-full bg-primary-500 ring-4 ring-primary-100"
                />
              </div>

              {/* Patent card */}
              <div className="flex-1 p-5 bg-surface border border-border rounded-2xl hover:shadow-md transition-shadow duration-200 mb-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[13px] text-text-tertiary mb-1.5">
                      <span>{patent.date}</span>
                      <span>·</span>
                      <span className="text-primary-500 font-medium hover:underline cursor-pointer">
                        {patent.company}
                      </span>
                    </div>
                    <h4 className="text-[15px] font-semibold text-text-primary mb-2 leading-snug">
                      {patent.title}
                    </h4>
                    <p className="text-[13px] text-text-secondary leading-relaxed">
                      {patent.summary}
                    </p>
                  </div>
                  <Badge variant={riskVariant[patent.riskLevel]} size="sm" className="flex-shrink-0 mt-1">
                    {riskLabel[patent.riskLevel]}
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
