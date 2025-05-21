import Link from 'next/link';
import BookingForm from '@/app/components/bookings/BookingForm';

export default function NewBookingPage({
  searchParams,
}: {
  searchParams?: {
    date?: string;
    startTime?: string;
    programId?: string;
    clientId?: string;
  };
}) {
  // Extract query parameters
  const initialData = {
    date: searchParams?.date || '',
    startTime: searchParams?.startTime || '',
    programId: searchParams?.programId || '',
    clientId: searchParams?.clientId || '',
  };
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-2">
        <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">
          ← ダッシュボードに戻る
        </Link>
      </div>
      
      <h1 className="mb-8 text-3xl font-bold text-gray-900">新規予約</h1>
      
      <div className="rounded-lg bg-white p-6 shadow-md">
        <BookingForm initialData={initialData} />
      </div>
    </div>
  );
}