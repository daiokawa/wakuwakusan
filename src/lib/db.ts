import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function getClients() {
  noStore();
  try {
    const { rows } = await sql`
      SELECT * FROM clients
      ORDER BY last_updated DESC
    `;
    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch clients.");
  }
}

export async function getClient(id: string) {
  noStore();
  try {
    const { rows } = await sql`
      SELECT * FROM clients
      WHERE id = ${id}
    `;
    return rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch client.");
  }
}

export async function getPrograms() {
  noStore();
  try {
    const { rows } = await sql`
      SELECT * FROM programs
      ORDER BY name ASC
    `;
    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch programs.");
  }
}

export async function getProgram(id: string) {
  noStore();
  try {
    const { rows } = await sql`
      SELECT * FROM programs
      WHERE id = ${id}
    `;
    return rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch program.");
  }
}

export async function getBookingsByDate(date: string) {
  noStore();
  try {
    const { rows } = await sql`
      SELECT b.*, c.name as client_name, p.name as program_name
      FROM bookings b
      LEFT JOIN clients c ON b.client_id = c.id
      LEFT JOIN programs p ON b.program_id = p.id
      WHERE b.broadcast_date = ${date}
      ORDER BY b.start_time ASC
    `;
    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch bookings.");
  }
}

export async function getBookingsByClient(clientId: string) {
  noStore();
  try {
    const { rows } = await sql`
      SELECT b.*, p.name as program_name
      FROM bookings b
      LEFT JOIN programs p ON b.program_id = p.id
      WHERE b.client_id = ${clientId}
      ORDER BY b.broadcast_date DESC, b.start_time ASC
    `;
    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch bookings.");
  }
}

export async function getBookingsByProgram(programId: string) {
  noStore();
  try {
    const { rows } = await sql`
      SELECT b.*, c.name as client_name
      FROM bookings b
      LEFT JOIN clients c ON b.client_id = c.id
      WHERE b.program_id = ${programId}
      ORDER BY b.broadcast_date DESC, b.start_time ASC
    `;
    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch bookings.");
  }
} 