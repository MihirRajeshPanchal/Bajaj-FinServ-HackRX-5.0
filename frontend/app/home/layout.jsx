"use client"
import Sidebar from './_components/Sidebar';
import { Navbar } from './_components/Navbar';
import sidebarData from './sidebarData.json';

const HomeLayout = ({ children }) => {
    return (
        <main className="h-full">
                <Sidebar data={sidebarData.sidebarData}/>
                    <div className="h-full flex-1">
                        <Navbar />
                        {children}
                    </div>
        </main>
    );
}

export default HomeLayout;