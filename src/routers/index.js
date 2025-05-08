import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";
import BecomeACollector from "../pages/BecomeACollector";
import Admin from "../pages/AdminPage";
import AdminDashboard from "../pages/AdminDashboard";
import AdminUserTable from "../pages/AdminUserTable";
import AdminCollectorTable from "../pages/AdminCollectorTable";
import Store from "../pages/Store";
import Profile from "../pages/Profile";
import Collector from "../pages/Collector";
<<<<<<< HEAD
import FeedbackForm from "../pages/FeedbackForm";
import ComplaintForm from "../pages/ComplaintForm";
import ReviewDashboard from "../pages/ReviewDashboard";
import FeedbackandComplaint from "../pages/FeedbackandComplaint";

=======
>>>>>>> main
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
        path: "profile",
        element: <Profile/>,
      },
      {
        path: "become-a-collector",
        element: <BecomeACollector />,
      },
      {
        path: "collector-dashboard",
        element: <Collector/>,
      },
      {
        path: "store",
        element: <Store/>,
      },
<<<<<<< HEAD
      {
        path: "feedbackandcomplaint",
        element: <FeedbackandComplaint/>,
      },
      {
        path: "feedbackform",
        element: <FeedbackForm/>,
      },
      {
        path: "complaintform",
        element: <ComplaintForm/>,
      },
      
=======

>>>>>>> main


            // admin panel
            {
              path: "admin",
              element: <Admin />,
              children: [
                 {
                   path: "dashboard",
                   element: <AdminDashboard />,
                 },
                 {
                   path: "all-user",
                   element: <AdminUserTable />,
                 },
                 {
                   path: "collector-message",
                   element: <AdminCollectorTable/>,
                 },
<<<<<<< HEAD
                 {
                  path: "review-dashboard",
                  element: <ReviewDashboard/>,
                },
=======
>>>>>>> main
              ],
            },
    ],
    
  },
]);

export default router;
