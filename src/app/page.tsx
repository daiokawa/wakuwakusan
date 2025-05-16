import Link from "next/link";
import { Calendar, Building2, Radio } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">広告管理システム/ワクワクさん</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/date"
          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <Calendar className="w-16 h-16 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">日付から探す</h2>
          <p className="text-gray-600 text-center">
            放送日時から広告枠の予約状況を確認
          </p>
        </Link>

        <Link
          href="/client"
          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <Building2 className="w-16 h-16 text-green-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">取引先から探す</h2>
          <p className="text-gray-600 text-center">
            取引先ごとの予約履歴と関連情報を確認
          </p>
        </Link>

        <Link
          href="/program"
          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <Radio className="w-16 h-16 text-purple-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">番組名から探す</h2>
          <p className="text-gray-600 text-center">
            番組ごとの広告枠利用状況を確認
          </p>
        </Link>
      </div>
    </div>
  );
}
