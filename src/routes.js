import React from "react";

// Admin Imports
import MainDashboard from "./views/admin/default";
// import NFTMarketplace from "./views/admin/marketplace";
import Profile from "./views/admin/profile";
import DataTables from "./views/admin/tables";
// import RTLDefault from "views/rtl/default";

// Auth Imports
// import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdAlternateEmail,
  MdBarChart,
  MdPerson,
  MdOutlineFeedback,
} from "react-icons/md";
import { SiOpencollective } from "react-icons/si";

// import AdminUserTable from "./components/admin/user/AdminUserTable";
import AdminCollectorTable from "./components/admin/collector/AdminCollectorTable";
import Users from "./components/admin/user/Users";
import Email from "./components/admin/email/email";
import ReviewDashboard from "./pages/ReviewDashboard";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
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
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Users",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "user",
    component: <Users />,
  },
  {
    name: "Collector",
    layout: "/admin",
    icon: <SiOpencollective className="h-6 w-6" />,
    path: "collector",
    component: <AdminCollectorTable />,
  },
  {
    name: "Email",
    layout: "/admin",
    icon: <MdAlternateEmail className="h-6 w-6" />,
    path: "email",
    component: <Email />,
  },
  {
    name: "Feedback",
    layout: "/admin",
    icon: <MdOutlineFeedback className="h-6 w-6" />,
    path: "feedback-dashboard",
    component: <ReviewDashboard />,
  },
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
