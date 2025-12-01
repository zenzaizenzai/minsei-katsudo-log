import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ViewState, Category, ActivityRecord } from './types';
import { Dashboard } from './components/Dashboard';
import { ActivityForm } from './components/ActivityForm';
import { ActivityList } from './components/ActivityList';
import { Settings } from './components/Settings';
import { loadCategories, saveCategories, loadRecords, saveRecords } from './services/storageService';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [categories, setCategories] = useState<Category[]>([]);
  const [records, setRecords] = useState<ActivityRecord[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Load data on mount
  useEffect(() => {
    setCategories(loadCategories());
    setRecords(loadRecords());
  }, []);

  // Handlers
  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setView('FORM');
  };

  const handleSaveRecord = (record: ActivityRecord) => {
    const newRecords = [record, ...records];
    setRecords(newRecords);
    saveRecords(newRecords);
    setView('HOME');
    alert('保存しました！');
  };

  const handleDeleteRecord = (id: string) => {
    const newRecords = records.filter(r => r.id !== id);
    setRecords(newRecords);
    saveRecords(newRecords);
  };

  const handleUpdateCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
    saveCategories(newCategories);
  };

  // Render logic
  const renderView = () => {
    switch (view) {
      case 'HOME':
        return (
          <Dashboard 
            categories={categories}
            onSelectCategory={handleSelectCategory}
            onNavigateToList={() => setView('LIST')}
            onNavigateToSettings={() => setView('SETTINGS')}
          />
        );
      case 'FORM':
        return selectedCategory ? (
          <ActivityForm 
            category={selectedCategory}
            onSave={handleSaveRecord}
            onCancel={() => setView('HOME')}
          />
        ) : null;
      case 'LIST':
        return (
          <ActivityList 
            records={records}
            onBack={() => setView('HOME')}
            onDelete={handleDeleteRecord}
          />
        );
      case 'SETTINGS':
        return (
          <Settings 
            categories={categories}
            onUpdateCategories={handleUpdateCategories}
            onBack={() => setView('HOME')}
          />
        );
      default:
        return <div>Error</div>;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-surface flex flex-col shadow-2xl relative">
      {/* App Header (Simple) */}
      {view === 'HOME' && (
        <header className="bg-white p-4 text-center border-b border-gray-200">
          <h1 className="text-xl-large font-bold text-primary">民生委員 活動記録</h1>
        </header>
      )}
      
      <main className="flex-1 overflow-hidden h-full">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
