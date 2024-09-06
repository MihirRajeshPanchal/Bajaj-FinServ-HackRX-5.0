"use client"
import Sidebar from './_components/Sidebar';
import { Navbar } from './_components/Navbar';
import sidebarData from './sidebarData.json';
import React from 'react';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="h-full">
            <Navbar />
            <div className="grid grid-cols-[0_1fr] lg:grid-cols-[auto_1fr] transition-[grid-template-columns] duration-500 relative">
                <Sidebar data={sidebarData.sidebarData} />
                {children}
            </div>
        </main>
    );
}

export default HomeLayout;