export const APP_NAME = 'Jenia';

export const RISK_LEVELS = {
  HIGH: { label: 'HIGH RISK', color: 'bg-red-500/10 text-red-600 border-red-200' },
  MEDIUM: { label: 'MEDIUM RISK', color: 'bg-amber-500/10 text-amber-600 border-amber-200' },
  LOW: { label: 'LOW RISK', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200' },
} as const;

export const SUPPORTED_UPLOAD_FORMATS = ['PDF', 'DOCX', 'TXT'];
export const MAX_UPLOAD_SIZE_MB = 50;

export const N8N_ENDPOINTS = {
  CHAT: 'chat-agent',
  SIMILARITY: 'similarity-score',
  ALERT_DATA: 'alert-data',
  DRIVE: 'drive',
  CSV_CLEAN: 'csv-clean',
  ADD_COMPETITOR: 'add-competitor',
  ADD_KEYWORD: 'add-keyword',
} as const;
