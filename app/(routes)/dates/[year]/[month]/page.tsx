import Link from 'next/link';
import { getBookingsByDate } from '@/app/lib/db';
import Calendar from '@/app/components/dates/Calendar';
import programsData from '@/app/lib/data/programs_full.json';

export default async function MonthPage({ 
  params 
}: { 
  params: { year: string; month: string } 
}) {
  const { year, month } = params;
  
  // Validate the year and month
  const yearNum = parseInt(year, 10);
  const monthNum = parseInt(month, 10);
  
  if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
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
  
  const monthName = new Date(yearNum, monthNum - 1, 1).toLocaleString('ja-JP', { month: 'long' });
  
  // Get the number of days in the month
  const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
  
  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(yearNum, monthNum - 1, 1).getDay();
  
  // Create a calendar grid
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Add the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = `${year}-${month}-${day.toString().padStart(2, '0')}`;
    // 該当する日の曜日に放送がある番組があるかどうかをチェック
    // 日付から曜日を取得
    const dateObj = new Date(yearNum, monthNum - 1, day);
    const dayOfWeek = dateObj.getDay(); // 0 = 日曜日, 1 = 月曜日, ...
    const dayMapping = ['日', '月', '火', '水', '木', '金', '土'];
    const dayName = dayMapping[dayOfWeek];
    
    // その曜日に放送がある番組があるかどうか
    const hasPrograms = programsData.some(program => 
      program.broadcastDays.includes(dayName)
    );
    
    // 番組がある日付は予約可能とする
    const hasBookings = hasPrograms;
    calendarDays.push({ day, date, hasBookings });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        {year}年{monthName}
      </h1>
      <div className="mb-8">
        <Link href={`/dates/${year}`} className="text-blue-600 hover:text-blue-800">
          ← 月選択に戻る
        </Link>
      </div>
      
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-700">日付を選択</h2>
        
        <Calendar year={yearNum} month={monthNum} days={calendarDays} />
      </div>
    </div>
  );
}