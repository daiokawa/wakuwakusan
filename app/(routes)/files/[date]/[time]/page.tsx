import Link from 'next/link';
import FileDetails from '@/app/components/files/FileDetails';

export default function FolderPage({ 
  params 
}: { 
  params: { date: string; time: string } 
}) {
  const { date, year, month, day } = parseDateFromPath(params.date);
  const { time } = params;
  
  // Format date for display
  const formattedDate = `${year}年${month}月${day}日`;
  const formattedTime = `${time.slice(0, 2)}:${time.slice(2, 4)}`;
  
  // In a real app, we would fetch the folder data from the database
  // For now, we'll use mock data
  const folderData = {
    date: params.date,
    time: params.time,
    clientName: 'サンプル株式会社',
    programName: 'ワクワクモーニング',
    bookingId: '12345',
    status: 'confirmed',
  };
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-2">
        <Link href="/files" className="text-blue-600 hover:text-blue-800">
          ← ファイル管理に戻る
        </Link>
      </div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {formattedDate} {formattedTime}
        </h1>
        <div className="mt-2 flex items-center">
          <span className="text-gray-700">番組:</span>
          <Link
            href={`/programs/1`} // In a real app, use the actual program ID
            className="ml-2 text-blue-600 hover:text-blue-800"
          >
            {folderData.programName}
          </Link>
          <span className="ml-4 text-gray-700">取引先:</span>
          <Link
            href={`/clients/1`} // In a real app, use the actual client ID
            className="ml-2 text-blue-600 hover:text-blue-800"
          >
            {folderData.clientName}
          </Link>
        </div>
        <div className="mt-2">
          <Link
            href={`/bookings/${folderData.bookingId}`}
            className="text-blue-600 hover:text-blue-800"
          >
            予約詳細を表示
          </Link>
        </div>
      </div>
      
      <FileDetails folderPath={`${params.date}/${params.time}`} />
    </div>
  );
}

// Helper function to parse date from path
function parseDateFromPath(dateStr: string) {
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);
  
  return {
    date: dateStr,
    year,
    month,
    day,
  };
}