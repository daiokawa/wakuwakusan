'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import programsData from '@/app/lib/data/programs_full.json';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  programName: string;
  isBooked: boolean;
  booking?: {
    id: string;
    clientName: string;
    status: string;
  };
}

interface TimeTableProps {
  date: string;
}

export default function TimeTable({ date }: TimeTableProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  
  useEffect(() => {
    // 日付から曜日を取得
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay(); // 0 = 日曜日, 1 = 月曜日, ...
    const dayMapping = ['日', '月', '火', '水', '木', '金', '土'];
    const dayName = dayMapping[dayOfWeek];
    
    // 番組データから該当曜日の番組を抽出
    const todaysPrograms = programsData.filter(program => 
      program.broadcastDays.includes(dayName)
    );
    
    // 時間でソート
    const sortedPrograms = [...todaysPrograms].sort((a, b) => {
      return a.startTime.localeCompare(b.startTime);
    });
    
    // TimeSlot形式に変換
    const slots = sortedPrograms.map((program, index) => {
      // 本番環境では全て空き状態にする
      const isBooked = false;
      
      const slot: TimeSlot = {
        id: program.programId,
        startTime: program.startTime,
        endTime: program.endTime,
        programName: program.programName,
        isBooked: isBooked
      };
      
      // 予約システム実装時に実際の予約データと連携する
      // 現在は全て空き状態
      
      return slot;
    });
    
    setTimeSlots(slots);
  }, [date]);

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

  // タイムスロットがない場合の表示
  if (timeSlots.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">この日の番組情報がありません。別の日を選択してください。</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
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
              予約状況
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
          {timeSlots.map((slot) => (
            <tr key={slot.id}>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {slot.startTime} - {slot.endTime}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {slot.programName}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                {slot.isBooked ? (
                  <div>
                    <span className="font-medium text-gray-900">
                      {slot.booking?.clientName}
                    </span>
                    <span
                      className={`ml-2 inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(
                        slot.booking?.status || ''
                      )}`}
                    >
                      {getStatusText(slot.booking?.status || '')}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-500">空き</span>
                )}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                {slot.isBooked ? (
                  <Link
                    href={`/bookings/${slot.booking?.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    詳細
                  </Link>
                ) : (
                  <Link
                    href={`/bookings/new?date=${date}&startTime=${slot.startTime}&programId=${slot.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    予約する
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}