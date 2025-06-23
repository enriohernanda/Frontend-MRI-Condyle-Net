'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-[#578FCA] dark:bg-[#161B22] h-full w-16 lg:w-60 p-4 flex flex-col gap-2 items-center lg:items-start">
      <SidebarItem href="/upload" icon="/upload.png" text="Upload Data" pathname={pathname} />
      <SidebarItem href="/history" icon="/analytics.png" text="History" pathname={pathname} />
      <SidebarItem href="/models" icon="/models.png" text="About Models" pathname={pathname} />
    </aside>
  );
};

interface SidebarItemProps {
  href: string;
  icon: string;
  text: string;
  pathname: string;
}

const SidebarItem = ({ href, icon, text, pathname }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-4 p-2 rounded-md transition-all ${
        pathname === href
          ? 'bg-[#3674B5] border-sky-400 border-2 dark:border-[#2AB7C6] dark:bg-[#30363D] text-white dark:text-gray-200'
          : 'text-white'
      } justify-center lg:justify-start w-full`}
    >
      <Image src={icon} alt={text} width={24} height={24} />
      <span className="hidden lg:block">{text}</span>
    </Link>
  );
};

export default Sidebar;
