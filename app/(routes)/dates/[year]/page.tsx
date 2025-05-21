import Link from 'next/link';
import { FolderIcon } from '@/app/components/icons';

export default function YearPage({ params }: { params: { year: string } }) {
  const { year } = params;
  
  // Create an array of month names in Japanese
  const months = [
    { number: '01', name: '1月' },
    { number: '02', name: '2月' },
    { number: '03', name: '3月' },
    { number: '04', name: '4月' },
    { number: '05', name: '5月' },
    { number: '06', name: '6月' },
    { number: '07', name: '7月' },
    { number: '08', name: '8月' },
    { number: '09', name: '9月' },
    { number: '10', name: '10月' },
    { number: '11', name: '11月' },
    { number: '12', name: '12月' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">{year}年</h1>
      <div className="mb-8">
        <Link href="/dates" className="text-blue-600 hover:text-blue-800">
          ← 年選択に戻る
        </Link>
      </div>
      
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-700">月を選択</h2>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {months.map((month) => (
            <Link
              key={month.number}
              href={`/dates/${year}/${month.number}`}
              className="flex items-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mr-3 rounded-full bg-blue-100 p-2">
                <FolderIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{month.name}</h3>
                <p className="text-xs text-gray-500">タップして日付を選択</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}