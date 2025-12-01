import React, { useState, useEffect } from 'react';
import { Category, ActivityRecord, ActivityType } from '../types';
import { ArrowLeft, Save, Clock, Users, FileText } from 'lucide-react';
import { BigButton } from './ui/BigButton';

interface ActivityFormProps {
  category: Category;
  onSave: (record: ActivityRecord) => void;
  onCancel: () => void;
}

export const ActivityForm: React.FC<ActivityFormProps> = ({ category, onSave, onCancel }) => {
  const [date, setDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [duration, setDuration] = useState<number>(30); // Default 30 mins
  const [memo, setMemo] = useState<string>('');
  const [count, setCount] = useState<number>(1);
  const [isJidou, setIsJidou] = useState<boolean>(category.type === ActivityType.JIDOU);

  useEffect(() => {
    // Set default date to today YYYY-MM-DD
    const today = new Date();
    setDate(today.toISOString().split('T')[0]);
    
    // Set default time to now HH:mm
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setStartTime(`${hours}:${minutes}`);
  }, []);

  const handleSave = () => {
    if (!date) {
      alert('日付を入力してください');
      return;
    }

    const record: ActivityRecord = {
      id: Date.now().toString(),
      date,
      startTime,
      durationMinutes: duration,
      categoryId: category.id,
      categoryName: category.name,
      activityType: isJidou ? ActivityType.JIDOU : ActivityType.MINSEI,
      memo,
      count
    };

    onSave(record);
  };

  const adjustDuration = (amount: number) => {
    setDuration(prev => Math.max(0, prev + amount));
  };

  const adjustCount = (amount: number) => {
    setCount(prev => Math.max(1, prev + amount));
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm overflow-y-auto">
      {/* Header */}
      <div className={`p-4 text-white flex items-center rounded-t-2xl ${isJidou ? 'bg-pink-600' : 'bg-blue-600'}`}>
        <button onClick={onCancel} className="p-2 mr-2 active:bg-white/20 rounded-full">
          <ArrowLeft size={32} />
        </button>
        <h2 className="text-xl-large font-bold">{category.name}</h2>
      </div>

      <div className="p-4 space-y-8 pb-24">
        
        {/* Date & Time */}
        <div className="space-y-4">
          <label className="block text-lg-large font-bold text-gray-800">いつ？</label>
          <div className="flex gap-4">
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-4 text-xl border-2 border-gray-300 rounded-xl bg-gray-50"
            />
          </div>
          <div className="flex gap-4 items-center">
             <input 
              type="time" 
              value={startTime} 
              onChange={(e) => setStartTime(e.target.value)}
              className="w-1/2 p-4 text-xl border-2 border-gray-300 rounded-xl bg-gray-50"
            />
            <span className="text-lg font-bold">開始</span>
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-4">
          <label className="block text-lg-large font-bold text-gray-800 flex items-center">
            <Clock className="mr-2" /> 何分くらい？
          </label>
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
             <button onClick={() => adjustDuration(-10)} className="p-4 bg-white border-2 border-gray-300 rounded-lg shadow-sm text-2xl font-bold w-16 h-16 flex items-center justify-center">-</button>
             <div className="flex-1 text-center">
               <span className="text-3xl font-bold text-blue-800">{duration}</span>
               <span className="text-lg ml-2">分</span>
             </div>
             <button onClick={() => adjustDuration(10)} className="p-4 bg-white border-2 border-gray-300 rounded-lg shadow-sm text-2xl font-bold w-16 h-16 flex items-center justify-center">+</button>
          </div>
          <div className="flex gap-2 justify-center">
             {[15, 30, 60].map(m => (
               <button 
                 key={m} 
                 onClick={() => setDuration(m)}
                 className="px-4 py-2 bg-gray-200 rounded-lg text-lg font-medium"
               >
                 {m}分
               </button>
             ))}
          </div>
        </div>

        {/* Count (People) */}
        <div className="space-y-4">
          <label className="block text-lg-large font-bold text-gray-800 flex items-center">
            <Users className="mr-2" /> 相手の人数は？
          </label>
          <div className="flex items-center gap-4">
             <button onClick={() => adjustCount(-1)} className="p-3 bg-white border-2 border-gray-300 rounded-lg text-xl font-bold w-12 h-12 flex items-center justify-center">-</button>
             <span className="text-2xl font-bold w-12 text-center">{count}</span>
             <button onClick={() => adjustCount(1)} className="p-3 bg-white border-2 border-gray-300 rounded-lg text-xl font-bold w-12 h-12 flex items-center justify-center">+</button>
             <span className="text-lg">人</span>
          </div>
        </div>

        {/* Type Toggle */}
        <div className="space-y-4">
          <label className="block text-lg-large font-bold text-gray-800">活動の種類</label>
          <div className="flex gap-2">
            <button
              onClick={() => setIsJidou(false)}
              className={`flex-1 p-4 rounded-xl text-lg font-bold border-2 transition-colors ${!isJidou ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-gray-500 border-gray-200'}`}
            >
              民生委員
            </button>
            <button
              onClick={() => setIsJidou(true)}
              className={`flex-1 p-4 rounded-xl text-lg font-bold border-2 transition-colors ${isJidou ? 'bg-pink-600 text-white border-pink-700' : 'bg-white text-gray-500 border-gray-200'}`}
            >
              児童委員
            </button>
          </div>
        </div>

        {/* Memo */}
        <div className="space-y-4">
          <label className="block text-lg-large font-bold text-gray-800 flex items-center">
            <FileText className="mr-2" /> メモ (任意)
          </label>
          <textarea 
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="w-full p-4 text-xl border-2 border-gray-300 rounded-xl bg-gray-50 min-h-[120px]"
            placeholder="内容を簡単に..."
          />
        </div>

      </div>

      {/* Floating Action Button for Save */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 safe-area-bottom">
        <BigButton onClick={handleSave} variant={isJidou ? 'jidou' : 'primary'} icon={<Save size={24} />}>
          記録する
        </BigButton>
      </div>
    </div>
  );
};
