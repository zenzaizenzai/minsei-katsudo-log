import React, { useState, useMemo } from 'react';
import { ActivityRecord, ActivityType } from '../types';
import { ArrowLeft, Download, Trash2, Filter } from 'lucide-react';
import { downloadCSV } from '../services/csvExport';
import { BigButton } from './ui/BigButton';

interface ActivityListProps {
  records: ActivityRecord[];
  onBack: () => void;
  onDelete: (id: string) => void;
}

export const ActivityList: React.FC<ActivityListProps> = ({ records, onBack, onDelete }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filterType, setFilterType] = useState<'ALL' | 'JIDOU'>('ALL');

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 1-12

  // Filter records by month and type
  const filteredRecords = useMemo(() => {
    return records
      .filter(r => {
        const d = new Date(r.date);
        const matchesMonth = d.getFullYear() === currentYear && (d.getMonth() + 1) === currentMonth;
        const matchesType = filterType === 'ALL' || (filterType === 'JIDOU' && r.activityType === ActivityType.JIDOU);
        return matchesMonth && matchesType;
      })
      .sort((a, b) => {
        // Sort descending by date (newest first)
        if (a.date !== b.date) return b.date.localeCompare(a.date);
        return (b.startTime || '').localeCompare(a.startTime || '');
      });
  }, [records, currentYear, currentMonth, filterType]);

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('この記録を削除しますか？')) {
      onDelete(id);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600 rounded-full active:bg-gray-100">
          <ArrowLeft size={32} />
        </button>
        <h2 className="text-xl font-bold">活動記録一覧</h2>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      {/* Month Selector */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <button onClick={() => changeMonth(-1)} className="p-3 bg-gray-100 rounded-lg font-bold text-xl active:bg-gray-200">
          &lt; 前
        </button>
        <div className="text-2xl font-bold text-blue-900">
          {currentYear}年 {currentMonth}月
        </div>
        <button onClick={() => changeMonth(1)} className="p-3 bg-gray-100 rounded-lg font-bold text-xl active:bg-gray-200">
          次 &gt;
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex p-2 gap-2 bg-gray-50 border-b border-gray-200">
        <button 
          onClick={() => setFilterType('ALL')}
          className={`flex-1 py-3 rounded-lg font-bold text-lg ${filterType === 'ALL' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 border'}`}
        >
          すべて
        </button>
        <button 
          onClick={() => setFilterType('JIDOU')}
          className={`flex-1 py-3 rounded-lg font-bold text-lg ${filterType === 'JIDOU' ? 'bg-pink-600 text-white shadow-md' : 'bg-white text-gray-600 border'}`}
        >
          児童のみ
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredRecords.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-xl">
            記録がありません
          </div>
        ) : (
          filteredRecords.map(record => (
            <div key={record.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-800">
                    {new Date(record.date).getDate()}日
                  </span>
                  <span className={`px-2 py-1 rounded text-sm font-bold ${record.activityType === ActivityType.JIDOU ? 'bg-pink-100 text-pink-800' : 'bg-blue-100 text-blue-800'}`}>
                    {record.activityType === ActivityType.JIDOU ? '児童' : '民生'}
                  </span>
                </div>
                <button 
                  onClick={() => handleDelete(record.id)}
                  className="text-gray-400 p-2 -mt-2 -mr-2 active:text-red-500"
                >
                  <Trash2 size={24} />
                </button>
              </div>

              <div className="flex items-baseline gap-2">
                 <h3 className="text-xl font-bold text-gray-900">{record.categoryName}</h3>
                 <span className="text-gray-600 text-lg">{record.durationMinutes}分</span>
              </div>
              
              {(record.startTime || record.count) && (
                <div className="text-gray-600 flex gap-4 text-base">
                  {record.startTime && <span>開始: {record.startTime}</span>}
                  {record.count && <span>相手: {record.count}人</span>}
                </div>
              )}

              {record.memo && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg text-lg text-gray-700 break-words">
                  {record.memo}
                </div>
              )}
            </div>
          ))
        )}
        {/* Spacer for bottom button */}
        <div className="h-24"></div>
      </div>

      {/* Export Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <BigButton 
          variant="neutral" 
          onClick={() => downloadCSV(records, currentYear, currentMonth)}
          icon={<Download size={24} />}
        >
          {currentMonth}月分を保存・送信 (CSV)
        </BigButton>
      </div>
    </div>
  );
};
