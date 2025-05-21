'use client';

import { useState } from 'react';
import { FileIcon, PlusIcon } from '@/app/components/icons';

interface FileDetailsProps {
  folderPath: string;
}

interface FileItem {
  id: string;
  fileName: string;
  fileType: string;
  uploadedAt: string;
  fileSize: string;
  content?: string;
}

export default function FileDetails({ folderPath }: FileDetailsProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  
  // In a real app, we would fetch the files from an API
  // For now, we'll use mock data
  const files: FileItem[] = [
    {
      id: '1',
      fileName: '予約詳細.txt',
      fileType: 'text/plain',
      uploadedAt: '2023-05-20T10:00:00Z',
      fileSize: '1.2 KB',
      content: `放送枠予約詳細
-------------------------------
取引先: サンプル株式会社
担当者: 山田太郎
連絡先: 03-1234-5678
キャンペーン名: 夏の新商品プロモーション
備考: パーソナリティによる紹介を希望。効果測定レポートが必要。`,
    },
    {
      id: '2',
      fileName: 'メール連絡.txt',
      fileType: 'text/plain',
      uploadedAt: '2023-05-20T11:30:00Z',
      fileSize: '0.8 KB',
      content: `From: yamada@sample.co.jp
To: radio@example.com
Subject: 放送内容の確認について

担当者様

先日予約させていただいた6月5日の放送内容について確認させていただきたいです。
パーソナリティの方に商品の特徴をいくつか紹介していただきたいのですが、
原稿の確認は必要でしょうか？

よろしくお願いいたします。

山田太郎
サンプル株式会社 マーケティング部`,
    },
    {
      id: '3',
      fileName: '打ち合わせメモ.txt',
      fileType: 'text/plain',
      uploadedAt: '2023-05-21T09:15:00Z',
      fileSize: '0.5 KB',
      content: `電話打ち合わせメモ（2023/5/21）
-------------------------------
・CM原稿は5月25日までに提出
・パーソナリティ紹介は30秒程度
・キャンペーンコード「SUMMER2023」を必ず入れること
・効果測定のため、放送後2週間のアクセス数を報告予定`,
    },
    {
      id: '4',
      fileName: 'CM原稿.pdf',
      fileType: 'application/pdf',
      uploadedAt: '2023-05-25T14:00:00Z',
      fileSize: '250 KB',
    },
  ];
  
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
    return date.toLocaleDateString('ja-JP') + ' ' + 
           date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
  };
  
  // View file
  const viewFile = (file: FileItem) => {
    setSelectedFile(file);
  };
  
  // Close file viewer
  const closeFileViewer = () => {
    setSelectedFile(null);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">フォルダ内のファイル</h2>
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
            フォルダ内にはまだファイルがありません
          </p>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            アップロードする
          </button>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200">
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
                  {formatDate(file.uploadedAt)} · {file.fileSize}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  onClick={() => viewFile(file)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  表示
                </button>
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
      
      {/* File Viewer Modal */}
      {selectedFile && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={closeFileViewer}
            ></div>
            
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 w-full sm:mt-0 sm:text-left">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        {selectedFile.fileName}
                      </h3>
                      <button
                        onClick={closeFileViewer}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">閉じる</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-4">
                      {selectedFile.fileType === 'text/plain' && selectedFile.content ? (
                        <pre className="whitespace-pre-wrap rounded-md bg-gray-50 p-4 font-sans text-sm text-gray-700">
                          {selectedFile.content}
                        </pre>
                      ) : (
                        <div className="rounded-md bg-gray-50 p-8 text-center">
                          <p className="text-gray-500">
                            このファイルタイプ ({selectedFile.fileType}) のプレビューは利用できません。
                          </p>
                          <button
                            className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500"
                          >
                            ダウンロード
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={closeFileViewer}
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}