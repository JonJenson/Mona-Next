import React from "react";
import "boxicons/css/boxicons.min.css";
import Link from "next/link";


interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="flex items-center h-[15vh] w-full bg-softYellow/50 relative z-50 text-lg">
      <div className="flex justify-between items-center w-full px-3  md:px-6">
        <div className="flex items-center">
          <div
            className="flex justify-center items-center w-8 h-8 bg-black rounded-full cursor-pointer"
            onClick={toggleSidebar}
          >
            <i className="bx bx-menu text-white text-lg"></i>
          </div>
        </div>
        <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 h-full flex items-center">
          <img
            src="/logo-new.png"
            alt="MONA"
            className="max-h-full w-96 object-contain"
          />
        </Link>
        <div className="flex items-center">
          <div className="hidden md:flex justify-center items-center w-8 h-8 bg-black rounded-full mr-3 ">
            <i className="bx bx-search text-white "></i>
          </div>
          <Link href="/checkout" className="flex justify-center items-center w-8 h-8 bg-black rounded-full">
            <i className="bx bx-cart text-white "></i>
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
