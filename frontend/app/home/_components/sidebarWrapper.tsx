'use client';
import { usePathname } from 'next/navigation';
import Sidebar from './sidebar';
import { SidebarItemData } from './sidebar';

export default function SidebarWrapper({ sidebarData }: { sidebarData: SidebarItemData[] }) {
  const pathname = usePathname();

  if (pathname.endsWith('/quiz')) return null;

  return <Sidebar data={sidebarData} />;
}