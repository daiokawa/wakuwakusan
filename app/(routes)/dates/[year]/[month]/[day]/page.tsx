import Link from 'next/link';
import TimeTable from '@/app/components/dates/TimeTable';

export default function DayPage({ 
  params 
}: { 
  params: { year: string; month: string; day: string } 
}) {
  const { year, month, day } = params;
  
  // Validate the date
  const yearNum = parseInt(year, 10);
  const monthNum = parseInt(month, 10) - 1; // 0-based month
  const dayNum = parseInt(day, 10);
  
  // ISO形式の日付文字列を作成（YYYY-MM-DD）
  const dateStr = `${year.padStart(4, '0')}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  const date = new Date(yearNum, monthNum, dayNum);
  
  // Format the date in Japanese
  const dateString = date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-red-600">無効な日付です</h1>
        <div className="mt-4">
          <Link href="/dates" className="text-blue-600 hover:text-blue-800">
            日付選択に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">{dateString}</h1>
      <div className="mb-8">
        <Link
          href={`/dates/${year}/${month}`}
          className="text-blue-600 hover:text-blue-800"
        >
          ← カレンダーに戻る
        </Link>
      </div>
      
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-700">タイムテーブル</h2>
          <div>
            <Link
              href={`/bookings/new?date=${dateStr}`}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              新規予約
            </Link>
          </div>
        </div>
        
        <TimeTable date={dateStr} />
      </div>
    </div>
  );
}