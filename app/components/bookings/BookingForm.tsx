'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import clientsData from '@/app/lib/data/clients.json';
import programsData from '@/app/lib/data/programs_full.json';

interface BookingFormProps {
  initialData: {
    date: string;
    startTime: string;
    programId: string;
    clientId: string;
  };
}

export default function BookingForm({ initialData }: BookingFormProps) {
  const router = useRouter();
  
  // Form state
  const [date, setDate] = useState(initialData.date);
  const [startTime, setStartTime] = useState(initialData.startTime);
  const [duration, setDuration] = useState('15');
  const [clientId, setClientId] = useState(initialData.clientId);
  const [programId, setProgramId] = useState(initialData.programId);
  const [campaignName, setCampaignName] = useState('');
  const [status, setStatus] = useState('confirmed');
  const [memo, setMemo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // クライアントとプログラムのデータからドロップダウンを作成
  const clients = clientsData.map(client => ({
    id: client.clientId,
    name: client.clientName
  }));
  
  // プログラムデータからドロップダウンオプションを生成
  const programs = programsData.map(program => ({
    id: program.programId,
    name: program.programName,
    time: `${program.startTime}-${program.endTime}`
  }));
  
  // 重複した番組名を取り除く
  const uniquePrograms = programs.filter((program, index, self) =>
    index === self.findIndex((p) => p.name === program.name)
  );
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // In a real app, we would send this data to an API
    const formData = {
      date,
      startTime,
      duration: parseInt(duration),
      clientId,
      programId,
      campaignName,
      status,
      memo,
    };
    
    console.log('Form data:', formData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirect to the dashboard after simulating submission
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            放送日 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        
        {/* Start Time */}
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
            開始時間 <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        
        {/* Duration */}
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            放送時間 <span className="text-red-500">*</span>
          </label>
          <select
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="15">15分</option>
            <option value="30">30分</option>
            <option value="60">60分</option>
          </select>
        </div>
        
        {/* Client */}
        <div>
          <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">
            取引先 <span className="text-red-500">*</span>
          </label>
          <select
            id="clientId"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">取引先を選択</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Program */}
        <div>
          <label htmlFor="programId" className="block text-sm font-medium text-gray-700">
            番組
          </label>
          <select
            id="programId"
            value={programId}
            onChange={(e) => setProgramId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">番組を選択</option>
            {uniquePrograms.map((program) => (
              <option key={program.id} value={program.id}>
                {program.name} ({program.time})
              </option>
            ))}
          </select>
        </div>
        
        {/* Campaign Name */}
        <div>
          <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700">
            キャンペーン名
          </label>
          <input
            type="text"
            id="campaignName"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        
        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            ステータス <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="confirmed">確定</option>
            <option value="tentative">仮予約</option>
          </select>
        </div>
      </div>
      
      {/* Memo */}
      <div>
        <label htmlFor="memo" className="block text-sm font-medium text-gray-700">
          メモ
        </label>
        <textarea
          id="memo"
          rows={4}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="放送に関する特記事項があれば入力してください"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        ></textarea>
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? '保存中...' : '予約を保存'}
        </button>
      </div>
    </form>
  );
}