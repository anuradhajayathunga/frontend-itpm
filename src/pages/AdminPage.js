import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { MdNotifications } from "react-icons/md";
import { useSelector } from "react-redux";
import ROLE from "../common/role";

const AdminPage = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleNotifications = () =>
    setIsNotificationsOpen(!isNotificationsOpen);
  const toggleProfileMenu = () => setIsProfileOpen(!isProfileOpen);

  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex h-screen bg-gray-50 ">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <header className="z-10 py-4 bg-white">
          <div className="container flex items-center justify-between h-full px-6 mx-auto text-c-green-600">
            {/* Mobile Hamburger */}
            <button
              className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            {/* Search Input */}
            <div className="flex justify-center flex-1 lg:mr-32">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  className="w-full pl-10 pr-4 py-2 text-md text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-c-green-900 focus:ring-1 focus:ring-c-green-900 transition-shadow duration-200"
                  type="text"
                  placeholder="Search for projects..."
                />
              </div>
            </div>

            {/* Icons & Menus */}
            <ul className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <li>
                <button
                  className="rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-c-green-900 transition-all duration-200"
                  aria-label="Toggle color mode"
                >
                  <svg
                    className="w-7 h-7 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                </button>
              </li>

              {/* Notifications */}
              <li className="relative">
                <button
                  onClick={toggleNotifications}
                  className="relative rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-c-green-900 transition-all duration-200"
                  aria-label="Notifications"
                >
                  <MdNotifications className="w-7 h-7 text-gray-600 hover:text-gray-800 transition-colors duration-200" />
                  {/* <svg
                    className="w-5 h-5 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z"></path>
                  </svg> */}

                  <span className="absolute top-0 right-0 inline-block w-3 h-3 transform -translate-x-2 translate-y-1 bg-c-green-600 rounded-full"></span>
                </button>
                {isNotificationsOpen && (
                  <ul className="absolute right-0 w-56 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <li className="px-4 py-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-100">
                      No new notifications
                    </li>
                  </ul>
                )}
              </li>

              {/* Profile Menu */}
              <li className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="rounded-full focus:outline-none focus:ring-2 focus:ring-c-green-900 transition-all duration-200"
                  aria-label="Account"
                >
                  <img
                    className="w-10 h-10 rounded-full object-cover border-2 border-c-green-600 hover:border-c-green-900 transition-colors duration-200"
                    src="../assets/avatars/avatar7.png"
                    alt="User avatar"
                  />
                </button>
                {isProfileOpen && (
                  <ul className="absolute right-0 w-56 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <li className="px-4 py-2 text-md text-gray-700 cursor-pointer hover:bg-gray-100">
                      Profile
                    </li>
                    <li className="px-4 py-2 text-md text-gray-700 cursor-pointer hover:bg-gray-100">
                      Settings
                    </li>
                    <li className="px-4 py-2 text-md text-red-600 cursor-pointer hover:bg-gray-100">
                      Log out
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </header>
        <main className="h-full ">
          <div className="container px-10 pt-10 mx-auto grid">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
