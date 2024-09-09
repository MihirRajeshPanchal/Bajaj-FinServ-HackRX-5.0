import { SidebarItemData } from "../home/_components/sidebar";

export async function fetchSidebarData(): Promise<SidebarItemData[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/frontend_sidebar_json`);
    if (!res.ok) {
      throw new Error('Failed to fetch sidebar data');
    }
    const data = await res.json();
    return data.sidebarData; 
  }