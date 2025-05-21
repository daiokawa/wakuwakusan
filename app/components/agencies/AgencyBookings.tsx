'use client';

import Link from 'next/link';
import { formatDateJP } from '@/app/lib/utils';

interface AgencyBookingsProps {
  agencyId: string;
}

interface Booking {
  id: string;
  clientName: string;
  programName: string;
  broadcastDate: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

export default function AgencyBookings({ agencyId }: AgencyBookingsProps) {
  // 実際のアプリではAPIから予約履歴を取得
  // デモではモックデータを使用
  const bookings: Booking[] = [
    {
      id: '1',
      clientName: '株式会社 ＬＡＮＤＩＣ',
      programName: 'ワクワクモーニング',
      broadcastDate: '2025-05-25',
      startTime: '07:30',
      endTime: '07:45',
      status: 'confirmed',
    },
    {
      id: '2',
      clientName: '株式会社シダー',
      programName: 'アフタヌーンパラダイス',
      broadcastDate: '2025-05-20',
      startTime: '14:00',
      endTime: '14:30',
      status: 'completed',
    },
    {
      id: '3',
      clientName: '北九州市広報戦略課',
      programName: 'イブニングドライブ',
      broadcastDate: '2025-06-05',
      startTime: '17:15',
      endTime: '17:30',
      status: 'pending',
    },
    {
      id: '4',
      clientName: '医療法人なかお歯科',
      programName: 'ミッドナイトセッション',
      broadcastDate: '2025-05-15',
      startTime: '23:30',
      endTime: '23:45',
      status: 'cancelled',
    },
  ];

  // ステータスに応じたバッジの色分け
  const statusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            確定
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
            仮予約
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
            放送済
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
            キャンセル
          </span>
        );
      default:
        return null;
    }
  };

  // 予約を時系列で並べ替え（日付昇順）
  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(`${a.broadcastDate}T${a.startTime}`);
    const dateB = new Date(`${b.broadcastDate}T${b.startTime}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">予約履歴</h3>
        <Link
          href={`/bookings/new?agencyId=${agencyId}`}
          className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          新規予約
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                放送日時
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                取引先
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                番組
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ステータス
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">詳細</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDateJP(booking.broadcastDate)} {booking.startTime}-{booking.endTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.clientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.programName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {statusBadge(booking.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/bookings/${booking.id}`} className="text-blue-600 hover:text-blue-900">
                    詳細
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg bg-white border border-gray-200 p-6 mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">関連ファイル</h3>
        <div className="text-sm text-gray-500">
          <p>この代理店に関連する予約の放送日時フォルダ内のファイルがここに表示されます。</p>
        </div>
      </div>
    </div>
  );
}