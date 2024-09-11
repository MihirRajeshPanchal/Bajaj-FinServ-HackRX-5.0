import React, { ReactNode } from 'react';
import Sidebar from './_components/adminSidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-full bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto px-8 pt-14">
        {children}
      </main>
    </div>
  );
};

export default Layout;