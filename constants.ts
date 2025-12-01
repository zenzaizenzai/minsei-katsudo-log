import { ActivityType, Category } from './types';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'c1', name: '高齢者 見守り', type: ActivityType.MINSEI, displayOrder: 1 },
  { id: 'c2', name: '相談・助言', type: ActivityType.MINSEI, displayOrder: 2 },
  { id: 'c3', name: '会議・研修', type: ActivityType.MINSEI, displayOrder: 3 },
  { id: 'c4', name: '児童 見守り', type: ActivityType.JIDOU, displayOrder: 4 },
  { id: 'c5', name: '子育て相談', type: ActivityType.JIDOU, displayOrder: 5 },
  { id: 'c6', name: '学校・園 連絡', type: ActivityType.JIDOU, displayOrder: 6 },
  { id: 'c7', name: '行事参加', type: ActivityType.MINSEI, displayOrder: 7 },
  { id: 'c8', name: 'その他', type: ActivityType.MINSEI, displayOrder: 8 },
];

export const STORAGE_KEY_RECORDS = 'minsei_app_records_v1';
export const STORAGE_KEY_CATEGORIES = 'minsei_app_categories_v1';
