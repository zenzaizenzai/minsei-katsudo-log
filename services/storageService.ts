import { ActivityRecord, Category } from '../types';
import { STORAGE_KEY_RECORDS, STORAGE_KEY_CATEGORIES, DEFAULT_CATEGORIES } from '../constants';

export const saveRecords = (records: ActivityRecord[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(records));
  } catch (e) {
    console.error('Failed to save records', e);
    alert('保存に失敗しました。容量がいっぱいの可能性があります。');
  }
};

export const loadRecords = (): ActivityRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_RECORDS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load records', e);
    return [];
  }
};

export const saveCategories = (categories: Category[]) => {
  localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
};

export const loadCategories = (): Category[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CATEGORIES);
    return data ? JSON.parse(data) : DEFAULT_CATEGORIES;
  } catch (e) {
    return DEFAULT_CATEGORIES;
  }
};
