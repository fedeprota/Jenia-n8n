'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DocumentUpload } from '@/components/similarity/DocumentUpload';
import { ReportHistory } from '@/components/similarity/ReportHistory';
import { AnalysisResults } from '@/components/similarity/AnalysisResults';
import type { SimilarityResult, AnalysisReport } from '@/types/similarity';

// Mock historical reports
const mockReports: AnalysisReport[] = [
  {
    id: '1',
    filename: 'Neural_Network_Architecture_v3.pdf',
    score: 85,
    riskLevel: 'HIGH',
    date: '2026-03-10 alle 14:32',
  },
  {
    id: '2',
    filename: 'Edge_Computing_Protocol.pdf',
    score: 62,
    riskLevel: 'MEDIUM',
    date: '2026-03-08 alle 10:15',
  },
];

// Mock analysis result for demo
const mockResult: SimilarityResult = {
  score: 85,
  matchedPatents: 14,
  litigationRisk: {
    overallLevel: 'HIGH',
    highRiskCount: 3,
    mediumRiskCount: 7,
    lowRiskCount: 4,
    recommendation: 'Immediate legal review required before proceeding with development',
  },
  heatmapSegments: [
    {
      text: 'Your proposed invention relates to an advanced neural network architecture for real-time edge computing. ',
      type: 'neutral',
    },
    {
      text: 'The core processing methodology described in sections 2.3-2.5 shows substantial overlap with TechCorp Industries\' US Patent 11,234,567, specifically claims 3, 5, and 7 regarding inference optimization techniques.',
      type: 'infringement',
    },
    {
      text: ' The data preprocessing pipeline appears novel and does not conflict with existing IP. ',
      type: 'neutral',
    },
    {
      text: 'Your hybrid cloud integration approach (section 4.1) represents a clear white space opportunity with no direct prior art identified.',
      type: 'whitespace',
    },
    {
      text: ' However, ',
      type: 'neutral',
    },
    {
      text: 'the adaptive learning algorithm in section 5.2 closely mirrors patented techniques from Innovation Labs (EP 3,456,789), which could pose moderate infringement risk.',
      type: 'infringement',
    },
  ],
  whiteSpaceAreas: [
    { label: 'Hybrid Cloud Integration', coverage: 92 },
    { label: 'Data Preprocessing', coverage: 78 },
    { label: 'Edge Deployment', coverage: 45 },
    { label: 'Model Compression', coverage: 23 },
  ],
  bypassStrategies: [
    'Replace inference optimization with a novel quantization-aware training approach that achieves similar performance without infringing on TechCorp\'s patented methodology.',
    'Implement a federated learning architecture for the adaptive algorithm, thereby differentiating from Innovation Labs\' centralized approach.',
    'Leverage the identified white space in hybrid cloud integration as the primary differentiator, building patent claims around this novel approach.',
  ],
  claimsPrediction: {
    total: 24,
    vulnerable: 8,
    safe: 12,
    uncertain: 4,
  },
  timeToObsolete: '3.5 years',
};

export default function SimilarityPage() {
  const [analysisResult, setAnalysisResult] = useState<SimilarityResult | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setIsUploading(true);

    try {
      // In production: send to n8n webhook
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL}/similarity-score`,
          { method: 'POST', body: formData }
        );
        if (res.ok) {
          const data = await res.json();
          setAnalysisResult(data);
          return;
        }
      } catch {
        // n8n not available — fall back to mock
      }

      // Fallback: simulate analysis with mock data
      await new Promise((r) => setTimeout(r, 2500));
      setAnalysisResult(mockResult);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <h1 className="text-[28px] font-bold text-text-primary tracking-tight">
          Similarity Score Analysis
        </h1>
        <p className="text-[15px] text-text-secondary mt-1">
          Upload your technical document for comprehensive patent analysis
        </p>
      </motion.div>

      {/* Conditional content */}
      {analysisResult ? (
        <AnalysisResults result={analysisResult} />
      ) : (
        <>
          <DocumentUpload onUpload={handleUpload} isUploading={isUploading} />
          <ReportHistory reports={mockReports} />
        </>
      )}
    </div>
  );
}
