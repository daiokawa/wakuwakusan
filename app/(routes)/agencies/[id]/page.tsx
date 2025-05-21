import Link from 'next/link';
import AgencyTabs from '@/app/components/agencies/AgencyTabs';
import agenciesData from '@/app/lib/data/agencies.json';

export default function AgencyPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  // 実データから代理店情報を取得
  const agency = agenciesData.find(a => a.agencyId === id) || {
    agencyId: id,
    agencyName: '不明な代理店',
    initialRanking: 0,
    lastUpdated: new Date().toISOString(),
    memo: '代理店情報が見つかりませんでした。',
  };
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-2">
        <Link href="/agencies" className="text-blue-600 hover:text-blue-800">
          ← 代理店一覧に戻る
        </Link>
      </div>
      
      <div className="mb-8 flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{agency.agencyName}</h1>
          <p className="text-sm text-gray-500 mt-1">ランキング: {agency.initialRanking}位</p>
        </div>
        <div className="flex space-x-3">
          <Link
            href={`/agencies/${id}/edit`}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            編集
          </Link>
          <Link
            href={`/bookings/new?agencyId=${id}`}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            新規予約
          </Link>
        </div>
      </div>
      
      <AgencyTabs agencyId={id} />
    </div>
  );
}