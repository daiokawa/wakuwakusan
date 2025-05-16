import Link from "next/link";

// 仮の番組データ（後でbangumi01.txtから取得するように変更）
const mockPrograms = [
  { id: "1", name: "朝の情報番組", time: "06:00-09:00" },
  { id: "2", name: "午後の音楽番組", time: "13:00-15:00" },
  { id: "3", name: "夜のトーク番組", time: "20:00-22:00" },
];

export default function ProgramPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">番組名一覧</h1>
      </header>

      <div className="mb-6">
        <input
          type="text"
          placeholder="番組名で検索..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="divide-y divide-gray-200">
          {mockPrograms.map((program) => (
            <Link
              key={program.id}
              href={`/program/${program.id}`}
              className="block p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {program.name}
                  </h2>
                  <p className="text-gray-500">{program.time}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 