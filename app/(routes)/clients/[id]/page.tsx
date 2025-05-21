import Link from 'next/link';
import ClientTabs from '@/app/components/clients/ClientTabs';
import clientsData from '@/app/lib/data/clients.json';

export default function ClientPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  // 実データからクライアント情報を取得
  const client = clientsData.find(c => c.clientId === id) || {
    clientId: id,
    clientName: '不明な取引先',
    initialRanking: 0,
    lastUpdated: new Date().toISOString(),
    memo: '取引先情報が見つかりませんでした。',
  };
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-2">
        <Link href="/clients" className="text-blue-600 hover:text-blue-800">
          ← 取引先一覧に戻る
        </Link>
      </div>
      
      <div className="mb-8 flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{client.clientName}</h1>
          <p className="text-sm text-gray-500 mt-1">ランキング: {client.initialRanking}位</p>
        </div>
        <div className="flex space-x-3">
          <Link
            href={`/clients/${id}/edit`}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            編集
          </Link>
          <Link
            href={`/bookings/new?clientId=${id}`}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            新規予約
          </Link>
        </div>
      </div>
      
      <ClientTabs clientId={id} />
    </div>
  );
}