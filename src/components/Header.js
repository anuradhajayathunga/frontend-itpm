import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/mainRoles";
import Profile from "./Profile";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (menuDisplay) {
      setFadeOut(false);
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setMenuDisplay(false), 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [menuDisplay]);

  const handleLogout = async () => {
    try {
      const fetchData = await fetch(SummaryApi.UserLogout.url, {
        method: SummaryApi.UserLogout.method,
        credentials: "include",
      });

      const data = await fetchData.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
      } else if (data.error) {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <div className="wrapper mx-auto text-gray-900 font-medium">
      <header className="h-auto w-full fixed top-0 left-0 bg-white/10 p-2 backdrop-blur-xl z-50  py-[15px] first-letter:lg:py-[26px]">
        <div className="px-[12px] md:px-[36px] xl:px-0 mt-0 flex items-center justify-between mx-auto relative max-w-[1320px]">
          <Link to={"/"} className="flex">
            <img
              className="logo z-50 w-[90px] md:w-[100px] lg:w-[120px] xl:w-[138px]"
              src="/assets/Logo/Logo.svg"
              alt="Company logo"
            />
          </Link>

          <nav className="z-50 absolute hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:block">
            <ul className="navbar flex flex-col justify-center font-chivo gap-[34px] lg:flex-row">
              <li className="flex items-center group">
                <Link
                  aria-current="page"
                  to={"/store"}
                  className="router-link-active router-link-exact-active hover:text-c-green-300 text-base font-inter menu-link lg:text-lg mr-[7px]"
                >
                  Store
                </Link>
              </li>
              <li className="flex items-center group">
                <Link
                  aria-current="page"
                  to={"/locatebin"}
                  className="router-link-active router-link-exact-active hover:text-c-green-300 text-base font-inter menu-link lg:text-lg mr-[7px]"
                >
                  Locate bins
                </Link>
              </li>
              {user?.role !== "COLLECTOR" ? (
                <li className="flex items-center group">
                  <Link
                    to="/become-a-collector"
                    aria-current="page"
                    className="router-link-active router-link-exact-active hover:text-c-green-300 text-base font-inter menu-link lg:text-lg mr-[7px]"
                  >
                    Become a collector
                  </Link>
                </li>
              ) : (
                <li className="flex items-center group">
                  <Link
                    to="/collector-dashboard"
                    aria-current="page"
                    className="router-link-active router-link-exact-active hover:text-c-green-300 text-base font-inter menu-link lg:text-lg mr-[7px]"
                  >
                    Collector
                  </Link>
                </li>
              )}

              {/* <li className="flex items-center group">
                <Link
                  aria-current="page"
                  to={"/aboutus"}
                  className="router-link-active router-link-exact-active hover:text-c-green-300 text-base font-inter menu-link lg:text-lg mr-[7px]"
                >
                  About us
                </Link>
              </li> */}
              <li className="flex items-center group">
                <Link
                  to={"/feedbackand-complaint"}
                  aria-current="page"
                  className="router-link-active router-link-exact-active hover:text-c-green-300 text-base font-inter menu-link lg:text-lg mr-[7px]"
                >
                  Report an Issue
                </Link>
              </li>
            </ul>
          </nav>
          <div className="hidden xl:flex items-center space-x-5">
            {user?._id && (
              <div className="relative">
                {/* User profile icon - Click to open dropdown */}
                <div
                  onClick={() => setMenuDisplay(true)}
                  className="flex items-center z-10  text-c-blur-100 hover:text-c-green-300 cursor-pointer transition-all duration-300"
                >
                  {user?.avatar ? (
                    <img
                      src={user?.avatar}
                      alt="avatar"
                      className="w-9 h-9 rounded-full mx-auto mb-3 object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-c-green-300 text-white flex items-center justify-center mx-auto  text-sm font-bold uppercase">
                      {user?.name?.charAt(0) || "?"}
                    </div>
                  )}{" "}
                </div>

                {/* Dropdown Menu with smooth hide effect */}
                {menuDisplay && (
                  <div
                    className={`absolute border border-stroke bg-white shadow-md top-full z-50 py-2 grid menu-shadow -translate-x-2 translate-y-2 transition-all duration-300 rounded-[4px] min-w-[10rem] md:min-w-[12rem] lg:min-w-[14rem] xl:min-w-[16rem] ${
                      fadeOut ? "opacity-0 scale-95" : "opacity-100 scale-100"
                    }`}
                  >
                    <div className="font-chivo transition-all duration-200 py-[8px] px-[22px] flex items-center">
                      <div className="space-y-1 text-base font-light">
                        👋 Hey,
                        {user?.name && (
                          <span className="capitalize mb-2 text-gray-900 ">
                            {user.name}
                          </span>
                        )}
                        <br />
                        {user?.role && (
                          <span className="lowercase ml-2 text-[14px] leading-none text-gray-6">
                            {user.role}
                          </span>
                        )}
                      </div>
                    </div>
                    <hr className="border-[#E8E8E8] pt-3" />

                    <div
                      onClick={() => {
                        setOpen(true);
                        setMenuDisplay(false); // Close dropdown when opening profile
                      }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 cursor-pointer"
                    >
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 18 18"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9 .938a3.562 3.562 0 100 7.124A3.562 3.562 0 009 .938zM6.562 4.5a2.437 2.437 0 114.875 0 2.437 2.437 0 01-4.875 0zM9 9.188c-1.735 0-3.334.394-4.518 1.06-1.167.657-2.045 1.652-2.045 2.877v.076c0 .872-.001 1.965.958 2.747.472.384 1.132.657 2.025.838.894.181 2.06.276 3.58.276s2.685-.095 3.58-.276c.893-.18 1.553-.454 2.025-.838.96-.782.958-1.875.957-2.747v-.076c0-1.226-.877-2.22-2.044-2.877-1.184-.666-2.783-1.06-4.518-1.06zm-5.438 3.937c0-.639.467-1.331 1.471-1.896.987-.555 2.388-.916 3.967-.916 1.579 0 2.98.36 3.967.916 1.004.565 1.47 1.258 1.47 1.896 0 .98-.03 1.533-.542 1.95-.278.227-.743.448-1.538.609-.793.16-1.876.254-3.357.254-1.48 0-2.564-.094-3.357-.255-.795-.16-1.26-.381-1.538-.608-.512-.417-.543-.97-.543-1.95z"
                        />
                      </svg>
                      <div className="mr-auto text-[16px] font-light">
                        View profile
                      </div>
                    </div>

                    {user?.role === ROLE.ADMIN ||
                    user?.role === ROLE.COLLECTOR ? (
                      <div className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2">
                        {user?.role === ROLE.ADMIN ? (
                          <svg
                            width={20}
                            height={20}
                            viewBox="0 0 18 18"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9 6.188a2.813 2.813 0 100 5.625 2.813 2.813 0 000-5.626zM7.312 9a1.688 1.688 0 113.376 0 1.688 1.688 0 01-3.376 0z"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.981.938c-.333 0-.612 0-.84.015a2.117 2.117 0 00-.68.142c-.506.209-.907.61-1.117 1.116-.108.263-.138.54-.15.841a.65.65 0 01-.311.55.65.65 0 01-.631-.005c-.267-.141-.522-.254-.804-.291a2.063 2.063 0 00-1.525.408c-.187.144-.33.32-.462.519-.128.19-.267.43-.434.72l-.019.032c-.166.289-.306.53-.406.735a2.117 2.117 0 00-.218.66c-.071.543.076 1.091.409 1.525.173.226.398.39.654.55A.65.65 0 012.766 9a.65.65 0 01-.32.544c-.255.16-.48.325-.653.55-.333.435-.48.983-.409 1.526.03.233.113.445.218.66.1.205.24.446.406.735l.02.033c.166.288.305.53.433.72.133.197.275.374.462.518.434.333.983.48 1.525.408.282-.037.537-.15.804-.29a.65.65 0 01.63-.005.65.65 0 01.313.549c.011.3.04.578.15.841.209.506.61.907 1.116 1.117.217.09.442.125.68.14.228.017.507.017.84.017h.038c.333 0 .612 0 .84-.016.238-.016.463-.051.68-.142.506-.209.907-.61 1.117-1.116.108-.263.138-.54.15-.841a.65.65 0 01.311-.55.65.65 0 01.631.005c.267.141.522.254.804.291a2.062 2.062 0 001.525-.408c.187-.144.33-.32.462-.519.128-.19.267-.43.434-.72l.019-.032c.166-.289.305-.53.406-.736.105-.214.187-.426.218-.66a2.062 2.062 0 00-.409-1.524c-.173-.226-.398-.39-.654-.55A.65.65 0 0115.234 9a.65.65 0 01.32-.544c.255-.16.48-.325.653-.55.333-.435.48-.983.409-1.526a2.117 2.117 0 00-.218-.66c-.1-.205-.24-.446-.406-.735l-.02-.033c-.166-.288-.305-.53-.433-.72a2.117 2.117 0 00-.462-.518 2.062 2.062 0 00-1.525-.408c-.282.037-.537.15-.804.29a.65.65 0 01-.63.005.65.65 0 01-.313-.549c-.011-.3-.04-.578-.15-.841a2.063 2.063 0 00-1.116-1.116 2.118 2.118 0 00-.68-.142c-.228-.016-.507-.016-.84-.015H8.98zm-1.09 1.196c.058-.024.146-.046.327-.059.185-.012.425-.013.782-.013.357 0 .597 0 .782.013.181.013.269.035.327.059.23.095.412.278.507.507.03.073.055.186.065.453.022.595.329 1.167.874 1.481a1.775 1.775 0 001.719.016c.237-.125.347-.16.425-.17a.938.938 0 01.693.186c.05.038.113.103.214.253.103.155.223.362.402.671.179.31.298.517.38.684.08.163.104.25.113.312a.937.937 0 01-.186.693c-.048.062-.133.14-.36.283A1.775 1.775 0 0014.109 9c0 .629.342 1.18.846 1.497.227.143.312.22.36.283a.938.938 0 01.186.693c-.009.062-.033.15-.113.312-.082.167-.201.374-.38.684-.179.309-.299.516-.402.67-.101.151-.165.216-.214.254a.937.937 0 01-.693.186c-.078-.01-.188-.045-.425-.17a1.775 1.775 0 00-1.72.016 1.775 1.775 0 00-.873 1.48c-.01.268-.035.381-.065.454a.937.937 0 01-.507.507 1.034 1.034 0 01-.327.059c-.185.012-.425.012-.782.012-.357 0-.597 0-.782-.012a1.033 1.033 0 01-.327-.059.937.937 0 01-.507-.507c-.03-.073-.055-.186-.065-.454a1.775 1.775 0 00-.874-1.48 1.775 1.775 0 00-1.719-.016c-.237.125-.347.16-.425.17a.937.937 0 01-.693-.186 1.034 1.034 0 01-.214-.253 12.818 12.818 0 01-.402-.671c-.179-.31-.298-.517-.38-.684a1.035 1.035 0 01-.113-.312.937.937 0 01.186-.693c.048-.063.133-.14.36-.283.504-.316.846-.868.846-1.497 0-.629-.342-1.18-.846-1.497-.227-.143-.312-.22-.36-.283a.937.937 0 01-.186-.693c.009-.062.033-.15.113-.312.082-.167.201-.375.38-.684.179-.31.299-.517.402-.67.101-.151.165-.216.214-.254a.938.938 0 01.693-.186c.078.01.188.045.425.17a1.775 1.775 0 001.72-.016c.544-.314.85-.886.873-1.48.01-.268.035-.381.065-.454a.937.937 0 01.507-.507z"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-6 h-6 text-gray-800"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}

                        <Link
                          to={
                            user?.role === ROLE.ADMIN
                              ? "/admin/default"
                              : "/collector-dashboard"
                          }
                          className="mr-auto text-[16px] font-light"
                        >
                          {user?.role === ROLE.ADMIN
                            ? "Admin Panel"
                            : "Collector Panel"}
                        </Link>
                      </div>
                    ) : null}

                    <hr className="border-[#E8E8E8]" />

                    <div className="p-2 text-base text-[#4B5563]">
                      <button
                        className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-c-green-300 hover:text-white"
                        onClick={handleLogout}
                      >
                        <svg
                          width={20}
                          height={20}
                          viewBox="0 0 18 18"
                          fill="currentColor"
                        >
                          <g clipPath="url(#clip0_7095_11691)">
                            <path d="M11.209.938c-1.026 0-1.852 0-2.503.087-.675.09-1.243.285-1.695.736-.393.394-.592.878-.697 1.446-.101.553-.12 1.229-.125 2.04a.562.562 0 101.125.006c.005-.82.026-1.401.107-1.842.078-.426.203-.672.386-.854.207-.208.499-.343 1.05-.417.566-.076 1.317-.078 2.393-.078H12c1.077 0 1.828.002 2.394.078.55.074.842.21 1.05.417.207.207.342.499.416 1.05.077.566.078 1.316.078 2.393v6c0 1.077-.002 1.827-.078 2.394-.074.55-.209.842-.417 1.05-.207.207-.499.342-1.049.416-.566.076-1.317.078-2.394.078h-.75c-1.076 0-1.827-.002-2.394-.078-.55-.074-.842-.21-1.05-.417-.182-.182-.307-.428-.385-.854-.081-.44-.102-1.022-.107-1.842a.563.563 0 00-1.125.006c.004.811.024 1.487.125 2.04.105.568.304 1.052.697 1.446.452.451 1.02.645 1.695.736.65.087 1.477.087 2.503.087h.832c1.026 0 1.853 0 2.503-.087.675-.09 1.243-.285 1.695-.736.451-.452.645-1.02.736-1.695.088-.65.088-1.477.088-2.503V5.96c0-1.026 0-1.853-.088-2.503-.09-.675-.285-1.243-.736-1.695-.452-.451-1.02-.645-1.695-.736-.65-.088-1.477-.088-2.503-.087h-.832z" />
                            <path d="M11.25 8.438a.562.562 0 110 1.124H3.02l1.471 1.26a.563.563 0 01-.732.855l-2.625-2.25a.562.562 0 010-.854l2.625-2.25a.562.562 0 11.732.854l-1.47 1.26h8.229z" />
                          </g>
                          <defs>
                            <clipPath id="clip0_7095_11691">
                              <rect width={18} height={18} rx={5} />
                            </clipPath>
                          </defs>
                        </svg>

                        <span className="text-base font-medium">Log out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div>
              {/* cart icon */}
              <div className="router-link-active router-link-exact-active flex items-center z-10 relative transition-all duration-200 pr-[10px] text-3xl text-c-blur-100 hover:text-c-green-300 cursor-pointer">
                <FaCartShopping />
                <div className="bg-c-green-300 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-1">
                  <p className="text-sm">0</p>
                </div>
              </div>
            </div>

            {!user?._id && (
              <button type="button">
                <Link
                  to="/login"
                  aria-current="page"
                  className="router-link-active router-link-exact-active flex items-center z-10 relative transition-all duration-200 group px-[22px] py-[15px] lg:px-[32px] lg:py-[22px] rounded-[50px] bg-gray-100 text-gray-900 hover:bg-c-green-300"
                >
                  <span className="block text-inherit w-full h-full rounded-[50px] text-lg font-bold font-chivo group-hover:text-white">
                    Log in
                  </span>
                  <div className="ml-[7px] text-base text-gray-900  group-hover:text-white">
                    <FaArrowRightLong />
                  </div>
                </Link>
              </button>
            )}
          </div>
        </div>
      </header>

      <div
        className="header-spacer"
        style={{
          height:
            "calc(15px + 15px + 50px)" /* Adjust based on your header height */,
          marginBottom: "1rem",
        }}
      ></div>

      {/* Render Profile modal conditionally */}
      {open && <Profile open={open} setOpen={setOpen} />}
    </div>
  );
};

export default Header;
