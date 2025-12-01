import React from 'react';
import { Category, ActivityType } from '../types';
import { Plus, List, Settings, FileText, Baby } from 'lucide-react';
import { BigButton } from './ui/BigButton';

interface DashboardProps {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
  onNavigateToList: () => void;
  onNavigateToSettings: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  categories, 
  onSelectCategory, 
  onNavigateToList, 
  onNavigateToSettings 
}) => {
  // Sort by display order
  const sortedCategories = [...categories].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-xl-large font-bold text-gray-800 mb-4 text-center">
          何をしましたか？
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          {sortedCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat)}
              className={`
                min-h-[100px] rounded-xl shadow-sm p-3 flex flex-col items-center justify-center border-2 text-center transition-transform active:scale-95
                ${cat.type === ActivityType.JIDOU 
                  ? 'bg-pink-50 border-pink-200 text-pink-900' 
                  : 'bg-blue-50 border-blue-200 text-blue-900'}
              `}
            >
              {cat.type === ActivityType.JIDOU && <Baby className="w-8 h-8 mb-2 text-pink-500" />}
              {cat.type === ActivityType.MINSEI && <FileText className="w-8 h-8 mb-2 text-blue-500" />}
              <span className="text-xl font-bold leading-tight">{cat.name}</span>
            </button>
          ))}
          
          <button
            onClick={onNavigateToSettings}
            className="min-h-[100px] rounded-xl shadow-sm p-3 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 bg-gray-50 active:bg-gray-100"
          >
            <Plus className="w-8 h-8 mb-2" />
            <span className="text-lg font-bold">項目編集</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex-1">
        <h2 className="text-xl-large font-bold text-gray-800 mb-4 text-center">
          記録を確認
        </h2>
        <BigButton 
          variant="secondary" 
          onClick={onNavigateToList}
          icon={<List size={28} />}
        >
          活動記録一覧を見る
        </BigButton>
      </div>
    </div>
  );
};
