// import { kv } from '@vercel/kv'; // 開発環境では使用しない
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Generate a token
    const token = uuidv4();
    
    // 開発環境ではKVを使用せず、実装をシミュレートする
    // await kv.set(`qr_token:${token}`, {
    //   created: new Date().toISOString(),
    //   verified: false,
    // }, { ex: 120 }); // 120 seconds expiration
    
    // トークンは生成されるが、実際には保存されない
    
    return NextResponse.json({ 
      token,
      expiresIn: 120 // seconds
    });
  } catch (error) {
    console.error('Error generating QR token:', error);
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}