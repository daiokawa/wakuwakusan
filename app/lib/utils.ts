import { format, parseISO, isValid } from 'date-fns';
import { ja } from 'date-fns/locale';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

// Format a date string as YYYY年MM月DD日
export function formatDateJP(dateString: string): string {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return '無効な日付';
    return format(date, 'yyyy年MM月dd日', { locale: ja });
  } catch (error) {
    console.error('Date formatting error:', error);
    return '無効な日付';
  }
}

// Format a time string as HH:MM
export function formatTime(timeString: string): string {
  try {
    const date = parseISO(`2000-01-01T${timeString}`);
    if (!isValid(date)) return '無効な時間';
    return format(date, 'HH:mm');
  } catch (error) {
    console.error('Time formatting error:', error);
    return '無効な時間';
  }
}

// Create a broadcast date-time folder path
export function createBroadcastFolderPath(
  broadcastDate: string,
  startTime: string,
  clientId: string,
  programId?: string
): string {
  try {
    const date = parseISO(broadcastDate);
    const dateStr = format(date, 'yyyyMMdd');
    const timeStr = startTime.replace(':', '');
    return `${dateStr}/${timeStr}_${clientId}${programId ? `_${programId}` : ''}`;
  } catch (error) {
    console.error('Folder path creation error:', error);
    return `error_${uuidv4()}`;
  }
}

// Validate client data
export const clientSchema = z.object({
  clientName: z.string().min(1, '取引先名を入力してください'),
  initialRanking: z.number().int().min(0).default(999),
  memo: z.string().optional(),
});

// Validate program data
export const programSchema = z.object({
  programName: z.string().min(1, '番組名を入力してください'),
  programInfo: z.string().optional(),
});

// Validate booking data
export const bookingSchema = z.object({
  clientId: z.string().uuid('取引先IDが無効です'),
  programId: z.string().uuid('番組IDが無効です').optional(),
  broadcastDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '無効な日付形式です'),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, '無効な時間形式です'),
  durationMinutes: z.number().int().min(1, '放送時間は1分以上である必要があります'),
  campaignName: z.string().optional(),
  status: z.enum(['confirmed', 'tentative', 'broadcasted', 'cancelled']),
  memo: z.string().optional(),
});

// Generate a unique booking ID
export function generateBookingId(): string {
  return uuidv4();
}

// Parse a date in YYYY-MM-DD format
export function parseDate(dateString: string): Date | null {
  try {
    const date = parseISO(dateString);
    return isValid(date) ? date : null;
  } catch (error) {
    return null;
  }
}

// Truncate text to a specific length with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Parse bangumi.txt file content
export function parseBangumiData(fileContent: string): Array<{ programName: string, info: string }> {
  const lines = fileContent.split('\n').filter(line => line.trim().length > 0);
  const programs: Array<{ programName: string, info: string }> = [];
  
  let currentProgram = '';
  let currentInfo = '';
  
  for (const line of lines) {
    if (line.startsWith('#')) {
      // If we already have a program, save it before starting a new one
      if (currentProgram) {
        programs.push({
          programName: currentProgram,
          info: currentInfo.trim()
        });
      }
      
      // Start a new program
      currentProgram = line.substring(1).trim();
      currentInfo = '';
    } else {
      // Add to current program info
      currentInfo += line + '\n';
    }
  }
  
  // Add the last program
  if (currentProgram) {
    programs.push({
      programName: currentProgram,
      info: currentInfo.trim()
    });
  }
  
  return programs;
}