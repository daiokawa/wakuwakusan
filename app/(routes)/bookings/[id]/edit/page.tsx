import Link from 'next/link';

export default function EditBookingPage({ params }: { params: { id: string } }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-2">
        <Link href={`/bookings/${params.id}`} className="text-blue-600 hover:text-blue-800">
          ← 予約詳細に戻る
        </Link>
      </div>
      
      <div className="mb-8 flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <h1 className="text-3xl font-bold text-gray-900">
          予約編集（開発中）
        </h1>
      </div>
      
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="py-8 text-center">
          <p className="text-gray-500 mb-4">この機能は現在開発中です</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            ダッシュボードに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}