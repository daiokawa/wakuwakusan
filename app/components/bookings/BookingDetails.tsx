'use client';

import Link from 'next/link';
import { formatDateJP } from '@/app/lib/utils';

interface BookingDetailsProps {
  booking: {
    id: string;
    broadcastDate: string;
    startTime: string;
    duration: number;
    clientName: string;
    programName: string;
    campaignName?: string;
    status: string;
    memo?: string;
    folderPath?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default function BookingDetails({ booking }: BookingDetailsProps) {
  // Format dates for display
  const formattedDate = formatDateJP(booking.broadcastDate);
  const createdDate = new Date(booking.createdAt).toLocaleDateString('ja-JP');
  const updatedDate = new Date(booking.updatedAt).toLocaleDateString('ja-JP');
  
  // Calculate end time
  const calculateEndTime = (start: string, durationMinutes: number) => {
    const [hours, minutes] = start.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    date.setMinutes(date.getMinutes() + durationMinutes);
    return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false });
  };
  
  const endTime = calculateEndTime(booking.startTime, booking.duration);
  
  // Get status display
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { text: '確定', className: 'bg-green-100 text-green-800' };
      case 'tentative':
        return { text: '仮予約', className: 'bg-yellow-100 text-yellow-800' };
      case 'broadcasted':
        return { text: '放送済み', className: 'bg-blue-100 text-blue-800' };
      case 'cancelled':
        return { text: 'キャンセル', className: 'bg-red-100 text-red-800' };
      default:
        return { text: '不明', className: 'bg-gray-100 text-gray-800' };
    }
  };
  
  const status = getStatusDisplay(booking.status);

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium leading-6 text-gray-900">予約情報</h3>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
          >
            {status.text}
          </span>
        </div>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          放送枠の詳細情報と関連データ
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">放送日</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {formattedDate}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">放送時間</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {booking.startTime} - {endTime} ({booking.duration}分)
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">取引先</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <Link
                href={`/clients/1`} // In a real app, use the actual client ID
                className="text-blue-600 hover:text-blue-800"
              >
                {booking.clientName}
              </Link>
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">番組</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <Link
                href={`/programs/1`} // In a real app, use the actual program ID
                className="text-blue-600 hover:text-blue-800"
              >
                {booking.programName}
              </Link>
            </dd>
          </div>
          {booking.campaignName && (
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">キャンペーン名</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {booking.campaignName}
              </dd>
            </div>
          )}
          {booking.memo && (
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">メモ</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <div className="whitespace-pre-line">{booking.memo}</div>
              </dd>
            </div>
          )}
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">作成日時</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {createdDate}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">最終更新</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {updatedDate}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">関連ファイル</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {booking.folderPath ? (
                <Link
                  href={`/files/${booking.folderPath}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  放送日時フォルダを表示
                </Link>
              ) : (
                <span className="text-gray-500">関連ファイルはありません</span>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}