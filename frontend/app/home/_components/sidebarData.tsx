import SidebarWrapper from './sidebarWrapper';
import { fetchSidebarData } from '@/app/api/getSidebarData';
import { SidebarItemData } from './sidebar';

export default async function SidebarData() {
  const sidebarData = await fetchSidebarData();
  return <SidebarWrapper sidebarData={sidebarData} />;
}