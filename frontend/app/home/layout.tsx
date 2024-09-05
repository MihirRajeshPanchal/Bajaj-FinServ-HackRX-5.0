"use client"
import Sidebar from './_components/Sidebar';
import { Navbar } from './_components/Navbar';
import sidebarData from './sidebarData.json';
import React from 'react';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="h-full">
            <Navbar />
            <div className="grid grid-cols-[0rem_1fr] lg:grid-cols-[20rem_1fr] transition-[grid-template-columns] duration-500">
                <Sidebar data={sidebarData.sidebarData} />
                {children}
            </div>
        </main>
    );
}

export default HomeLayout;