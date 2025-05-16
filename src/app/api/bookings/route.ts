import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { z } from "zod";

const bookingSchema = z.object({
  clientId: z.string().uuid(),
  programId: z.string().uuid().optional(),
  broadcastDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  durationMinutes: z.number().int().min(15).max(60),
  campaignName: z.string().optional(),
  status: z.enum(["確定", "仮予約", "放送済", "キャンセル"]),
  memo: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = bookingSchema.parse(body);

    // 予約の重複チェック
    const { rows: existingBookings } = await sql`
      SELECT * FROM bookings
      WHERE broadcast_date = ${validatedData.broadcastDate}
      AND start_time = ${validatedData.startTime}
      AND status != 'キャンセル'
    `;

    if (existingBookings.length > 0) {
      return NextResponse.json(
        { error: "この時間枠は既に予約されています。" },
        { status: 400 }
      );
    }

    // 予約を作成
    const { rows } = await sql`
      INSERT INTO bookings (
        client_id,
        program_id,
        broadcast_date,
        start_time,
        duration_minutes,
        campaign_name,
        status,
        memo,
        folder_path
      )
      VALUES (
        ${validatedData.clientId},
        ${validatedData.programId},
        ${validatedData.broadcastDate},
        ${validatedData.startTime},
        ${validatedData.durationMinutes},
        ${validatedData.campaignName},
        ${validatedData.status},
        ${validatedData.memo},
        ${`${validatedData.broadcastDate}/${validatedData.startTime}_${validatedData.clientId}${validatedData.programId ? `_${validatedData.programId}` : ""}`}
      )
      RETURNING *
    `;

    // 取引先の最終更新日時を更新
    await sql`
      UPDATE clients
      SET last_updated = CURRENT_TIMESTAMP
      WHERE id = ${validatedData.clientId}
    `;

    return NextResponse.json(rows[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to create booking." },
      { status: 500 }
    );
  }
} 