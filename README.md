# 広告管理システム「ワクワクさん」

ラジオ局における広告枠の予約管理、関連する顧客情報、番組情報、放送素材を一元的に管理するシステムです。

## プロジェクト概要

このシステムは、ラジオ局の広告管理業務を効率化し、情報の属人化を防ぎます。スプレッドシートやローカルファイルベースでの手動管理から脱却し、より迅速かつ正確な情報アクセスと運用を目指します。

主な機能:
- 日付、取引先、番組名から広告枠を探す
- 広告枠の予約管理
- 顧客情報管理
- 番組情報管理
- ファイル管理（「放送日時フォルダ」による文脈ベースの情報管理）
- AI機能（Gemini API）による情報要約

## 技術スタック

- フロントエンド: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- バックエンド: Vercel Functions (Node.js / TypeScript)
- データベース: Vercel KV, Vercel Postgres
- ファイルストレージ: Vercel Blob
- AI: Google Gemini API
- ホスティング: Vercel

## 開発環境のセットアップ

### 必要条件

- Node.js 18.x 以上
- npm 9.x 以上

### インストール手順

1. リポジトリをクローンする:
   ```
   git clone https://github.com/your-username/wakuwaku-ad-system.git
   cd wakuwaku-ad-system
   ```

2. 依存パッケージをインストールする:
   ```
   npm install
   ```

3. 環境変数を設定する:
   ```
   cp .env.example .env.local
   ```
   `.env.local` ファイルを編集して必要な環境変数を設定してください。

4. 開発サーバーを起動する:
   ```
   npm run dev
   ```

5. ブラウザで http://localhost:3000 にアクセスして確認する

## 環境変数

このプロジェクトには以下の環境変数が必要です:

- `NEXTAUTH_URL`: NextAuth.js の URL（開発環境では http://localhost:3000）
- `NEXTAUTH_SECRET`: NextAuth.js のシークレットキー
- Vercel KV 関連:
  - `KV_URL`
  - `KV_REST_API_URL`
  - `KV_REST_API_TOKEN`
  - `KV_REST_API_READ_ONLY_TOKEN`
- Vercel Postgres 関連:
  - `POSTGRES_URL`
  - `POSTGRES_PRISMA_URL`
  - `POSTGRES_URL_NON_POOLING`
  - `POSTGRES_USER`
  - `POSTGRES_HOST`
  - `POSTGRES_PASSWORD`
  - `POSTGRES_DATABASE`
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob のトークン
- `GOOGLE_API_KEY`: Google Gemini API のキー

## プロジェクト構造

```
wakuwaku-ad-system/
├── app/                   # Next.js App Router
│   ├── (auth)/            # 認証関連ページ
│   ├── (dashboard)/       # ダッシュボードページ
│   ├── (routes)/          # メインルート
│   │   ├── clients/       # 取引先関連ページ
│   │   ├── dates/         # 日付関連ページ
│   │   ├── programs/      # 番組関連ページ
│   │   ├── files/         # ファイル関連ページ
│   │   └── bookings/      # 予約関連ページ
│   ├── api/               # API エンドポイント
│   ├── components/        # React コンポーネント
│   ├── hooks/             # カスタムフック
│   ├── lib/               # ユーティリティ関数とライブラリ
│   ├── utils/             # 汎用ユーティリティ
│   └── types/             # TypeScript 型定義
├── public/                # 静的ファイル
├── .env.example           # 環境変数のサンプル
├── next.config.js         # Next.js 設定
├── package.json           # NPM パッケージ設定
├── postcss.config.js      # PostCSS 設定
├── tailwind.config.js     # Tailwind CSS 設定
└── tsconfig.json          # TypeScript 設定
```

## 機能概要

### 1. 日付から探す
- 年 → 月 → 日付（カレンダー） → タイムテーブルの階層で探索
- 各日付の広告枠予約状況を確認・予約

### 2. 取引先から探す
- 取引先一覧から特定の取引先を選択
- 取引先の概要、予約履歴、関連ファイルを確認

### 3. 番組名から探す
- 番組一覧から特定の番組を選択
- 番組の予約状況、番組情報を確認

### 4. ファイル管理
- 放送日時フォルダによる文脈ベースのファイル管理
- 関連ファイルのアップロード・確認

### 5. AI機能
- Gemini API による情報要約
- 「放送日時フォルダ」内のファイル内容から重要情報を抽出・構造化

## License

This project is licensed under the MIT License - see the LICENSE file for details.