'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import navigatorsData from '@/app/lib/data/navigators.json';

interface ProgramNavigatorProps {
  navigatorName: string;
}

interface Navigator {
  navigatorId: string;
  name: string;
  nameReading: string;
  profileImage: string;
  programs: string[];
  bio: string;
  socialMedia: Record<string, string>;
  active: boolean;
}

export default function ProgramNavigator({ navigatorName }: ProgramNavigatorProps) {
  const [navigator, setNavigator] = useState<Navigator | null>(null);
  
  useEffect(() => {
    // 名前に基づいてナビゲーター情報を探す
    if (navigatorName === 'ノンストップミュージック') {
      // 特別なケース：ノンストップミュージックはパーソナリティーがいない
      return;
    }
    
    // カンマで区切られた複数のナビゲーター名がある場合は最初の一人を取得
    const firstNavigatorName = navigatorName.split(',')[0].trim();
    
    const foundNavigator = navigatorsData.find(nav => nav.name === firstNavigatorName);
    if (foundNavigator) {
      setNavigator(foundNavigator);
    }
  }, [navigatorName]);

  if (navigatorName === 'ノンストップミュージック') {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-medium mb-4">ノンストップミュージック</h3>
        <p className="text-gray-700 mb-6">
          この番組はナビゲーターを介さずに音楽を連続して放送するプログラムです。
          クロスFMが厳選した楽曲をお楽しみください。
        </p>
      </div>
    );
  }
  
  if (!navigator) {
    return (
      <div className="text-center p-6">
        <p className="text-gray-500">
          ナビゲーター情報が見つかりませんでした。
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="bg-gray-100 p-6 rounded-lg aspect-square flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
                {/* プロフィール画像がある場合は表示、ない場合はプレースホルダー */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  プロフィール画像
                </div>
              </div>
              <h3 className="text-xl font-medium">{navigator.name}</h3>
              <p className="text-gray-500 text-sm">{navigator.nameReading}</p>
            </div>
          </div>
          
          {Object.keys(navigator.socialMedia).length > 0 && (
            <div className="mt-4 p-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-2">SNS</h4>
              <div className="space-y-2">
                {Object.entries(navigator.socialMedia).map(([platform, account]) => (
                  <p key={platform} className="text-sm">
                    <span className="font-medium">{platform}: </span>
                    <span className="text-blue-600">{account}</span>
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold mb-4">プロフィール</h2>
          <p className="text-gray-700 mb-6 whitespace-pre-line">
            {navigator.bio}
          </p>
          
          <h3 className="text-lg font-medium mt-8 mb-4">担当番組</h3>
          <ul className="space-y-2">
            {navigator.programs.map((program, index) => (
              <li key={index} className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                <span>{program}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}