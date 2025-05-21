import Link from 'next/link';
import ProgramTabs from '@/app/components/programs/ProgramTabs';
import programsData from '@/app/lib/data/programs_full.json';
import navigatorsData from '@/app/lib/data/navigators.json';

export default function ProgramPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  // 実データから番組情報を取得
  const program = programsData.find(p => p.programId === id) || {
    programId: id,
    programName: '不明な番組',
    programInfo: '番組情報が見つかりませんでした。',
    navigator: '',
    broadcastDays: [],
    startTime: '',
    endTime: '',
    lastUpdated: new Date().toISOString(),
  };
  
  // ナビゲーター情報を取得
  const navigatorName = program.navigator;
  const navigator = navigatorsData.find(n => n.name === navigatorName);
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-2">
        <Link href="/programs" className="text-blue-600 hover:text-blue-800">
          ← 番組一覧に戻る
        </Link>
      </div>
      
      <div className="mb-8 flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{program.programName}</h1>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <span className="mr-4">放送: {program.broadcastDays.join('・')}曜日 {program.startTime}～{program.endTime}</span>
            {program.navigator !== 'ノンストップミュージック' && (
              <span>ナビゲーター: {program.navigator}</span>
            )}
          </div>
        </div>
        <div className="flex space-x-3">
          <Link
            href={`/programs/${id}/edit`}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            編集
          </Link>
          <Link
            href={`/bookings/new?programId=${id}`}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            新規予約
          </Link>
        </div>
      </div>
      
      <ProgramTabs 
        programId={id} 
        programInfo={program.programInfo} 
        navigator={program.navigator}
        broadcastDays={program.broadcastDays}
        startTime={program.startTime}
        endTime={program.endTime}
      />
    </div>
  );
}