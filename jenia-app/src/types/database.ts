export type FileType = 'folder' | 'file';

export interface DriveItem {
  id: string;
  name: string;
  type: FileType;
  mimeType?: string;
  size?: number;
  modifiedTime?: string;
  parents?: string[];
}

export interface CSVData {
  headers: string[];
  rows: Record<string, string | number | boolean | null>[];
}
