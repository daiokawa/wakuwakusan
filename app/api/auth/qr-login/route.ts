// import { kv } from '@vercel/kv'; - 開発環境では使用しない
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
    // 開発環境ではKVを使用せず、すべてのトークンを有効として扱う
    const tokenData = { 
      userId: '1', 
      username: 'demo-user', 
      created: new Date().toISOString() 
    };
    
    // 実際の実装では、kv.get(`qr_token:${token}`) でトークンを検証し、
    // kv.set() でトークンを更新するが、開発環境ではスキップ
    
    // In a real implementation, you would set a session cookie here
    
    // Return a simple page informing the user they can close this window
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>ログイン成功</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-color: #f9fafb;
            }
            .container {
              text-align: center;
              padding: 2rem;
              background-color: white;
              border-radius: 0.5rem;
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
              max-width: 90%;
            }
            h1 {
              color: #0ea5e9;
              font-size: 1.5rem;
              margin-bottom: 1rem;
            }
            p {
              color: #4b5563;
              margin-bottom: 2rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>ログイン成功</h1>
            <p>このウィンドウは閉じて構いません。<br/>元の画面に戻ってください。</p>
          </div>
          <script>
            // Auto-close this window after 5 seconds
            setTimeout(() => {
              window.close();
            }, 5000);
          </script>
        </body>
      </html>
    `, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error processing QR login:', error);
    return new Response('Internal server error', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}