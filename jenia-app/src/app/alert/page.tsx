'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CompetitorTracking } from '@/components/alert/CompetitorTracking';
import { KeywordsList } from '@/components/alert/KeywordsList';
import { PatentTimeline } from '@/components/alert/PatentTimeline';
import type { Competitor, Keyword, Patent } from '@/types/alert';

// Mock data
const initialCompetitors: Competitor[] = [
  { id: '1', name: 'TechCorp Industries', patentCount: 127, trend: 'up' },
  { id: '2', name: 'Innovation Labs', patentCount: 89, trend: 'up' },
  { id: '3', name: 'Global Research Inc', patentCount: 56, trend: 'stable' },
  { id: '4', name: 'FutureTech Solutions', patentCount: 43, trend: 'down' },
  { id: '5', name: 'Advanced Systems Co', patentCount: 38, trend: 'up' },
];

const initialKeywords: Keyword[] = [
  { id: '1', keyword: 'Machine Learning' },
  { id: '2', keyword: 'Neural Networks' },
  { id: '3', keyword: 'Computer Vision' },
  { id: '4', keyword: 'Natural Language' },
  { id: '5', keyword: 'Robotics' },
  { id: '6', keyword: 'Quantum Computing' },
  { id: '7', keyword: 'Edge Computing' },
  { id: '8', keyword: '5G Technology' },
  { id: '9', keyword: 'Blockchain' },
];

const initialPatents: Patent[] = [
  {
    id: '1',
    title: 'Advanced Neural Network Architecture for Real-Time Processing',
    company: 'TechCorp Industries',
    date: '2026-03-10',
    summary:
      'This patent presents a novel approach to neural network optimization. THREAT: Direct overlap with our current R&D project on edge computing AI. SIMILARITY: 78% overlap in claims 3-7 regarding inference optimization.',
    riskLevel: 'HIGH',
    similarityPct: 78,
  },
  {
    id: '2',
    title: 'Distributed Computing System with Autonomous Load Balancing',
    company: 'Innovation Labs',
    date: '2026-03-08',
    summary:
      'A method for dynamic resource allocation across distributed systems. OPPORTUNITY: White space identified in patent claims – no coverage for hybrid cloud scenarios. SIMILARITY: 45% overlap in architectural patterns.',
    riskLevel: 'MEDIUM',
    similarityPct: 45,
  },
  {
    id: '3',
    title: 'Quantum-Resistant Encryption Protocol for IoT Devices',
    company: 'Global Research Inc',
    date: '2026-03-05',
    summary:
      'Novel encryption method designed for resource-constrained devices. LOW RISK: Focuses on different technical domain. SIMILARITY: 12% overlap, primarily in background descriptions.',
    riskLevel: 'LOW',
    similarityPct: 12,
  },
  {
    id: '4',
    title: 'Adaptive Learning System for Predictive Maintenance',
    company: 'TechCorp Industries',
    date: '2026-03-01',
    summary:
      'Machine learning system for industrial equipment monitoring. THREAT: Potential IP conflict in claims 8-12. SIMILARITY: 82% similarity in training methodology and data preprocessing steps.',
    riskLevel: 'HIGH',
    similarityPct: 82,
  },
];

export default function AlertPage() {
  const [competitors, setCompetitors] = useState<Competitor[]>(initialCompetitors);
  const [keywords, setKeywords] = useState<Keyword[]>(initialKeywords);

  const handleAddCompetitor = (name: string) => {
    const newCompetitor: Competitor = {
      id: crypto.randomUUID(),
      name,
      patentCount: 0,
      trend: 'stable',
    };
    setCompetitors((prev) => [...prev, newCompetitor]);
  };

  const handleAddKeyword = (keyword: string) => {
    const newKeyword: Keyword = {
      id: crypto.randomUUID(),
      keyword,
    };
    setKeywords((prev) => [...prev, newKeyword]);
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <h1 className="text-[28px] font-bold text-text-primary tracking-tight">
          Competitor Intelligence Dashboard
        </h1>
        <p className="text-[15px] text-text-secondary mt-1">
          Monitor competitor patent activity and track emerging threats
        </p>
      </motion.div>

      {/* Top grid: Competitors + Keywords */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <CompetitorTracking competitors={competitors} onAdd={handleAddCompetitor} />
        <KeywordsList keywords={keywords} onAdd={handleAddKeyword} />
      </div>

      {/* Patent Timeline */}
      <PatentTimeline patents={initialPatents} />
    </div>
  );
}
