import React from "react";

// Admin Imports
import MainDashboard from "./views/admin/default";
import Offers from "./pages/AllPackages"
import Users from "./pages/AllUser";
// import NFTMarketplace from "views/admin/marketplace";
// import Profile from "views/admin/profile";
// import DataTables from "views/admin/tables";
// import RTLDefault from "views/rtl/default";

// Auth Imports
// import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  //MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdAssignment,
  MdOutlineDashboard,
 // MdLock,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdOutlineDashboard  className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Users",
    layout: "/admin",
    path: "users-detail",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Users />,
    secondary: true,
  },
   {
     name: "Offers",
     layout: "/admin",
     path: "offers-detail",
     icon: <MdOutlineShoppingCart className="h-6 w-6" />,
     component: <Offers />,
     secondary: true,
   },
   {
    name: "Email Marketing",
    layout: "/admin",
    path: "email-marketing",
    icon: <MdBarChart className="h-6 w-6" />,
    // component: <Email />,
    secondary: true,
  },
  {
    name: "Feedbacks",
    layout: "/admin",
    path: "all-feedback",
    icon: <MdAssignment  className="h-6 w-6" />,
    // component: <Feedback />,
    secondary: true,
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "nft-marketplace",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: "data-tables",
  //   component: <DataTables />,
  // },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "profile",
  //   icon: <MdPerson className="h-6 w-6" />,
  //   component: <Profile />,
  // },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "sign-in",
  //   icon: <MdLock className="h-6 w-6" />,
  //   component: <SignIn />,
  // },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "rtl",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <RTLDefault />,
  // },
];
export default routes;
