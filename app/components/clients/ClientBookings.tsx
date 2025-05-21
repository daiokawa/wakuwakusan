'use client';

import Link from 'next/link';
import { formatDateJP } from '@/app/lib/utils';

interface ClientBookingsProps {
  clientId: string;
}

interface Booking {
  id: string;
  broadcastDate: string;
  startTime: string;
  programName: string;
  status: 'confirmed' | 'tentative' | 'broadcasted' | 'cancelled';
  folderPath?: string;
}

export default function ClientBookings({ clientId }: ClientBookingsProps) {
  // 実際の実装ではAPIからデータを取得する
  // プログラム情報から動的に予約データを生成
  const generateBookings = (): Booking[] => {
    const today = new Date();
    const programNames = ['MORNING EDITION', 'GROOVIN\'', 'SAUDES', 'HOLIDAY EDITION', 'CULTURE CLUB'];
    
    // 過去5件の予約を生成
    return Array.from({ length: 5 }).map((_, index) => {
      const date = new Date();
      date.setDate(today.getDate() - (index * 7)); // 1週間ごとに過去の日付
      
      // ランダムプログラムと時間
      const programName = programNames[Math.floor(Math.random() * programNames.length)];
      const hour = 7 + Math.floor(Math.random() * 8); // 7時〜14時
      const minute = Math.random() > 0.5 ? '00' : '30';
      const timeString = `${hour.toString().padStart(2, '0')}:${minute}`;
      
      // 日付フォーマット (YYYYMMDD)
      const dateString = date.toISOString().split('T')[0];
      const datePath = dateString.replace(/-/g, '');
      
      // ステータス (過去の日付なら放送済み、未来なら確定)
      const status = date < today ? 'broadcasted' : 'confirmed';
      
      return {
        id: `booking-${index + 1}`,
        broadcastDate: dateString,
        startTime: timeString,
        programName,
        status: status as 'confirmed' | 'tentative' | 'broadcasted' | 'cancelled',
        folderPath: `${datePath}/${timeString.replace(':', '')}_client${clientId}_program${index + 1}`,
      };
    });
  };
  
  const bookings: Booking[] = generateBookings();
  
  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'tentative':
        return 'bg-yellow-100 text-yellow-800';
      case 'broadcasted':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get status text in Japanese
  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '確定';
      case 'tentative':
        return '仮予約';
      case 'broadcasted':
        return '放送済み';
      case 'cancelled':
        return 'キャンセル';
      default:
        return '不明';
    }
  };

  return (
    <div>
      <h3 className="mb-6 text-lg font-medium text-gray-900">予約履歴</h3>
      
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                放送日
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                時間
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                番組名
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                ステータス
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {formatDateJP(booking.broadcastDate)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {booking.startTime}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {booking.programName}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {getStatusText(booking.status)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <Link
                    href={`/bookings/${booking.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    詳細
                  </Link>
                  {booking.folderPath && (
                    <Link
                      href={`/files/${booking.folderPath}`}
                      className="ml-4 text-blue-600 hover:text-blue-900"
                    >
                      ファイル
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}