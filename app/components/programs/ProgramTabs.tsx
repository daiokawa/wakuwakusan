'use client';

import { useState } from 'react';
import ProgramSchedule from './ProgramSchedule';
import ProgramInfo from './ProgramInfo';
import ProgramNavigator from './ProgramNavigator';

interface ProgramTabsProps {
  programId: string;
  programInfo: string;
  navigator: string;
  broadcastDays: string[];
  startTime: string;
  endTime: string;
}

export default function ProgramTabs({ 
  programId, 
  programInfo, 
  navigator, 
  broadcastDays, 
  startTime, 
  endTime 
}: ProgramTabsProps) {
  const [activeTab, setActiveTab] = useState('schedule');
  
  return (
    <div className="rounded-lg bg-white shadow">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`w-1/3 border-b-2 py-4 px-1 text-center text-sm font-medium ${
              activeTab === 'schedule'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            番組予約状況
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`w-1/3 border-b-2 py-4 px-1 text-center text-sm font-medium ${
              activeTab === 'info'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            番組情報/メモ
          </button>
          <button
            onClick={() => setActiveTab('navigator')}
            className={`w-1/3 border-b-2 py-4 px-1 text-center text-sm font-medium ${
              activeTab === 'navigator'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            ナビゲーター
          </button>
        </nav>
      </div>
      
      <div className="p-6">
        {activeTab === 'schedule' && (
          <ProgramSchedule 
            programId={programId} 
            broadcastDays={broadcastDays}
            startTime={startTime}
            endTime={endTime}
          />
        )}
        {activeTab === 'info' && (
          <ProgramInfo 
            programId={programId} 
            programInfo={programInfo} 
            broadcastDays={broadcastDays}
            startTime={startTime}
            endTime={endTime}
          />
        )}
        {activeTab === 'navigator' && (
          <ProgramNavigator 
            navigatorName={navigator} 
          />
        )}
      </div>
    </div>
  );
}