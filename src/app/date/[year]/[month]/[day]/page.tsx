import Link from "next/link";

interface DayPageProps {
  params: {
    year: string;
    month: string;
    day: string;
  };
}

export default function DayPage({ params }: DayPageProps) {
  const { year, month, day } = params;
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

  // 5:00から29:00までの時間枠を生成（15分単位）
  const timeSlots = Array.from({ length: 97 }, (_, i) => {
    const hour = Math.floor((i * 15) / 60) + 5;
    const minute = (i * 15) % 60;
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {year}年{month}月{day}日のタイムテーブル
        </h1>
      </header>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-4">
          {timeSlots.map((time) => (
            <div
              key={time}
              className="flex items-center p-4 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
            >
              <div className="w-20 font-semibold text-gray-600">{time}</div>
              <div className="flex-1">
                {/* ここに予約情報を表示予定 */}
                <div className="text-gray-400">空き</div>
              </div>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                onClick={() => {
                  // ここに予約作成モーダルを表示する処理を追加予定
                }}
              >
                予約する
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 