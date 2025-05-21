'use client';

import { useState } from 'react';

interface ProgramInfoProps {
  programId: string;
  programInfo: string;
  broadcastDays: string[];
  startTime: string;
  endTime: string;
}

export default function ProgramInfo({ 
  programId, 
  programInfo, 
  broadcastDays,
  startTime,
  endTime
}: ProgramInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [info, setInfo] = useState(programInfo);
  
  const handleSave = () => {
    // In a real app, we would send the updated info to an API
    // For now, we'll just update the local state
    setIsEditing(false);
  };
  
  // 曜日表示の整形
  const formatBroadcastDays = () => {
    if (broadcastDays.length === 0) return '情報なし';
    
    // 連続した曜日をまとめる処理
    const dayOrder = ['月', '火', '水', '木', '金', '土', '日'];
    const sortedDays = [...broadcastDays].sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
    
    if (sortedDays.length === 7) return '毎日';
    if (sortedDays.join('') === '月火水木金') return '月曜日 - 金曜日';
    if (sortedDays.join('') === '土日') return '土曜日・日曜日';
    
    return sortedDays.map(day => `${day}曜日`).join('、');
  };
  
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">番組情報</h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            編集
          </button>
        )}
      </div>
      
      {isEditing ? (
        <div>
          <textarea
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            rows={10}
            className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          ></textarea>
          <div className="mt-4 flex justify-end space-x-3">
            <button
              onClick={() => {
                setInfo(programInfo);
                setIsEditing(false);
              }}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              キャンセル
            </button>
            <button
              onClick={handleSave}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              保存
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-md bg-gray-50 p-4">
          <pre className="whitespace-pre-wrap font-sans text-gray-700">{info}</pre>
        </div>
      )}
      
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-medium text-gray-900">放送スケジュール</h3>
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  曜日
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  時間
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {formatBroadcastDays()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {startTime} - {endTime}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-medium text-gray-900">スポンサー情報</h3>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-gray-700">この番組のスポンサー情報はありません。</p>
        </div>
      </div>
    </div>
  );
}