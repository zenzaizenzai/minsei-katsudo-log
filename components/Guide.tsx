import React from 'react';
import { ArrowLeft, MousePointerClick, Edit3, Download, Settings, FileText, Baby } from 'lucide-react';
import { BigButton } from './ui/BigButton';

interface GuideProps {
  onBack: () => void;
}

export const Guide: React.FC<GuideProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600 rounded-full active:bg-gray-100">
          <ArrowLeft size={32} />
        </button>
        <h2 className="text-xl font-bold">使い方ガイド</h2>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-8 pb-24">
        
        {/* Step 1: Record */}
        <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
             <div className="bg-blue-100 p-3 rounded-full text-blue-600">
               <MousePointerClick size={28} />
             </div>
             <h3 className="text-xl-large font-bold text-gray-800">1. 活動を選ぶ</h3>
          </div>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            トップ画面の大きなボタンから、行った活動を選んでタップします。
          </p>
          
          {/* Visual Mockup */}
          <div className="bg-gray-100 p-4 rounded-xl border-2 border-dashed border-gray-300">
             <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl h-20 flex flex-col items-center justify-center text-blue-900 font-bold shadow-sm">
                  <FileText className="w-6 h-6 mb-1 text-blue-500" />
                  相談・助言
                </div>
                <div className="bg-pink-50 border-2 border-pink-200 rounded-xl h-20 flex flex-col items-center justify-center text-pink-900 font-bold shadow-sm">
                  <Baby className="w-6 h-6 mb-1 text-pink-500" />
                  児童見守り
                </div>
             </div>
             <div className="mt-2 text-center text-base font-bold text-gray-500">↑ 押すと入力へ</div>
          </div>
        </section>

        {/* Step 2: Input */}
        <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
             <div className="bg-green-100 p-3 rounded-full text-green-600">
               <Edit3 size={28} />
             </div>
             <h3 className="text-xl-large font-bold text-gray-800">2. 内容を入れる</h3>
          </div>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            日付や時間を確認します。<br/>
            簡単なメモを書くこともできます。<br/>
            最後に下の<span className="font-bold text-blue-600">「記録する」</span>を押します。
          </p>
           {/* Visual Mockup */}
           <div className="bg-gray-100 p-4 rounded-xl border-2 border-dashed border-gray-300 space-y-3">
             <div className="bg-white border-2 border-gray-300 h-12 rounded-lg w-2/3 mx-auto flex items-center px-3 text-gray-400">2024/05/12</div>
             <div className="bg-blue-600 h-12 rounded-lg w-full flex items-center justify-center text-white font-bold shadow-md">
               記録する
             </div>
          </div>
        </section>

        {/* Step 3: Check & Export */}
        <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
             <div className="bg-orange-100 p-3 rounded-full text-orange-600">
               <Download size={28} />
             </div>
             <h3 className="text-xl-large font-bold text-gray-800">3. 月末の報告</h3>
          </div>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            トップ画面の<span className="font-bold text-green-700">「活動記録一覧を見る」</span>から、今月の記録を確認できます。<br/>
            <br/>
            一覧画面の下にあるボタンを押すと、報告書用のデータ(CSV)を作成できます。
          </p>
        </section>

         {/* Step 4: Customize */}
         <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
             <div className="bg-gray-100 p-3 rounded-full text-gray-600">
               <Settings size={28} />
             </div>
             <h3 className="text-xl-large font-bold text-gray-800">4. 項目の変更</h3>
          </div>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            「項目編集」ボタンから、よく使う活動を追加したり、名前を変えたりできます。<br/>
            名前をタップすると書き換えられます。
          </p>
        </section>

      </div>
      
       <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 safe-area-bottom">
        <BigButton onClick={onBack} variant="neutral">
          閉じる
        </BigButton>
      </div>
    </div>
  );
};