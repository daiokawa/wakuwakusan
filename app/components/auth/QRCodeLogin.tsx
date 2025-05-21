'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QRCode from 'react-qr-code';

export default function QRCodeLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 開発環境用: 簡易的なデモQRコード（実際には動作しません）
  const demoToken = 'demo-qr-code-token-' + Math.random().toString(36).substring(2, 8);

  function handleDemoLogin() {
    // デモ用: ダッシュボードに直接リダイレクト
    router.push('/dashboard');
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="overflow-hidden rounded-lg bg-white p-2 shadow-lg">
          <QRCode
            size={180}
            value={`https://example.com/demo-login?token=${demoToken}`}
            viewBox="0 0 256 256"
          />
        </div>
        <p className="text-sm text-gray-500">
          開発モード: QRコードデモ表示
        </p>
        <div className="mt-4">
          <button
            onClick={handleDemoLogin}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            デモログイン
          </button>
        </div>
      </div>
    </div>
  );
}