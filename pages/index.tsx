import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const scan = async () => {
      const dummy = {
        score: Math.floor(Math.random() * 40 + 60),
        market: Math.floor(Math.random() * 1000 + 500),
      }
      setTimeout(() => {
        router.push(`/result?score=${dummy.score}&market=${dummy.market}`)
      }, 1800)
    }
    scan()
  }, [])

  return (
    <main className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center px-4">
        <h1 className="text-2xl font-bold mb-3">TensorHR スキャン開始</h1>
        <p className="text-gray-400 mb-1">あなたの行動パターン・使用環境などを解析しています。</p>
        <p className="text-gray-500 text-sm">（※本診断は自動で行われます）</p>
      </div>
    </main>
  )
}
// re-deploy
