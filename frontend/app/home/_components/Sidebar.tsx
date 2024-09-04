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

export type SidebarItemData = {
  name: string;
  icon: string;
  children?: SidebarItemData[];
}

export type SidebarItemProps = {
  item: SidebarItemData;
}

const SidebarItem: React.FC<SidebarItemProps>  = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = item.children && item.children.length > 0;

  return (
    <li>
      <Link href={hasChildren ? '#' : `/home/${item.name}`}
        className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${hasChildren ? 'font-bold' : 'text-sm'}`}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        title={item.name}
      >
        {hasChildren && (
          <span className="inline-flex items-center justify-center ">
            {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </span>
        )}
        {
          hasChildren ? <Folder className="w-5 h-5" /> : <File className="w-5 h-5" />

        }
        <span className="flex-1 ms-3 whitespace-nowrap">{item.name}</span>
      </Link>
      {isOpen && hasChildren && (
        <ul className="pl-4 mt-2 space-y-2">
          {item.children?.map((child, index) => (
            <SidebarItem key={index} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export type SidebarProps = {
  data: SidebarItemData[];
}

const Sidebar: React.FC<SidebarProps> = ({ data }) => {
  return (
   
    <aside id="logo-sidebar" className="fixed bg-[hsl(210,3%,23%)] top-0 left-0 z-40 w-80 h-screen pt-20 transition-transform -translate-x-full border-r border-gray-200 lg:translate-x-0 dark:border-gray-700 " aria-label="Sidebar">
      <div className="scrollbar | h-full px-3 pb-4 overflow-y-auto">
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
