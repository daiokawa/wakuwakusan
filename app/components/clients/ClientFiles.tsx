'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FileIcon, PlusIcon } from '@/app/components/icons';

interface ClientFilesProps {
  clientId: string;
}

interface File {
  id: string;
  fileName: string;
  fileType: string;
  uploadedAt: string;
  filePath: string;
}

export default function ClientFiles({ clientId }: ClientFilesProps) {
  // State for file upload modal
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  // 実際の実装ではAPIからデータを取得する
  // クライアントIDに基づいてファイルを動的に生成
  const generateFiles = (): File[] => {
    const baseDate = new Date();
    
    // ファイルタイプの定義
    const fileTypes = [
      { ext: 'pdf', mime: 'application/pdf', name: '契約書' },
      { ext: 'xlsx', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', name: '料金表' },
      { ext: 'docx', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', name: '担当者情報' },
      { ext: 'png', mime: 'image/png', name: 'ロゴ' }
    ];
    
    const year = baseDate.getFullYear();
    
    return fileTypes.map((type, index) => {
      // 日付を少しずつずらす
      const date = new Date(baseDate);
      date.setDate(date.getDate() - (index * 2));
      
      return {
        id: `file-${clientId}-${index + 1}`,
        fileName: `${type.name}_${year}.${type.ext}`,
        fileType: type.mime,
        uploadedAt: date.toISOString(),
        filePath: `/files/client${clientId}/${type.name}_${year}.${type.ext}`,
      };
    });
  };
  
  const files: File[] = generateFiles();
  
  // Sort files by upload date (most recent first)
  const sortedFiles = [...files].sort((a, b) => {
    return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
  });

  // Function to get file icon based on type
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <FileIcon className="h-6 w-6 text-green-500" />;
    } else if (fileType.includes('pdf')) {
      return <FileIcon className="h-6 w-6 text-red-500" />;
    } else if (fileType.includes('spreadsheet') || fileType.includes('excel')) {
      return <FileIcon className="h-6 w-6 text-green-700" />;
    } else if (fileType.includes('document') || fileType.includes('word')) {
      return <FileIcon className="h-6 w-6 text-blue-700" />;
    } else {
      return <FileIcon className="h-6 w-6 text-gray-500" />;
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP');
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">関連ファイル</h3>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          ファイルをアップロード
        </button>
      </div>
      
      {sortedFiles.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <p className="text-sm text-gray-500">
            取引先に関連するファイルはまだありません
          </p>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            アップロードする
          </button>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
          {sortedFiles.map((file) => (
            <li key={file.id} className="flex items-center py-4 pl-4 pr-6">
              <div className="flex-shrink-0">
                {getFileIcon(file.fileType)}
              </div>
              <div className="ml-4 flex-1">
                <h4 className="text-sm font-medium text-gray-900">
                  {file.fileName}
                </h4>
                <p className="text-xs text-gray-500">
                  アップロード日: {formatDate(file.uploadedAt)}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <Link
                  href={file.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  表示
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {/* File Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setIsUploadModalOpen(false)}
            ></div>
            
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      ファイルをアップロード
                    </h3>
                    <div className="mt-4">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          ファイルを選択
                        </label>
                        <input
                          type="file"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          ファイルの説明（任意）
                        </label>
                        <textarea
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          placeholder="ファイルの説明を入力してください"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  アップロード
                </button>
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}