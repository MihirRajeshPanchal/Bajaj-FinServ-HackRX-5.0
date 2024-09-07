"use client"
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolder,
  faFileMedical,
  faFilePdf,
  faFileLines,
  faFileContract,
  faFileWord,
  faFilePen,
  faFileShield
} from '@fortawesome/free-solid-svg-icons';
import { ChevronDown, Folder, ChevronRight, File } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type SidebarItemData = {
  name: string;
  icon?: string;
  children?: SidebarItemData[];
}

export type SidebarItemProps = {
  item: SidebarItemData;
  path?: string[];
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, path = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  const hasChildren = item.children && item.children.length > 0;
  const currentPath = [...path, item.name.toLowerCase().replace(/\s+/g, '-')];
  const href = hasChildren ? '#' : `/home/${currentPath.join('/')}`;
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <li className={`${!hasChildren ? "fileNoChild | grid gap-1 grid-cols-[2px_1fr]" : "mt-2"}`}>
      {!hasChildren && <div className={`bg-accent ${!isActive && "bg-opacity-50"} transition-colors`}></div>}
      <Link href={href}
        className={`flex items-center gap-1.5 p-2 text-gray-300 rounded-lg !bg-opacity-30 hover:bg-accent group ${isActive && "bg-accent"} ${hasChildren ? 'font-bold' : 'text-sm m-0.5'}`}
        onClick={(e) => {
          if (hasChildren) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        title={item.name}
      >
        {hasChildren && (
          <span className="inline-flex items-center justify-center">
            {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </span>
        )}
        {hasChildren ? <Folder className="h-full p-0.5" /> : <File className="h-5 p-0.5 pe-0" />}
        <span className="flex-1 whitespace-nowrap">{item.name}</span>
      </Link>
      {hasChildren &&
        (
          <div className={`grid ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} transition-[grid-template-rows] duration-500`}>
            {isOpen && (
              <ul className="pl-4 smt-1 overflow-hidden">
                {item.children?.map((child, index) => (
                  <SidebarItem key={index} item={child} path={currentPath} />
                ))}
              </ul>
            )}
          </div>)}
    </li>
  );
};

export type SidebarProps = {
  data: SidebarItemData[];
}

const Sidebar: React.FC<SidebarProps> = ({ data }) => {
  return (
    <aside id="logo-sidebar" className="~bg-[hsl(260,100%,93%)] pt-14 h-screen overflow-hidden shadow-md sticky top-0" aria-label="Sidebar">
      <div className="scrollbar | h-full overflow-y-auto p-3">
        <Link href="/home">Home</Link>
        <ul className="space-y-2 font-medium">
          {data.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
