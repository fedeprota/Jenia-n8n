export type RiskLevel = 'HIGH' | 'MEDIUM' | 'LOW';
export type TrendDirection = 'up' | 'down' | 'stable';

export interface Competitor {
  id: string;
  name: string;
  patentCount: number;
  trend: TrendDirection;
}

export interface Keyword {
  id: string;
  keyword: string;
}

export interface Patent {
  id: string;
  title: string;
  company: string;
  date: string;
  summary: string;
  riskLevel: RiskLevel;
  similarityPct: number;
}

export interface AlertData {
  competitors: Competitor[];
  keywords: Keyword[];
  patents: Patent[];
}
