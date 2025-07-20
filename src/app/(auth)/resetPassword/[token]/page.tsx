'use client';

import { useParams } from 'next/navigation';
import LeftBgLight from '@/components/LeftBgLight';
import LogoBanner from '@/components/LogoBanner';
import ResetPasswordPage from '@/components/resetPassPage/ResetPasswordPage';

export default function Page() {
  const params = useParams();
  const token = params.token as string;

  return (
    <div className="flex justify-center flex-col md:flex-row min-h-screen w-full 
                bg-[#3674B5] 
                dark:bg-[#0D1117] lg:bg-none">
      <div className="absolute top-0 w-full z-20">
        <LogoBanner />
      </div>
      <LeftBgLight />
      <ResetPasswordPage token={token} />
    </div>
  );
}
