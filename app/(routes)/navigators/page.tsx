import Link from 'next/link';
import SearchBar from '@/app/components/common/SearchBar';
import navigatorsData from '@/app/lib/data/navigators.json';

export default async function NavigatorsPage() {
  // ナビゲーターデータを読み取り名前でソート
  const sortedNavigators = [...navigatorsData].sort((a, b) => {
    return a.nameReading.localeCompare(b.nameReading, 'ja');
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">ナビゲーター一覧</h1>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/navigators/new"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            新規ナビゲーター
          </Link>
        </div>
      </div>
      
      <div className="mt-8">
        <SearchBar placeholder="ナビゲーター名で検索..." />
      </div>
      
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedNavigators.map((navigator) => (
          <Link
            key={navigator.navigatorId}
            href={`/navigators/${navigator.navigatorId}`}
            className="block overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-md"
          >
            <div className="p-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex-shrink-0 flex items-center justify-center text-gray-400">
                  写真
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {navigator.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {navigator.nameReading}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {navigator.bio}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-500">
                  担当番組: {navigator.programs.length > 0 ? 
                    navigator.programs.join(', ') : 
                    '担当番組なし'}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}