import Link from "next/link";

interface MonthPageProps {
  params: {
    year: string;
    month: string;
  };
}

export default function MonthPage({ params }: MonthPageProps) {
  const { year, month } = params;
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
  const firstDayOfMonth = date.getDay();

  // カレンダーの日付を生成
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyCells = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {year}年{month}月
        </h1>
      </header>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
            <div
              key={day}
              className="text-center font-semibold text-gray-600 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {emptyCells.map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}
          {days.map((day) => (
            <Link
              key={day}
              href={`/date/${year}/${month}/${day.toString().padStart(2, "0")}`}
              className="aspect-square p-2 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
            >
              <div className="text-gray-900">{day}</div>
              {/* ここに予約状況のインジケータを追加予定 */}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 