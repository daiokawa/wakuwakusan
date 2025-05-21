import Link from 'next/link';
import { getPrograms } from '@/app/lib/db';
import SearchBar from '@/app/components/common/SearchBar';
import programsData from '@/app/lib/data/programs_full.json';

export default async function ProgramsPage() {
  // 実データを使用
  
  // 番組詳細をソート
  const sortedPrograms = [...programsData].sort((a, b) => {
    return a.programName.localeCompare(b.programName, 'ja');
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">番組一覧</h1>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/programs/new"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            新規番組
          </Link>
        </div>
      </div>
      
      <div className="mt-8">
        <SearchBar placeholder="番組名で検索..." />
      </div>
      
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedPrograms.map((program) => (
          <Link
            key={program.programId}
            href={`/programs/${program.programId}`}
            className="block overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-md"
          >
            <div className="bg-purple-100 p-4">
              <h3 className="text-lg font-medium text-gray-900 line-clamp-1">
                {program.programName}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {program.programInfo}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}