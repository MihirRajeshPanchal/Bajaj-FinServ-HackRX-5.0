import { Suspense } from 'react';
import Sidebar from './Sidebar';
import { SidebarItemData } from './Sidebar';

async function fetchSidebarData(): Promise<SidebarItemData[]> {
    const res = await fetch("http://127.0.0.1:8000/frontend_json");
    if (!res.ok) {
      throw new Error('Failed to fetch sidebar data');
    }
    const data = await res.json();
    return data.sidebarData; 
  }

export default async function SidebarData() {
    const sidebarData = await fetchSidebarData();
    return (
    <Suspense fallback={<div>Loading...</div>}>
     <Sidebar data={sidebarData} />
    </Suspense>

  );
}