"use client"
import { Navbar } from './_components/Navbar';
import React from 'react';
import SidebarData from './_components/sidebarData';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="h-full">
            <Navbar />
            <div className="grid grid-cols-[0rem_1fr] lg:grid-cols-[20rem_1fr] transition-[grid-template-columns] duration-500">
                <SidebarData />
                {children}
            </div>
        </main>
    );
}

export default HomeLayout;