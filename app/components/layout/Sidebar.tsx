'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FolderIcon, UserIcon, RadioIcon, CalendarIcon, FileIcon, BriefcaseIcon } from '@/app/components/icons';

const navigation = [
  { name: 'ダッシュボード', href: '/dashboard', icon: CalendarIcon },
  { name: '日付から探す', href: '/dates', icon: FolderIcon },
  { name: '取引先から探す', href: '/clients', icon: UserIcon },
  { name: '代理店から探す', href: '/agencies', icon: BriefcaseIcon },
  { name: '番組名から探す', href: '/programs', icon: RadioIcon },
  { name: 'ナビゲーター', href: '/navigators', icon: UserIcon },
  { name: 'ファイル管理', href: '/files', icon: FileIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:block md:w-64">
      <div className="flex h-full min-h-screen flex-col border-r border-gray-200 bg-white">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <nav className="mt-5 flex-1 space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}