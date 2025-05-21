// import { kv } from '@vercel/kv'; // 開発環境では使用しない
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json(
      { error: 'Token is required' },
      { status: 400 }
    );
  }

  try {
    // 開発環境では、全てのトークンが有効とみなす
    // 実際の実装では、KVからトークンデータを取得し、検証する
    
    // デモ用に判定を切り替えるものとする
    // tokenに"demo"が含まれる場合は、有効済みとして扱う
    if (token.includes('demo')) {
      return NextResponse.json({ verified: true });
    }
    
    // デフォルトではまだ検証されていないとみなす
    return NextResponse.json({ verified: false });
  } catch (error) {
    console.error('Error verifying QR token:', error);
    return NextResponse.json(
      { verified: false, error: 'Failed to verify token' },
      { status: 500 }
    );
  }
}