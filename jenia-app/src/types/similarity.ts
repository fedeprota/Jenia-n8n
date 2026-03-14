export type RiskLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface SimilarityResult {
  score: number;
  matchedPatents: number;
  litigationRisk: LitigationRisk;
  heatmapSegments: HeatmapSegment[];
  whiteSpaceAreas: WhiteSpaceArea[];
  bypassStrategies: string[];
  claimsPrediction: ClaimsPrediction;
  timeToObsolete: string;
}

export interface LitigationRisk {
  overallLevel: RiskLevel;
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
  recommendation: string;
}

export interface HeatmapSegment {
  text: string;
  type: 'infringement' | 'original' | 'neutral' | 'whitespace';
}

export interface WhiteSpaceArea {
  label: string;
  coverage: number;
}

export interface ClaimsPrediction {
  total: number;
  vulnerable: number;
  safe: number;
  uncertain: number;
}

export interface AnalysisReport {
  id: string;
  filename: string;
  score: number;
  riskLevel: RiskLevel;
  date: string;
}
