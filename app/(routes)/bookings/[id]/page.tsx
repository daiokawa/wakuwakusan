import Link from 'next/link';
import BookingDetails from '@/app/components/bookings/BookingDetails';
import clientsData from '@/app/lib/data/clients.json';
import programsData from '@/app/lib/data/programs_full.json';

export default function BookingPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  // 実際の実装ではデータベースから予約データを取得する
  // IDから予約情報を生成する
  const generateBooking = (bookingId: string) => {
    // 「booking-123」のような形式のIDから番号を抽出
    const idNumber = parseInt(bookingId.replace('booking-', '')) || 1;
    
    // プログラムをランダムに選択
    const program = programsData[idNumber % programsData.length];
    
    // クライアントを順位ベースで選択
    const client = clientsData[idNumber % clientsData.length];
    
    // 予約日を生成(現在から数日先)
    const today = new Date();
    const broadcastDate = new Date(today);
    broadcastDate.setDate(today.getDate() + (idNumber % 30));
    
    // キャンペーン名の候補
    const campaignNames = [
      '夏の新商品プロモーション',
      '年末キャンペーン',
      '初夏セール',
      '会社創立記念',
      '新商品発売告知'
    ];
    
    // ステータスの候補
    const statuses = ['confirmed', 'tentative', 'broadcasted', 'cancelled'];
    
    const dateString = broadcastDate.toISOString().split('T')[0];
    const folderPath = `${dateString.replace(/-/g, '')}/${program.startTime.replace(':', '')}_client${idNumber}_program${idNumber}`;
    
    return {
      id: bookingId,
      broadcastDate: dateString,
      startTime: program.startTime,
      duration: 30,
      clientName: client.clientName,
      programName: program.programName,
      campaignName: campaignNames[idNumber % campaignNames.length],
      status: statuses[idNumber % statuses.length],
      memo: `ナビゲーター（${program.navigatorName || '未定'}）による紹介を希望。効果測定レポートが必要。`,
      folderPath,
      createdAt: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 5).toISOString(),
      updatedAt: new Date().toISOString(),
    };
  };
  
  const booking = generateBooking(id);
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-2">
        <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">
          ← ダッシュボードに戻る
        </Link>
      </div>
      
      <div className="mb-8 flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <h1 className="text-3xl font-bold text-gray-900">
          予約詳細: {booking.broadcastDate} {booking.startTime}
        </h1>
        <div className="flex space-x-3">
          <Link
            href={`/bookings/${id}/edit`}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            編集
          </Link>
          <Link
            href={`/files/${booking.folderPath}`}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            関連ファイル
          </Link>
        </div>
      </div>
      
      <BookingDetails booking={booking} />
    </div>
  );
}