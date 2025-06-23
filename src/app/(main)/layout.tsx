'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavbarMain from '@/components/main/NavbarMain';
import Sidebar from '@/components/main/Sidebar';
import { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-[#EBEBEB] dark:bg-[#0D1117]">
      {/* Navbar */}
      <NavbarMain />

      {/* Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 text-black dark:text-white">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
