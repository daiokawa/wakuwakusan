import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ClientDetailPageProps {
  params: {
    id: string;
  };
}

// 仮の取引先データ（後でデータベースから取得するように変更）
const mockClient = {
  id: "1",
  name: "株式会社サンプル1",
  lastUpdated: "2024-05-16",
  summary: "主要な広告主で、月間10枠程度のCMを出稿。担当者は山田様。",
  bookings: [
    {
      id: "1",
      date: "2024-05-20",
      time: "10:00",
      program: "朝の情報番組",
      status: "確定",
    },
    {
      id: "2",
      date: "2024-05-25",
      time: "15:00",
      program: "午後の音楽番組",
      status: "仮予約",
    },
  ],
};

export default function ClientDetailPage({ params }: ClientDetailPageProps) {
  const { id } = params;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{mockClient.name}</h1>
        <p className="text-gray-500 mt-2">
          最終更新: {mockClient.lastUpdated}
        </p>
      </header>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="bookings">予約履歴</TabsTrigger>
          <TabsTrigger value="files">関連ファイル</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">概要</h2>
            <p className="text-gray-700">{mockClient.summary}</p>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="divide-y divide-gray-200">
              {mockClient.bookings.map((booking) => (
                <div key={booking.id} className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {booking.date} {booking.time}
                      </h3>
                      <p className="text-gray-600">{booking.program}</p>
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