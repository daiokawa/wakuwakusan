'use client';

interface ClientSummaryProps {
  clientId: string;
}

export default function ClientSummary({ clientId }: ClientSummaryProps) {
  // 実際の実装ではAPIからデータを取得するが、今回はシンプルな表示を行う
  // clientIdに基づいた情報を表示する想定
  const summary = {
    text: `このクライアントは、当ラジオ局の広告枠を利用しています。

効果的なキャンペーン展開のため、番組との相性や時間帯を考慮した提案が効果的です。

ナビゲーターによる紹介や、適切な番組への配置を検討しましょう。

次回の予約に向けて準備を進めてください。`,
    keywords: ['広告枠', 'キャンペーン', '番組配置', 'ナビゲーター紹介', '効果測定'],
    lastUpdated: new Date().toISOString(),
  };
  
  // Format the date for display
  const updatedDate = new Date(summary.lastUpdated);
  const dateString = updatedDate.toLocaleDateString('ja-JP');
  const timeString = updatedDate.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">AI概要</h3>
        <p className="text-sm text-gray-500">
          最終更新: {dateString} {timeString}
        </p>
      </div>
      
      <div className="rounded-md bg-gray-50 p-4">
        <div className="whitespace-pre-line text-gray-700">{summary.text}</div>
      </div>
      
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700">関連キーワード</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {summary.keywords.map((keyword, index) => (
            <span
              key={index}
              className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-6">
        <button
          type="button"
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          概要を更新
        </button>
      </div>
    </div>
  );
}