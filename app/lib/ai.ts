import { GoogleGenerativeAI, Part } from '@google/generative-ai';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// Type for summary output
export interface AISummary {
  status: string;
  contactInfo: {
    clientContact?: string;
    internalContact?: string;
  };
  summary: string;
  todos: string[];
  keywords: string[];
}

/**
 * Generate a summary for broadcast slot based on folder content
 * 
 * @param folderData Object containing all relevant data about the broadcast slot
 * @returns A structured summary of the information
 */
export async function generateSlotSummary(
  folderData: {
    broadcastDate: string;
    broadcastTime: string;
    duration: number;
    clientName: string;
    programName: string;
    files: Array<{
      fileName: string;
      content: string;
    }>;
  }
): Promise<AISummary> {
  try {
    // Create the model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Build the prompt
    let prompt = `あなたはラジオ局の広告枠管理アシスタントです。
以下の情報に基づいて、この放送枠に関する概要レポートを作成してください。

# 基本情報
- 放送日: ${folderData.broadcastDate}
- 放送時間: ${folderData.broadcastTime} (${folderData.duration}分)
- 取引先名: ${folderData.clientName}
- 番組名: ${folderData.programName}

# 関連ファイルの内容\n`;

    // Add file contents to the prompt
    folderData.files.forEach((file, index) => {
      prompt += `## ファイル${index + 1}: ${file.fileName}\n${file.content}\n\n`;
    });

    // Add output format instruction
    prompt += `# 出力フォーマット
以下のJSON形式で、簡潔かつ網羅的に情報をまとめてください。
特に重要なポイント、未確定事項、要確認事項があれば明記してください。

{
  "status": "（予約ステータス: 確定 / 仮予約 / 放送済み / キャンセル / 要確認）",
  "contactInfo": {
    "clientContact": "（広告主側担当者、ファイル内容から推定）",
    "internalContact": "（社内担当者、ファイル内容から推定）"
  },
  "summary": "（取引先からの要望、キャンペーン目的、使用素材、注意事項などを3-5行程度でまとめる）",
  "todos": [
    "（例: アナウンス可否をディレクターに確認）",
    "（例: 効果測定レポートの準備）"
  ],
  "keywords": [
    "（内容から抽出される重要なキーワードを5つ程度）"
  ]
}

レスポンスはJSON形式のみを返してください。`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    
    // Parse the JSON response
    const textResponse = response.text();
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }
    
    const jsonResponse = JSON.parse(jsonMatch[0]) as AISummary;
    return jsonResponse;
  } catch (error) {
    console.error('AI generation error:', error);
    // Return a fallback summary
    return {
      status: '要確認',
      contactInfo: {},
      summary: '情報の解析中にエラーが発生しました。データを確認してください。',
      todos: ['AIサマリーの再生成を行う'],
      keywords: ['エラー', '再生成必要']
    };
  }
}

/**
 * Generate a summary for a client based on their history and files
 * 
 * @param clientData Object containing client information and history
 * @returns A summary of client information
 */
export async function generateClientSummary(
  clientData: {
    clientName: string;
    bookings: Array<{
      broadcastDate: string;
      broadcastTime: string;
      programName: string;
      status: string;
    }>;
    files: Array<{
      fileName: string;
      content: string;
    }>;
  }
): Promise<string> {
  try {
    // Create the model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Build the prompt
    let prompt = `あなたはラジオ局の広告管理アシスタントです。
以下の取引先情報に基づいて、要約を作成してください。

# 取引先情報
- 取引先名: ${clientData.clientName}

# 予約履歴
`;

    // Add booking history
    clientData.bookings.forEach((booking, index) => {
      prompt += `- ${booking.broadcastDate} ${booking.broadcastTime} 「${booking.programName}」 (${booking.status})\n`;
    });

    prompt += `
# 関連ファイル
`;

    // Add file contents
    clientData.files.forEach((file, index) => {
      prompt += `## ${file.fileName}\n${file.content}\n\n`;
    });

    // Add output format instruction
    prompt += `
取引先の特徴、取引パターン、頻繁に利用する番組、特別な要望などを300文字程度で簡潔にまとめてください。`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('AI generation error:', error);
    return '取引先情報の解析中にエラーが発生しました。データを確認してください。';
  }
}