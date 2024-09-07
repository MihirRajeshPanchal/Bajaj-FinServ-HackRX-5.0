
import Sidebar from './sidebar';
import { SidebarItemData } from './sidebar';

async function fetchSidebarData(): Promise<SidebarItemData[]> {
    const res = await fetch("http://127.0.0.1:8000/frontend_sidebar_json", { cache: 'force-cache' });
    if (!res.ok) {
      throw new Error('Failed to fetch sidebar data');
    }
    const data = await res.json();
    return data.sidebarData; 
  }

export default async function SidebarData() {
    const sidebarData = await fetchSidebarData();
    return (
     <Sidebar data={sidebarData} />

  );
}