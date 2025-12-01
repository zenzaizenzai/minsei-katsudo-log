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

  // CSV Header
  const header = ['日付', '種別', '活動内容', '時間(分)', '開始時刻', '対応人数', 'メモ'];
  
  // CSV Body
  const rows = targetRecords.map(r => [
    r.date,
    r.activityType === ActivityType.JIDOU ? '児童' : '民生',
    r.categoryName,
    r.durationMinutes.toString(),
    r.startTime || '-',
    r.count ? r.count.toString() : '-',
    `"${(r.memo || '').replace(/"/g, '""')}"` // Escape quotes
  ]);

  const csvContent = [
    header.join(','),
    ...rows.map(row => row.join(','))
  ].join('\r\n');

  // Add BOM for Excel compatibility (UTF-8)
  const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  const blob = new Blob([bom, csvContent], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `活動記録_${year}年${month}月.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
