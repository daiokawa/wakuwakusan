import Link from 'next/link';
import { FolderIcon, UserIcon, RadioIcon, BriefcaseIcon } from '@/app/components/icons';

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 whitespace-nowrap">広告管理システム「ワクワクさん」</h1>
        <p className="mt-2 text-sm text-gray-600">
          ラジオ局における広告枠の予約管理、顧客情報、番組情報を一元管理します
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {/* Date-based Navigation */}
        <Link
          href="/dates"
          className="flex flex-col items-center rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg"
        >
          <div className="mb-4 rounded-full bg-blue-100 p-3">
            <FolderIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-lg font-medium text-gray-900">日付から探す</h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            特定の日時における放送枠の状況を確認します
          </p>
        </Link>

        {/* Client-based Navigation */}
        <Link
          href="/clients"
          className="flex flex-col items-center rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg"
        >
          <div className="mb-4 rounded-full bg-green-100 p-3">
            <UserIcon className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-lg font-medium text-gray-900">取引先から探す</h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            特定の取引先に関する予約状況を確認します
          </p>
        </Link>

        {/* Agency-based Navigation */}
        <Link
          href="/agencies"
          className="flex flex-col items-center rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg"
        >
          <div className="mb-4 rounded-full bg-orange-100 p-3">
            <BriefcaseIcon className="h-8 w-8 text-orange-600" />
          </div>
          <h2 className="text-lg font-medium text-gray-900">代理店から探す</h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            特定の代理店が扱う広告枠の状況を確認します
          </p>
        </Link>

        {/* Program-based Navigation */}
        <Link
          href="/programs"
          className="flex flex-col items-center rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg"
        >
          <div className="mb-4 rounded-full bg-purple-100 p-3">
            <RadioIcon className="h-8 w-8 text-purple-600" />
          </div>
          <h2 className="text-lg font-medium text-gray-900">番組名から探す</h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            特定の番組に関する広告枠の利用状況を確認します
          </p>
        </Link>
        
        {/* Navigator-based Navigation */}
        <Link
          href="/navigators"
          className="flex flex-col items-center rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg"
        >
          <div className="mb-4 rounded-full bg-indigo-100 p-3">
            <UserIcon className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-lg font-medium text-gray-900">ナビゲーター</h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            ラジオ番組のパーソナリティー情報を確認します
          </p>
        </Link>
      </div>
    </div>
  );
}