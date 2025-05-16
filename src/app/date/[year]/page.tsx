import Link from "next/link";

interface YearPageProps {
  params: {
    year: string;
  };
}

export default function YearPage({ params }: YearPageProps) {
  const { year } = params;
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{year}年 - 月を選択</h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {months.map((month) => (
          <Link
            key={month}
            href={`/date/${year}/${month.toString().padStart(2, "0")}`}
            className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-gray-900">{month}月</h2>
          </Link>
        ))}
      </div>
    </div>
  );
} 