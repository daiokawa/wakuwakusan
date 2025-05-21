import Link from 'next/link';
import { getClients } from '@/app/lib/db';
import SearchBar from '@/app/components/common/SearchBar';
import clientsData from '@/app/lib/data/clients.json';

export default async function ClientsPage() {
  // 取引先データをインポート
  // 実際のアプリでは、データベースからフェッチします
  
  // Sort by initialRanking as the primary key
  const sortedClients = [...clientsData].sort((a, b) => {
    return a.initialRanking - b.initialRanking;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">取引先一覧</h1>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/clients/new"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            新規取引先
          </Link>
        </div>
      </div>
      
      <div className="mt-8">
        <SearchBar placeholder="取引先名で検索..." />
      </div>
      
      <div className="mt-6 overflow-hidden rounded-lg bg-white shadow">
        <div className="p-4 bg-gray-100 border-b border-gray-200">
          <p className="text-sm text-gray-700 font-medium">売上期間: 2023/10/01～2025/05/31 | 部門: 全社 | 集計対象: 広告主</p>
        </div>
        <ul className="divide-y divide-gray-200">
          {sortedClients.map((client) => {
            // ランキング情報を表示
            
            return (
              <li key={client.clientId}>
                <Link
                  href={`/clients/${client.clientId}`}
                  className="block hover:bg-gray-50"
                >
                  <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-medium text-blue-600">
                        {client.clientName}
                      </p>
                      <p className="text-sm text-gray-500">
                        ランキング: {client.initialRanking}位
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}