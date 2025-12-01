import React, { useState } from 'react';
import { Category, ActivityType } from '../types';
import { ArrowLeft, Plus, X, ArrowUp, ArrowDown } from 'lucide-react';
import { BigButton } from './ui/BigButton';

interface SettingsProps {
  categories: Category[];
  onUpdateCategories: (categories: Category[]) => void;
  onBack: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ categories, onUpdateCategories, onBack }) => {
  const [newCatName, setNewCatName] = useState('');
  const [newCatType, setNewCatType] = useState<ActivityType>(ActivityType.MINSEI);

  const handleAdd = () => {
    if (!newCatName.trim()) return;

    const newCategory: Category = {
      id: `custom_${Date.now()}`,
      name: newCatName,
      type: newCatType,
      isCustom: true,
      displayOrder: categories.length + 1
    };

    onUpdateCategories([...categories, newCategory]);
    setNewCatName('');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('この項目を削除してもよろしいですか？\n※これまでの記録は削除されませんが、今後選択できなくなります。')) {
      onUpdateCategories(categories.filter(c => c.id !== id));
    }
  };

  const handleNameChange = (id: string, newName: string) => {
    const updated = categories.map(c => 
      c.id === id ? { ...c, name: newName } : c
    );
    onUpdateCategories(updated);
  };

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    const newCats = [...categories];
    if (direction === 'up' && index > 0) {
      [newCats[index], newCats[index - 1]] = [newCats[index - 1], newCats[index]];
    } else if (direction === 'down' && index < newCats.length - 1) {
      [newCats[index], newCats[index + 1]] = [newCats[index + 1], newCats[index]];
    }
    
    // Reassign displayOrder
    newCats.forEach((c, i) => c.displayOrder = i + 1);
    onUpdateCategories(newCats);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
       <div className="bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600 rounded-full active:bg-gray-100">
          <ArrowLeft size={32} />
        </button>
        <h2 className="text-xl font-bold">項目編集</h2>
        <div className="w-10"></div>
      </div>

      <div className="p-4 space-y-6 flex-1 overflow-y-auto pb-20">
        
        {/* Add New */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-4">
          <h3 className="font-bold text-lg">新しい項目を追加</h3>
          <div className="flex gap-2">
             <input 
               type="text" 
               value={newCatName}
               onChange={(e) => setNewCatName(e.target.value)}
               placeholder="活動名 (例: パトロール)"
               className="flex-1 border-2 border-gray-300 rounded-lg p-3 text-lg"
             />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setNewCatType(ActivityType.MINSEI)}
              className={`flex-1 py-2 rounded-lg font-bold border ${newCatType === ActivityType.MINSEI ? 'bg-blue-100 border-blue-500 text-blue-800' : 'bg-white border-gray-300'}`}
            >
              民生
            </button>
            <button 
              onClick={() => setNewCatType(ActivityType.JIDOU)}
              className={`flex-1 py-2 rounded-lg font-bold border ${newCatType === ActivityType.JIDOU ? 'bg-pink-100 border-pink-500 text-pink-800' : 'bg-white border-gray-300'}`}
            >
              児童
            </button>
          </div>
          <BigButton onClick={handleAdd} className="h-12 min-h-[50px] text-base" variant="neutral">
            追加する
          </BigButton>
        </div>

        {/* List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between ml-1">
             <h3 className="font-bold text-lg">現在のパネル一覧</h3>
             <span className="text-sm text-gray-500">名前をタップして編集</span>
          </div>
          
          {categories.map((cat, index) => (
            <div key={cat.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex items-center gap-3">
              <div className="flex flex-col gap-1">
                <button onClick={() => moveOrder(index, 'up')} disabled={index === 0} className="text-gray-400 disabled:opacity-20 p-1 active:bg-gray-100 rounded"><ArrowUp /></button>
                <button onClick={() => moveOrder(index, 'down')} disabled={index === categories.length - 1} className="text-gray-400 disabled:opacity-20 p-1 active:bg-gray-100 rounded"><ArrowDown /></button>
              </div>
              
              <div className="flex-1">
                <input
                    type="text"
                    value={cat.name}
                    onChange={(e) => handleNameChange(cat.id, e.target.value)}
                    className={`w-full text-lg font-bold border-b border-gray-300 focus:border-blue-500 focus:bg-blue-50 outline-none rounded-t px-1 py-1 transition-colors ${cat.type === ActivityType.JIDOU ? 'text-pink-900' : 'text-blue-900'}`}
                />
                <div className="mt-1">
                   <span className={`text-xs px-2 py-0.5 rounded border ${cat.type === ActivityType.JIDOU ? 'bg-pink-50 text-pink-600 border-pink-200' : 'bg-blue-50 text-blue-600 border-blue-200'}`}>
                      {cat.type === ActivityType.JIDOU ? '児童' : '民生'}
                   </span>
                </div>
              </div>

              <button onClick={() => handleDelete(cat.id)} className="p-3 text-red-500 bg-red-50 rounded-lg active:bg-red-100">
                <X />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};