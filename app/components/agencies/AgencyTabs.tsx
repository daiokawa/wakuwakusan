'use client';

import { useState } from 'react';
import AgencySummary from './AgencySummary';
import AgencyBookings from './AgencyBookings';
import AgencyFiles from './AgencyFiles';

interface AgencyTabsProps {
  agencyId: string;
}

export default function AgencyTabs({ agencyId }: AgencyTabsProps) {
  const [activeTab, setActiveTab] = useState('summary');
  
  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('summary')}
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
              activeTab === 'summary'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            概要
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
              activeTab === 'bookings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            予約履歴/関連ファイル
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
              activeTab === 'files'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            代理店ファイル
          </button>
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'summary' && <AgencySummary agencyId={agencyId} />}
        {activeTab === 'bookings' && <AgencyBookings agencyId={agencyId} />}
        {activeTab === 'files' && <AgencyFiles agencyId={agencyId} />}
      </div>
    </div>
  );
}