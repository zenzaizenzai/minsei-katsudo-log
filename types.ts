export enum ActivityType {
  MINSEI = 'MINSEI', // 民生委員活動
  JIDOU = 'JIDOU',   // 児童委員活動
}

export interface Category {
  id: string;
  name: string;
  type: ActivityType;
  isCustom?: boolean;
  displayOrder: number;
}

export interface ActivityRecord {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  durationMinutes: number;
  categoryId: string;
  categoryName: string; // Snapshot in case category is deleted
  activityType: ActivityType;
  memo: string;
  count?: number; // 対応人数
}

export type ViewState = 'HOME' | 'FORM' | 'LIST' | 'SETTINGS' | 'GUIDE';