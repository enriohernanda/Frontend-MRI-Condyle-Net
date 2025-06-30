'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavbarMain from '@/components/main/NavbarMain';
import Sidebar from '@/components/main/Sidebar';
import { ReactNode, useState } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Hanya jalan di client
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      } else {
        setMounted(true); // render layout setelah cek selesai
      }
    }
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-[#EBEBEB] dark:bg-[#0D1117]">
      <NavbarMain />
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
