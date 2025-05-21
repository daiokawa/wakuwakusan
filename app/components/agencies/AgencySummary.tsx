'use client';

interface AgencySummaryProps {
  agencyId: string;
}

export default function AgencySummary({ agencyId }: AgencySummaryProps) {
  // 実際のアプリではAPIから概要を取得
  // デモではモックデータを使用
  const summary = {
    status: "アクティブ",
    contactInfo: {
      agencyContact: "山田太郎",
      internalContact: "佐藤花子"
    },
    summary: `この代理店は主に朝・昼の放送枠を利用しています。
特に「ワクワクモーニング」での放送が多く、1クール単位での契約が一般的です。
直近ではスポットCMからタイムCMへの移行を検討中です。`,
    todos: [
      "次回キャンペーンの企画書提出を依頼",
      "新規取引先紹介のフォローアップ"
    ],
    keywords: ["朝の時間帯", "定期契約", "企画提案", "長期パートナー"]
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">代理店ステータス</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>{summary.status}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">担当者情報</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="font-medium text-gray-900">代理店側担当者</dt>
                <dd className="mt-1">{summary.contactInfo.agencyContact}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="font-medium text-gray-900">社内担当者</dt>
                <dd className="mt-1">{summary.contactInfo.internalContact}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">要約・特記事項</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p className="whitespace-pre-line">{summary.summary}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">ToDo / 確認事項</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <ul className="list-disc pl-5 space-y-1">
              {summary.todos.map((todo, index) => (
                <li key={index}>{todo}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">関連キーワード</h3>
          <div className="mt-2 text-sm text-gray-500">
            <div className="flex flex-wrap gap-2">
              {summary.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}