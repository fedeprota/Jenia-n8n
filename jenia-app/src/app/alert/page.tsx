'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CompetitorTracking } from '@/components/alert/CompetitorTracking';
import { KeywordsList } from '@/components/alert/KeywordsList';
import { PatentTimeline } from '@/components/alert/PatentTimeline';
import type { Competitor, Keyword, Patent } from '@/types/alert';

// Mock data for sidebars
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

export default function AlertPage() {
  const [competitors, setCompetitors] = useState<Competitor[]>(initialCompetitors);
  const [keywords, setKeywords] = useState<Keyword[]>(initialKeywords);
  const [patents, setPatents] = useState<Patent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAlertData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL}/alert-data`);
        if (!res.ok) throw new Error('Failed to fetch from n8n');
        
        const data = await res.json();
        // Assume webhook returns an array under data.patents or directly the array
        const rawPatents = data.patents || (Array.isArray(data) ? data : []);
        
        // Ensure data matches Patent type
        const formattedPatents: Patent[] = rawPatents.map((p: any, index: number) => ({
          id: p.id || `n8n-${index}`,
          title: p.title || 'Unknown Title',
          company: p.company || 'Unknown Company',
          date: p.date || new Date().toISOString().split('T')[0],
          summary: p.summary || p.description || 'No summary available',
          riskLevel: p.riskLevel || p.risk_level || 'MEDIUM',
          similarityPct: p.similarityPct || p.similarity || Math.floor(Math.random() * 100),
        }));
        
        setPatents(formattedPatents);
      } catch (err) {
        console.error('Error fetching patents from n8n:', err);
        // Fallback or empty state could be handled here
      } finally {
        setIsLoading(false);
      }
    }
    fetchAlertData();
  }, []);

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
      <div className="mt-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 rounded-xl gradient-hero flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
            <span className="ml-3 text-text-secondary">Loading alerts from n8n...</span>
          </div>
        ) : (
          <PatentTimeline patents={patents} />
        )}
      </div>
    </div>
  );
}
