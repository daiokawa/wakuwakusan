import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProgramDetailPageProps {
  params: {
    id: string;
  };
}

// 仮の番組データ（後でデータベースから取得するように変更）
const mockProgram = {
  id: "1",
  name: "朝の情報番組",
  time: "06:00-09:00",
  summary: "平日朝の情報番組。最新のニュース、天気予報、交通情報をお届けします。",
  bookings: [
    {
      id: "1",
      date: "2024-05-20",
      client: "株式会社サンプル1",
      status: "確定",
    },
    {
      id: "2",
      date: "2024-05-21",
      client: "株式会社サンプル2",
      status: "仮予約",
    },
  ],
};

export default function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const { id } = params;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{mockProgram.name}</h1>
        <p className="text-gray-500 mt-2">放送時間: {mockProgram.time}</p>
      </header>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">番組情報</TabsTrigger>
          <TabsTrigger value="bookings">予約状況</TabsTrigger>
          <TabsTrigger value="files">関連ファイル</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">番組概要</h2>
            <p className="text-gray-700">{mockProgram.summary}</p>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="divide-y divide-gray-200">
              {mockProgram.bookings.map((booking) => (
                <div key={booking.id} className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{booking.date}</h3>
                      <p className="text-gray-600">{booking.client}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        booking.status === "確定"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="files" className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">関連ファイル</h2>
            <p className="text-gray-500">ファイルはまだアップロードされていません。</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 