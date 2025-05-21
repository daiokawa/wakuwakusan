import Link from 'next/link';
import { FolderIcon } from '@/app/components/icons';

export default function DatesPage() {
  // Get the current year and a couple of years ahead
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear + 1, currentYear + 2];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">日付から探す</h1>
      
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-700">年を選択</h2>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {years.map((year) => (
            <Link
              key={year}
              href={`/dates/${year}`}
              className="flex items-center rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mr-4 rounded-full bg-blue-100 p-3">
                <FolderIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{year}年</h3>
                <p className="text-sm text-gray-500">タップして月を選択</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}