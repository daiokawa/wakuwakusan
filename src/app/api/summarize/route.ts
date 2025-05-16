import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { targetType, targetId } = body;

    // 対象の情報を取得
    let targetInfo;
    let relatedFiles;

    if (targetType === "booking") {
      const { rows: bookingRows } = await sql`
        SELECT b.*, c.name as client_name, p.name as program_name
        FROM bookings b
        LEFT JOIN clients c ON b.client_id = c.id
        LEFT JOIN programs p ON b.program_id = p.id
        WHERE b.id = ${targetId}
      `;
      targetInfo = bookingRows[0];

      const { rows: fileRows } = await sql`
        SELECT * FROM uploaded_files
        WHERE booking_id = ${targetId}
        ORDER BY uploaded_at DESC
      `;
      relatedFiles = fileRows;
    } else if (targetType === "client") {
      const { rows: clientRows } = await sql`
        SELECT * FROM clients
        WHERE id = ${targetId}
      `;
      targetInfo = clientRows[0];

      const { rows: bookingRows } = await sql`
        SELECT b.*, p.name as program_name
        FROM bookings b
        LEFT JOIN programs p ON b.program_id = p.id
        WHERE b.client_id = ${targetId}
        ORDER BY b.broadcast_date DESC
        LIMIT 5
      `;
      relatedFiles = bookingRows;
    } else if (targetType === "program") {
      const { rows: programRows } = await sql`
        SELECT * FROM programs
        WHERE id = ${targetId}
      `;
      targetInfo = programRows[0];

      const { rows: bookingRows } = await sql`
        SELECT b.*, c.name as client_name
        FROM bookings b
        LEFT JOIN clients c ON b.client_id = c.id
        WHERE b.program_id = ${targetId}
        ORDER BY b.broadcast_date DESC
        LIMIT 5
      `;
      relatedFiles = bookingRows;
    }

    if (!targetInfo) {
      return NextResponse.json(
        { error: "Target not found." },
        { status: 404 }
      );
    }

    // Gemini APIに送信するプロンプトを生成
    const prompt = generatePrompt(targetType, targetInfo, relatedFiles);

    // Gemini APIで概要を生成
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();

    // 生成された概要をデータベースに保存
    const { rows } = await sql`
      INSERT INTO summaries (
        target_type,
        target_id,
        generated_text
      )
      VALUES (
        ${targetType},
        ${targetId},
        ${generatedText}
      )
      RETURNING *
    `;

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Summarization Error:", error);
    return NextResponse.json(
      { error: "Failed to generate summary." },
      { status: 500 }
    );
  }
}

function generatePrompt(
  targetType: string,
  targetInfo: any,
  relatedFiles: any[]
) {
  let prompt = `あなたはラジオ局の広告枠管理アシスタントです。
以下の情報に基づいて、この${targetType === "booking" ? "放送枠" : targetType === "client" ? "取引先" : "番組"}に関する概要レポートを作成してください。

# 基本情報
`;

  if (targetType === "booking") {
    prompt += `
- 放送日: ${targetInfo.broadcast_date}
- 放送時間: ${targetInfo.start_time} (${targetInfo.duration_minutes}分)
- 取引先名: ${targetInfo.client_name}
- 番組名: ${targetInfo.program_name || "未設定"}
- キャンペーン名: ${targetInfo.campaign_name || "未設定"}
- ステータス: ${targetInfo.status}
`;
  } else if (targetType === "client") {
    prompt += `
- 取引先名: ${targetInfo.name}
- 最終更新: ${targetInfo.last_updated}
`;
  } else if (targetType === "program") {
    prompt += `
- 番組名: ${targetInfo.name}
- 番組情報: ${targetInfo.program_info || "未設定"}
- 最終更新: ${targetInfo.last_updated}
`;
  }

  if (relatedFiles && relatedFiles.length > 0) {
    prompt += `
# 関連ファイルの内容
`;
    relatedFiles.forEach((file, index) => {
      if (targetType === "booking") {
        prompt += `
## ファイル${index + 1}: ${file.file_name}
${file.text_content || "テキスト内容なし"}
`;
      } else {
        prompt += `
## 予約${index + 1}: ${file.broadcast_date} ${file.start_time}
- ステータス: ${file.status}
${file.memo ? `- メモ: ${file.memo}` : ""}
`;
      }
    });
  }

  prompt += `
# 出力フォーマット
以下の形式で、簡潔かつ網羅的に情報をまとめてください。
特に重要なポイント、未確定事項、要確認事項があれば明記してください。

## 予約ステータス
（例: 確定 / 仮予約 / 放送済み / キャンセル / 要確認）

## 担当者情報
- 広告主側担当者: （ファイル内容から推定）
- 社内担当者: （ファイル内容から推定、または別途入力情報を参照）

## 要約・特記事項
（取引先からの要望、キャンペーン目的、使用素材、注意事項などを3-5行程度でまとめる）

## ToDo / 確認事項
- （例: アナウンス可否をディレクターに確認）
- （例: 効果測定レポートの準備）

## 関連キーワード
（内容から抽出される重要なキーワードを5つ程度）`;

  return prompt;
} 