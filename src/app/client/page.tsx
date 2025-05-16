import Link from "next/link";

// 仮の取引先データ（後でデータベースから取得するように変更）
const mockClients = [
  { id: "1", name: "株式会社サンプル1", lastUpdated: "2024-05-16" },
  { id: "2", name: "株式会社サンプル2", lastUpdated: "2024-05-15" },
  { id: "3", name: "株式会社サンプル3", lastUpdated: "2024-05-14" },
];

export default function ClientPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">取引先一覧</h1>
      </header>

      <div className="mb-6">
        <input
          type="text"
          placeholder="取引先名で検索..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="divide-y divide-gray-200">
          {mockClients.map((client) => (
            <Link
              key={client.id}
              href={`/client/${client.id}`}
              className="block p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {client.name}
                </h2>
                <div className="text-sm text-gray-500">
                  最終更新: {client.lastUpdated}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 