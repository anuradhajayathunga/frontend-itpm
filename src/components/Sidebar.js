import { Link } from "react-router-dom";

const Sidebar = () => {

  return (
    <aside className=" hidden w-64 overflow-y-auto bg-white md:block flex-shrink-0">
      <div className="py-2 text-gray-500 ">
        <Link to="/" className="ml-7 -mb-4 ">
        {/* <img
              className="logo z-50 w-[90px] md:w-[101px] lg:w-[122px] xl:w-[138px]"
              src="/assets/Logo/Logo.svg"
              alt="Company logo"
            /> */}
            <div className="ml-10 text-[40px] font-bold text-dark">
            EcoBin

            </div>
        </Link>
        <ul className="mt-28">
          {[
            { name: "Dashboard", href: "dashboard" },
            { name: "Resident", href: "all-user" },
            { name: "Collecter", href: "collector-message" },
            { name: "Feedback", href: "feedback" },
            {/*  { name: "Buttons", href: "/buttons" },
            { name: "Modals", href: "/modals" },
            { name: "Tables", href: "/tables" } */}
          ].map((item, index) => (
            <li key={index} className="relative px-6 py-3">
              <Link to={item.href} className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800">
                <span className="ml-4">{item.name}</span>
              </Link>
            </li>
          ))}
          {/* <li className="relative px-6 py-3">
            <button className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800" onClick={() => setIsPagesMenuOpen(!isPagesMenuOpen)}>
              <span className="inline-flex items-center">
                <span className="ml-4">Pages</span>
              </span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {isPagesMenuOpen && (
              <ul className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50">
                {[
                  { name: "Login", href: "/pages/login" },
                  { name: "Create Account", href: "/pages/create-account" },
                  { name: "Forgot Password", href: "/pages/forgot-password" },
                  { name: "404", href: "/pages/404" },
                  { name: "Blank", href: "/pages/blank" }
                ].map((page, index) => (
                  <li key={index} className="px-2 py-1 transition-colors duration-150 hover:text-gray-800">
                    <Link to={page.href} className="w-full">{page.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li> */}
        </ul>
        <div className="px-6 my-6">
          <button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-c-green-600 border border-transparent rounded-lg active:bg-c-green-600 hover:bg-c-green-700 focus:outline-none focus:shadow-outline-purple">
            Create account
            <span className="ml-2" aria-hidden="true">+</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
