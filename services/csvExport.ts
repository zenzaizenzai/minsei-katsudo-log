import { ActivityRecord, ActivityType } from '../types';

export const downloadCSV = (records: ActivityRecord[], year: number, month: number) => {
  // Filter records for the specified month
  const targetRecords = records.filter(r => {
    const d = new Date(r.date);
    return d.getFullYear() === year && d.getMonth() + 1 === month;
  }).sort((a, b) => {
    // Sort by date then start time
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return (a.startTime || '').localeCompare(b.startTime || '');
  });

  if (targetRecords.length === 0) {
    alert('この月のデータはありません。');
    return;
  }

  // Helper to quote string for CSV (handle quotes inside text)
  // Excel is less likely to garble if all fields are quoted
  const q = (str: string | undefined | null) => {
    if (str === undefined || str === null) return '""';
    return `"${String(str).replace(/"/g, '""')}"`;
  };

  // CSV Header
  const header = ['日付', '種別', '活動内容', '時間(分)', '開始時刻', '対応人数', 'メモ'].map(q);
  
  // CSV Body
  const rows = targetRecords.map(r => [
    q(r.date),
    q(r.activityType === ActivityType.JIDOU ? '児童' : '民生'),
    q(r.categoryName),
    q(r.durationMinutes.toString()),
    q(r.startTime || '-'),
    q(r.count ? r.count.toString() : '-'),
    q(r.memo)
  ]);

  const csvContent = [
    header.join(','),
    ...rows.map(row => row.join(','))
  ].join('\r\n');

  // Add BOM for Excel compatibility (UTF-8 with BOM)
  const bom = "\uFEFF";
  // Explicitly set charset=utf-8 in the MIME type
  const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `活動記録_${year}年${month}月.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};