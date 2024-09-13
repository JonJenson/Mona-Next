import React from 'react';
import Link from 'next/link';
import { SidebarData } from '@/utils/data';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {


  return (
    <>
      {isOpen && (
        <div
          className='fixed inset-0 z-[999] bg-black/70 transition-transform duration-800 ease-in-out'
          onClick={toggleSidebar}
        ></div>
      )}
      <aside
        className={`fixed top-0 h-full transition-all duration-800 ease-in-out ${
          isOpen
            ? 'w-[20%] min-w-[250px] translate-x-0 opacity-100'
            : 'w-0 overflow-hidden translate-x-[-100%] opacity-0'
        } z-[1000] overflow-y-auto bg-gradient-to-b from-skyBlue to-skyBlue p-4 font-cormorant text-xl font-medium text-black rounded-br-xl rounded-tr-xl shadow-lg`}
      >
        <div
          className='m-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black'
          onClick={toggleSidebar}
        >
          <i className='bx bx-x text-lg text-white'></i>
        </div>
        <ul className='list-none pt-[13vh]'>
          {SidebarData.map((item, index) => (
            <li
              key={index}
              className='flex cursor-pointer items-center rounded-full px-4 py-2 hover:bg-softYellow/50'
            >
              <Link
                href={item.href}
                onClick={toggleSidebar}
                className='flex w-full items-center'
              >
                <i className={`bx ${item.icon}`}></i>
                <span className='ml-2'>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
