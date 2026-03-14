'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { Button } from '@/components/ui/Button';
import {
  Download,
  Database,
  AlertTriangle,
  XCircle,
  CheckCircle,
  Shield,
  Lightbulb,
  TrendingUp,
  Clock,
} from 'lucide-react';
import type { SimilarityResult, HeatmapSegment } from '@/types/similarity';
import clsx from 'clsx';

interface AnalysisResultsProps {
  result: SimilarityResult;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const riskVariant =
    result.litigationRisk.overallLevel === 'HIGH'
      ? 'danger'
      : result.litigationRisk.overallLevel === 'MEDIUM'
        ? 'warning'
        : 'success';

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Actions */}
      <motion.div variants={item} className="flex items-center justify-end gap-3">
        <Button variant="outline" size="md" icon={<Download size={16} />}>
          Salva in Locale
        </Button>
        <Button variant="primary" size="md" icon={<Database size={16} />}>
          Salva nel Database
        </Button>
      </motion.div>

      {/* Top Row: Score + Litigation Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Similarity Score */}
        <motion.div variants={item}>
          <Card padding="lg">
            <h3 className="text-[16px] font-semibold text-text-primary mb-6">
              Similarity Score
            </h3>
            <ProgressRing
              value={result.score}
              size={200}
              sublabel="Similarity"
              label={`High similarity detected with ${result.matchedPatents} existing patents`}
            />
          </Card>
        </motion.div>

        {/* Litigation Risk */}
        <motion.div variants={item}>
          <Card padding="lg">
            <h3 className="text-[16px] font-semibold text-text-primary mb-4">
              Litigation Risk Assessment
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle
                    size={18}
                    className={
                      result.litigationRisk.overallLevel === 'HIGH'
                        ? 'text-danger'
                        : 'text-warning'
                    }
                  />
                  <div>
                    <p className="text-[13px] text-text-secondary">Overall Risk Level</p>
                    <p className="text-[18px] font-bold text-text-primary">
                      {result.litigationRisk.overallLevel}
                    </p>
                  </div>
                </div>
                <Badge variant={riskVariant} size="md">
                  Critical
                </Badge>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-[14px]">
                  <AlertTriangle size={15} className="text-danger flex-shrink-0" />
                  <span className="text-text-primary">
                    {result.litigationRisk.highRiskCount} high-risk patent conflicts identified
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[14px]">
                  <AlertTriangle size={15} className="text-warning flex-shrink-0" />
                  <span className="text-text-primary">
                    {result.litigationRisk.mediumRiskCount} medium-risk overlaps detected
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[14px]">
                  <CheckCircle size={15} className="text-success flex-shrink-0" />
                  <span className="text-text-primary">
                    {result.litigationRisk.lowRiskCount} patents with low risk
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <p className="text-[13px] text-danger font-medium">
                  <span className="font-semibold">Recommendation:</span>{' '}
                  {result.litigationRisk.recommendation}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* FTO Heatmap */}
      <motion.div variants={item}>
        <Card padding="lg">
          <h3 className="text-[16px] font-semibold text-text-primary mb-4">
            Freedom to Operate Heatmap
          </h3>
          <div className="text-[14px] leading-relaxed text-text-primary">
            {result.heatmapSegments.map((segment: HeatmapSegment, i: number) => (
              <span
                key={i}
                className={clsx(
                  segment.type === 'infringement' && 'highlight-infringement',
                  segment.type === 'original' && 'highlight-original',
                  segment.type === 'whitespace' && 'highlight-whitespace'
                )}
              >
                {segment.text}
              </span>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* White Space + Bypass Strategies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* White Space Analysis */}
        <motion.div variants={item}>
          <Card padding="lg">
            <div className="flex items-center gap-2 mb-5">
              <Shield size={18} className="text-primary-500" />
              <h3 className="text-[16px] font-semibold text-text-primary">
                White Space Analysis
              </h3>
            </div>
            <div className="space-y-3">
              {result.whiteSpaceAreas.map((area, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] font-medium text-text-primary">
                      {area.label}
                    </span>
                    <span className="text-[13px] font-semibold text-primary-500">
                      {area.coverage}%
                    </span>
                  </div>
                  <div className="h-2 bg-surface-tertiary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full gradient-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${area.coverage}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Bypass Strategy Generator */}
        <motion.div variants={item}>
          <Card padding="lg">
            <div className="flex items-center gap-2 mb-5">
              <Lightbulb size={18} className="text-warning" />
              <h3 className="text-[16px] font-semibold text-text-primary">
                Bypass Strategy Generator
              </h3>
            </div>
            <div className="space-y-3">
              {result.bypassStrategies.map((strategy, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-3 bg-surface-secondary rounded-xl border border-border"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center text-[12px] font-bold">
                    {i + 1}
                  </span>
                  <p className="text-[13px] text-text-primary leading-relaxed">{strategy}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row: Claims Prediction + Time to Obsolete */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card padding="lg">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-primary-500" />
              <h3 className="text-[16px] font-semibold text-text-primary">Claims Prediction</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-danger">{result.claimsPrediction.vulnerable}</p>
                <p className="text-[11px] text-text-tertiary mt-1">Vulnerable</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{result.claimsPrediction.safe}</p>
                <p className="text-[11px] text-text-tertiary mt-1">Safe</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">{result.claimsPrediction.uncertain}</p>
                <p className="text-[11px] text-text-tertiary mt-1">Uncertain</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card padding="lg">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={18} className="text-text-tertiary" />
              <h3 className="text-[16px] font-semibold text-text-primary">Time to Obsolete</h3>
            </div>
            <p className="text-3xl font-bold text-text-primary">{result.timeToObsolete}</p>
            <p className="text-[13px] text-text-tertiary mt-2">
              Estimated time before patent claims expire or can be designed around
            </p>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
