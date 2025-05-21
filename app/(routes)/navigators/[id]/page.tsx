import Link from 'next/link';
import navigatorsData from '@/app/lib/data/navigators.json';
import programsData from '@/app/lib/data/programs_full.json';

export default function NavigatorPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  // ナビゲーター情報を取得
  const navigator = navigatorsData.find(n => n.navigatorId === id) || {
    navigatorId: id,
    name: '不明なナビゲーター',
    nameReading: '',
    profileImage: '',
    programs: [],
    bio: 'ナビゲーター情報が見つかりませんでした。',
    socialMedia: {},
    active: false
  };

  // このナビゲーターが担当する番組の詳細情報を取得
  const navigatorPrograms = programsData.filter(program => 
    program.navigator.includes(navigator.name)
  );
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-2">
        <Link href="/navigators" className="text-blue-600 hover:text-blue-800">
          ← ナビゲーター一覧に戻る
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="md:flex">
          {/* プロフィール部分 */}
          <div className="md:w-1/3 bg-gray-50 p-6">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  プロフィール画像
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{navigator.name}</h1>
              <p className="text-gray-500">{navigator.nameReading}</p>
              
              {navigator.active ? (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 mt-2 text-xs font-medium text-green-800">
                  アクティブ
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 mt-2 text-xs font-medium text-gray-800">
                  非アクティブ
                </span>
              )}
            </div>
            
            {/* SNSリンク */}
            {Object.keys(navigator.socialMedia).length > 0 && (
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">SNS</h3>
                <div className="space-y-2">
                  {Object.entries(navigator.socialMedia).map(([platform, account]) => (
                    <p key={platform} className="text-sm">
                      <span className="font-medium">{platform}: </span>
                      <span className="text-blue-600">{account}</span>
                    </p>
                  ))}
                </div>
              </div>
            )}
            
            {/* 管理ボタン */}
            <div className="mt-6">
              <Link
                href={`/navigators/${id}/edit`}
                className="block text-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                プロフィール編集
              </Link>
            </div>
          </div>
          
          {/* 詳細情報部分 */}
          <div className="md:w-2/3 p-6">
            <h2 className="text-xl font-semibold mb-4">プロフィール</h2>
            <p className="text-gray-700 whitespace-pre-line mb-8">
              {navigator.bio}
            </p>
            
            <h2 className="text-xl font-semibold mb-4">担当番組</h2>
            {navigatorPrograms.length > 0 ? (
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        番組名
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        放送日
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        時間
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {navigatorPrograms.map((program) => (
                      <tr key={program.programId}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-blue-600 sm:pl-6">
                          <Link href={`/programs/${program.programId}`}>
                            {program.programName}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {program.broadcastDays.map(day => `${day}曜日`).join('、')}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {program.startTime}〜{program.endTime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">担当番組はありません。</p>
            )}
            
            <h2 className="text-xl font-semibold mt-8 mb-4">最近の放送予約</h2>
            <p className="text-gray-500">
              予約情報はありません。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}