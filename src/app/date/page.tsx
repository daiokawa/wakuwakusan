import Link from "next/link";

export default function DatePage() {
  // 現在の年から5年分の年を生成
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">年を選択</h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {years.map((year) => (
          <Link
            key={year}
            href={`/date/${year}`}
            className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-gray-900">{year}年</h2>
          </Link>
        ))}
      </div>
    </div>
  );
} 