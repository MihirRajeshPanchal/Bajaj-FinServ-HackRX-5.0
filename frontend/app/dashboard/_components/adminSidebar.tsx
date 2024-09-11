"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Video, BarChart2, Menu } from 'lucide-react';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: 'Generate Video', icon: Video, path: '/dashboard' },
    { name: 'Analytics', icon: BarChart2, path: '/dashboard/analytics' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <button
        className={`fixed top-[4.5rem] left-2 z-20 translate-y-0.5 lg:hidden hover:bg-background p-2 ${isSidebarOpen && 'adminSidebarOpen'}`}
        onClick={toggleSidebar}
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className={`pt-14 fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition duration-200 ease-in-out flex flex-col h-screen w-64 bg-white border-r ~pt-14 z-10`}>
        <div className="flex items-center justify-center py-6 ps-9 lg:ps-0 border-b">
          <span className="text-xl font-semibold">Admin Dashboard</span>
        </div>
        <nav className="flex-grow">
          <ul className="py-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link href={item.path}>
                  <span className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                    pathname === item.path ? 'bg-gray-100' : ''
                  }`}>
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;