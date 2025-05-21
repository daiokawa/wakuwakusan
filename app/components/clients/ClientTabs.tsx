'use client';

import { useState } from 'react';
import ClientSummary from './ClientSummary';
import ClientBookings from './ClientBookings';
import ClientFiles from './ClientFiles';

interface ClientTabsProps {
  clientId: string;
}

export default function ClientTabs({ clientId }: ClientTabsProps) {
  const [activeTab, setActiveTab] = useState('summary');
  
  return (
    <div className="rounded-lg bg-white shadow">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('summary')}
            className={`w-1/3 border-b-2 py-4 px-1 text-center text-sm font-medium ${
              activeTab === 'summary'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            概要
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`w-1/3 border-b-2 py-4 px-1 text-center text-sm font-medium ${
              activeTab === 'bookings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            予約履歴
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`w-1/3 border-b-2 py-4 px-1 text-center text-sm font-medium ${
              activeTab === 'files'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            関連ファイル
          </button>
        </nav>
      </div>
      
      <div className="p-6">
        {activeTab === 'summary' && <ClientSummary clientId={clientId} />}
        {activeTab === 'bookings' && <ClientBookings clientId={clientId} />}
        {activeTab === 'files' && <ClientFiles clientId={clientId} />}
      </div>
    </div>
  );
}