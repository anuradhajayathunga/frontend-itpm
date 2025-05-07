import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";
import BecomeACollector from "../pages/BecomeACollector";
import Admin from "../pages/AdminPage";
import Dashboard from "../views/admin/default/index";
import NFTMarketplace from "../views/admin/marketplace";
import Profile from "../views/admin/profile";
import DataTables from "../views/admin/tables";

import AdminUserTable from "../components/admin/user/AdminUserTable";
import AdminCollectorTable from "../components/admin/collector/AdminCollectorTable";
import Store from "../pages/Store";
import Collector from "../pages/Collector";
import Users from "../components/admin/user/Users";
import Email from "../components/admin/email/email";
import FeedbackForm from "../pages/FeedbackForm";
import Feedback from "../components/admin/feedback/feedback";
import LocateBin from "../pages/LocateBin";
import Aboutus from "../pages/Aboutus";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "become-a-collector",
        element: <BecomeACollector />,
      },
      {
        path: "collector-dashboard",
        element: <Collector />,
      },
      {
        path: "store",
        element: <Store />,
      },
      {
        path: "locatebin",
        element: <LocateBin />,
      },
      {
        path: "aboutus",
        element: <Aboutus />,
      },

      {
        path: "feedback/",
        element: <FeedbackForm />,
      },

      // admin panel
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            path: "default",
            element: <Dashboard />,
          },
          {
            path: "nft-marketplace",
            element: <NFTMarketplace />,
          },
          {
            path: "data-tables",
            element: <DataTables />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "user",
            element: <Users />,
          },
          {
            path: "collector",
            element: <AdminCollectorTable />,
          },
          {
            path: "email",
            element: <Email />,
          },
          {
            path: "feedbacks",
            element: <Feedback />,
          },
        ],
      },
    ],
  },
]);

export default router;
