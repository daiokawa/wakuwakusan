'use client';

import Link from 'next/link';
import { CalendarIcon } from '@/app/components/icons';

interface CalendarDay {
  day: number;
  date: string;
  hasBookings: boolean;
}

interface CalendarProps {
  year: number;
  month: number;
  days: (CalendarDay | null)[];
}

export default function Calendar({ year, month, days }: CalendarProps) {
  // Days of the week in Japanese
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 bg-gray-50">
        {weekdays.map((day, index) => (
          <div
            key={day}
            className={`py-2 text-center text-sm font-medium ${
              index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-700'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 border-t border-gray-200">
        {days.map((dayData, index) => (
          <div
            key={index}
            className={`min-h-24 border-b border-r border-gray-200 p-2 ${
              index % 7 === 0
                ? 'border-l'
                : ''
            }`}
          >
            {dayData ? (
              <Link href={`/dates/${year}/${month.toString().padStart(2, '0')}/${dayData.day.toString().padStart(2, '0')}`}>
                <div className="flex h-full flex-col">
                  <div className={`mb-1 text-sm font-semibold ${
                    index % 7 === 0 ? 'text-red-500' : 
                    index % 7 === 6 ? 'text-blue-500' : 
                    'text-gray-700'
                  }`}>
                    {dayData.day}
                  </div>
                  {dayData.hasBookings ? (
                    <div className="mt-auto flex items-center text-xs text-blue-600">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      <span>予約あり</span>
                    </div>
                  ) : (
                    <div className="mt-auto text-xs text-gray-400">空き</div>
                  )}
                </div>
              </Link>
            ) : (
              <div className="h-full bg-gray-50"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}