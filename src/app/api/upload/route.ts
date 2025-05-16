import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { sql } from "@vercel/postgres";
import { z } from "zod";

const uploadSchema = z.object({
  bookingId: z.string().uuid(),
  fileName: z.string(),
  fileType: z.string(),
  textContent: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const bookingId = formData.get("bookingId") as string;
    const textContent = formData.get("textContent") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided." },
        { status: 400 }
      );
    }

    // ファイルをVercel Blobにアップロード
    const blob = await put(file.name, file, {
      access: "public",
    });

    // データベースにファイル情報を保存
    const { rows } = await sql`
      INSERT INTO uploaded_files (
        booking_id,
        file_name,
        file_type,
        file_path,
        text_content
      )
      VALUES (
        ${bookingId},
        ${file.name},
        ${file.type},
        ${blob.url},
        ${textContent}
      )
      RETURNING *
    `;

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { error: "Failed to upload file." },
      { status: 500 }
    );
  }
} 