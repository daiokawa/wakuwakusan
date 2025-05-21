'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FileIcon, PlusIcon } from '@/app/components/icons';

interface AgencyFilesProps {
  agencyId: string;
}

interface File {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  uploadedBy: string;
}

export default function AgencyFiles({ agencyId }: AgencyFilesProps) {
  const [isUploading, setIsUploading] = useState(false);
  
  // 実際のアプリではAPIからファイル一覧を取得
  // デモではモックデータを使用
  const files: File[] = [
    {
      id: '1',
      name: '代理店契約書_2025年度.pdf',
      type: 'application/pdf',
      size: '1.2 MB',
      uploadedAt: '2025-04-15T14:30:00Z',
      uploadedBy: '田中一郎',
    },
    {
      id: '2',
      name: '提案資料_夏季キャンペーン.pptx',
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      size: '4.8 MB',
      uploadedAt: '2025-04-10T09:45:00Z',
      uploadedBy: '佐藤花子',
    },
    {
      id: '3',
      name: '手数料率表_2025.xlsx',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      size: '567 KB',
      uploadedAt: '2025-04-05T11:20:00Z',
      uploadedBy: '山田太郎',
    },
    {
      id: '4',
      name: '代理店営業担当者リスト.docx',
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      size: '342 KB',
      uploadedAt: '2025-03-28T16:15:00Z',
      uploadedBy: '鈴木次郎',
    },
  ];

  // ファイルの拡張子に応じたアイコンの色分け
  const getFileIconColor = (type: string) => {
    if (type.includes('pdf')) return 'text-red-500';
    if (type.includes('presentation')) return 'text-orange-500';
    if (type.includes('spreadsheet')) return 'text-green-500';
    if (type.includes('wordprocessing')) return 'text-blue-500';
    if (type.includes('image')) return 'text-purple-500';
    return 'text-gray-500';
  };

  // 日付のフォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // ファイルをアップロード（デモ用モック関数）
  const handleUpload = () => {
    setIsUploading(true);
    // 実際のアプリではファイルアップロードの処理をここに書く
    setTimeout(() => {
      setIsUploading(false);
      // ファイル一覧を更新する処理をここに書く
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">代理店ファイル</h3>
        <button
          type="button"
          onClick={handleUpload}
          disabled={isUploading}
          className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isUploading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              アップロード中...
            </>
          ) : (
            <>
              <PlusIcon className="h-4 w-4 mr-2" />
              ファイルをアップロード
            </>
          )}
        </button>
      </div>

      <div className="rounded-lg bg-white border border-gray-200">
        <ul className="divide-y divide-gray-200">
          {files.map((file) => (
            <li key={file.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FileIcon className={`h-5 w-5 ${getFileIconColor(file.type)}`} />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.size}</p>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500">
                  <p>アップロード: {formatDate(file.uploadedAt)}</p>
                  <p>担当者: {file.uploadedBy}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}