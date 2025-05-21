'use client';

import Link from 'next/link';
import { useState } from 'react';
import { formatDateJP } from '@/app/lib/utils';

interface ProgramScheduleProps {
  programId: string;
  broadcastDays: string[];
  startTime: string;
  endTime: string;
}

interface Booking {
  id: string;
  broadcastDate: string;
  startTime: string;
  clientName: string;
  status: 'confirmed' | 'tentative' | 'broadcasted' | 'cancelled';
}

export default function ProgramSchedule({ 
  programId, 
  broadcastDays, 
  startTime, 
  endTime 
}: ProgramScheduleProps) {
  const [selectedTab, setSelectedTab] = useState('future');
  
  // 現在の日付を取得
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();
  const dayOfWeek = today.getDay(); // 0 = 日曜日, 1 = 月曜日, ...

  // 曜日をJapaneseの形式で表示するためのマッピング
  const dayMapping = ['日', '月', '火', '水', '木', '金', '土'];
  
  // 番組の放送曜日を数値の配列に変換
  const broadcastDayNumbers = broadcastDays.map(day => {
    return dayMapping.indexOf(day);
  });

  // 未来の放送日を計算（今日から1ヶ月分）
  const futureDates: Date[] = [];
  let checkDate = new Date(today);
  
  while (futureDates.length < 8) { // 未来の放送日を最大8回分取得
    if (broadcastDayNumbers.includes(checkDate.getDay())) {
      // その曜日が放送曜日なら追加
      futureDates.push(new Date(checkDate));
    }
    checkDate.setDate(checkDate.getDate() + 1);
  }

  // 過去の放送日を計算（今日より前の1ヶ月分）
  const pastDates: Date[] = [];
  checkDate = new Date(today);
  checkDate.setDate(checkDate.getDate() - 1); // 昨日から
  
  while (pastDates.length < 8) { // 過去の放送日を最大8回分取得
    if (broadcastDayNumbers.includes(checkDate.getDay())) {
      // その曜日が放送曜日なら追加
      pastDates.push(new Date(checkDate));
    }
    checkDate.setDate(checkDate.getDate() - 1);
  }

  // 日付をYYYY-MM-DD形式に変換する関数
  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // モック予約データの生成
  const generateMockBookings = (dates: Date[], isPast: boolean): Booking[] => {
    const clientList = ['サンプル株式会社', '山田商店', '鈴木電機', '田中物産', '佐藤金属'];
    
    return dates.map((date, index) => {
      const isBooked = isPast || (index < 3); // 過去のデータはすべて予約済み、未来は最初の3つだけ
      
      return {
        id: `${isPast ? 'past' : 'future'}-${index + 1}`,
        broadcastDate: formatDateToString(date),
        startTime: startTime,
        clientName: isBooked ? clientList[index % clientList.length] : '未予約',
        status: isPast ? 'broadcasted' : (isBooked ? 'confirmed' : 'tentative'),
      };
    });
  };

  const futureBookings = generateMockBookings(futureDates, false);
  const pastBookings = generateMockBookings(pastDates, true);
  
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
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">番組予約状況</h3>
        <div className="flex rounded-md shadow-sm">
          <button
            onClick={() => setSelectedTab('future')}
            className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-medium ${
              selectedTab === 'future'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            今後の予約
          </button>
          <button
            onClick={() => setSelectedTab('past')}
            className={`relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium ${
              selectedTab === 'past'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            過去の放送
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          放送日: {broadcastDays.map(day => `${day}曜日`).join('、')} {startTime}〜{endTime}
        </p>
      </div>
      
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
                取引先
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
            {(selectedTab === 'future' ? futureBookings : pastBookings).map((booking) => (
              <tr key={booking.id}>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {formatDateJP(booking.broadcastDate)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {booking.startTime}〜{endTime}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {booking.clientName === '未予約' ? (
                    <span className="text-gray-500">未予約</span>
                  ) : (
                    booking.clientName
                  )}
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
                  {booking.clientName === '未予約' ? (
                    <Link
                      href={`/bookings/new?date=${booking.broadcastDate}&startTime=${booking.startTime}&programId=${programId}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      予約する
                    </Link>
                  ) : (
                    <Link
                      href={`/bookings/${booking.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      詳細
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