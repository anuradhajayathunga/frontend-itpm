/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import SidebarCard from "./components/SidebarCard";
import routes from "../../routes.js";

const Sidebar = ({ open, onClose }) => {
  return (
    <div
      className={`duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white  pb-10 shadow-lg transition-all dark:bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        className="absolute top-4 right-4 block cursor-pointer text-gray-600 dark:text-white xl:hidden"
        onClick={onClose}
      >
        <HiX size={20} />
      </button>

      <div className="mx-6 mt-8 flex items-center">
        <div className="flex flex-col text-gray-800 dark:text-white">
          <h1 className="text-3xl font-bold tracking-tight">ECOBIN</h1>
          <p className="text-gray-500 text-sm font-light tracking-wider dark:text-gray-400">
            SOLUTION
          </p>
        </div>
      </div>
      <div class="mt-14 mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1 ">
        <Links routes={routes} />
      </ul>

      {/* Free Horizon Card */}
      <div className="flex justify-center px-5">
        <SidebarCard />
      </div>

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
