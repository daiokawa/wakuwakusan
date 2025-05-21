import Link from 'next/link';
import { FileIcon } from '@/app/components/icons';
import clientsData from '@/app/lib/data/clients.json';
import programsData from '@/app/lib/data/programs_full.json';

export default function FilesPage() {
  // 実際の実装ではデータベースからフォルダを取得する
  // 代わりに実際のプログラムとクライアントデータを使用して動的に生成
  const generateRecentFolders = () => {
    const today = new Date();
    const result = [];
    
    // 過去5日分のフォルダを生成
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(today.getDate() - (i * 3 + 1)); // 3日ごとに過去の日付
      
      // 日付から曜日を取得
      const dayOfWeek = date.getDay(); // 0 = 日曜日, 1 = 月曜日, ...
      const dayMapping = ['日', '月', '火', '水', '木', '金', '土'];
      const dayName = dayMapping[dayOfWeek];
      
      // その曜日の番組をランダムに選択
      const dayPrograms = programsData.filter(program => 
        program.broadcastDays.includes(dayName)
      );
      
      if (dayPrograms.length > 0) {
        const program = dayPrograms[Math.floor(Math.random() * dayPrograms.length)];
        
        // クライアントをランダムに選択
        const client = clientsData[Math.floor(Math.random() * clientsData.length)];
        
        // 日付フォーマット (YYYYMMDD)
        const dateString = date.toISOString().split('T')[0].replace(/-/g, '');
        // 時間フォーマット (HHMM)
        const timeString = program.startTime.replace(':', '');
        
        result.push({
          date: dateString,
          time: timeString,
          clientName: client.clientName,
          programName: program.programName
        });
      }
    }
    
    return result;
  };
  
  const recentFolders = generateRecentFolders();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">ファイル管理</h1>
      
      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold text-gray-700">最近の放送日時フォルダ</h2>
        
        <div className="divide-y divide-gray-200">
          {recentFolders.map((folder, index) => {
            // Format date for display
            const year = folder.date.slice(0, 4);
            const month = folder.date.slice(4, 6);
            const day = folder.date.slice(6, 8);
            const hour = folder.time.slice(0, 2);
            const minute = folder.time.slice(2, 4);
            
            const formattedDate = `${year}年${month}月${day}日`;
            const formattedTime = `${hour}:${minute}`;
            
            return (
              <Link
                key={index}
                href={`/files/${folder.date}/${folder.time}`}
                className="block py-4 hover:bg-gray-50"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FileIcon className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {formattedDate} {formattedTime} - {folder.programName}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      取引先: {folder.clientName}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold text-gray-700">年月から探す</h2>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }, (_, i) => {
            const month = i + 1;
            const year = 2023;
            return (
              <Link
                key={i}
                href={`/files/${year}${month.toString().padStart(2, '0')}`}
                className="flex items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
              >
                <div className="flex-shrink-0">
                  <FileIcon className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {year}年{month}月
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}