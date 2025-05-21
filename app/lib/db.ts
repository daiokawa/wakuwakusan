import { sql } from '@vercel/postgres';
import { kv } from '@vercel/kv';

// Type definitions for our data models
export type Client = {
  clientId: string;
  clientName: string;
  initialRanking: number;
  lastUpdated: string;
  memo?: string;
};

export type Program = {
  programId: string;
  programName: string;
  programInfo?: string;
  lastUpdated: string;
};

export type Booking = {
  bookingId: string;
  clientId: string;
  programId?: string;
  broadcastDate: string;
  startTime: string;
  durationMinutes: number;
  campaignName?: string;
  status: 'confirmed' | 'tentative' | 'broadcasted' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  memo?: string;
  folderPath?: string;
};

export type UploadedFile = {
  fileId: string;
  bookingId?: string;
  fileName: string;
  fileType: string;
  filePath: string;
  uploadedAt: string;
  textContent?: string;
};

export type Summary = {
  summaryId: string;
  targetType: 'client' | 'program' | 'booking';
  targetId: string;
  generatedText: string;
  lastGeneratedAt: string;
};

export type User = {
  userId: string;
  userName: string;
  loginType: 'qr';
  role: 'admin' | 'editor';
};

// Cache key prefixes
const CACHE_KEYS = {
  CLIENTS: 'clients:',
  PROGRAMS: 'programs:',
  BOOKINGS: 'bookings:',
  FILES: 'files:',
  SUMMARIES: 'summaries:',
  USERS: 'users:',
} as const;

// Helper functions for working with clients
export async function getClients(): Promise<Client[]> {
  try {
    const result = await sql`
      SELECT * FROM Clients 
      ORDER BY initialRanking, clientName
    `;
    return result.rows as Client[];
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch clients');
  }
}

export async function getClientById(clientId: string): Promise<Client | null> {
  try {
    // Try cache first
    const cachedClient = await kv.get<Client>(`${CACHE_KEYS.CLIENTS}${clientId}`);
    if (cachedClient) return cachedClient;

    // If not in cache, fetch from DB
    const result = await sql`
      SELECT * FROM Clients 
      WHERE clientId = ${clientId}
    `;
    
    if (result.rows.length === 0) return null;
    
    const client = result.rows[0] as Client;
    
    // Cache for future use (expire after 1 hour)
    await kv.set(`${CACHE_KEYS.CLIENTS}${clientId}`, client, { ex: 3600 });
    
    return client;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch client');
  }
}

// Helper functions for working with programs
export async function getPrograms(): Promise<Program[]> {
  try {
    const result = await sql`
      SELECT * FROM Programs 
      ORDER BY programName
    `;
    return result.rows as Program[];
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch programs');
  }
}

export async function getProgramById(programId: string): Promise<Program | null> {
  try {
    // Try cache first
    const cachedProgram = await kv.get<Program>(`${CACHE_KEYS.PROGRAMS}${programId}`);
    if (cachedProgram) return cachedProgram;

    // If not in cache, fetch from DB
    const result = await sql`
      SELECT * FROM Programs 
      WHERE programId = ${programId}
    `;
    
    if (result.rows.length === 0) return null;
    
    const program = result.rows[0] as Program;
    
    // Cache for future use (expire after 1 hour)
    await kv.set(`${CACHE_KEYS.PROGRAMS}${programId}`, program, { ex: 3600 });
    
    return program;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch program');
  }
}

// Helper functions for working with bookings
export async function getBookingsByDate(date: string): Promise<Booking[]> {
  try {
    const result = await sql`
      SELECT * FROM Bookings 
      WHERE broadcastDate = ${date}
      ORDER BY startTime
    `;
    return result.rows as Booking[];
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch bookings');
  }
}

export async function getBookingsByClientId(clientId: string): Promise<Booking[]> {
  try {
    const result = await sql`
      SELECT * FROM Bookings 
      WHERE clientId = ${clientId}
      ORDER BY broadcastDate DESC, startTime
    `;
    return result.rows as Booking[];
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch client bookings');
  }
}

export async function getBookingsByProgramId(programId: string): Promise<Booking[]> {
  try {
    const result = await sql`
      SELECT * FROM Bookings 
      WHERE programId = ${programId}
      ORDER BY broadcastDate DESC, startTime
    `;
    return result.rows as Booking[];
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch program bookings');
  }
}

export async function getBookingById(bookingId: string): Promise<Booking | null> {
  try {
    // Try cache first
    const cachedBooking = await kv.get<Booking>(`${CACHE_KEYS.BOOKINGS}${bookingId}`);
    if (cachedBooking) return cachedBooking;

    // If not in cache, fetch from DB
    const result = await sql`
      SELECT * FROM Bookings 
      WHERE bookingId = ${bookingId}
    `;
    
    if (result.rows.length === 0) return null;
    
    const booking = result.rows[0] as Booking;
    
    // Cache for future use (expire after 10 minutes since bookings change frequently)
    await kv.set(`${CACHE_KEYS.BOOKINGS}${bookingId}`, booking, { ex: 600 });
    
    return booking;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch booking');
  }
}

// Helper functions for working with files
export async function getFilesByBookingId(bookingId: string): Promise<UploadedFile[]> {
  try {
    const result = await sql`
      SELECT * FROM UploadedFiles 
      WHERE bookingId = ${bookingId}
      ORDER BY uploadedAt DESC
    `;
    return result.rows as UploadedFile[];
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch files');
  }
}

// Helper functions for working with summaries
export async function getSummary(
  targetType: 'client' | 'program' | 'booking', 
  targetId: string
): Promise<Summary | null> {
  try {
    // Try cache first
    const cacheKey = `${CACHE_KEYS.SUMMARIES}${targetType}:${targetId}`;
    const cachedSummary = await kv.get<Summary>(cacheKey);
    if (cachedSummary) return cachedSummary;

    // If not in cache, fetch from DB
    const result = await sql`
      SELECT * FROM Summaries 
      WHERE targetType = ${targetType} AND targetId = ${targetId}
      ORDER BY lastGeneratedAt DESC
      LIMIT 1
    `;
    
    if (result.rows.length === 0) return null;
    
    const summary = result.rows[0] as Summary;
    
    // Cache for future use (expire after 30 minutes)
    await kv.set(cacheKey, summary, { ex: 1800 });
    
    return summary;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch summary');
  }
}