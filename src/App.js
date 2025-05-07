import { Outlet } from "react-router-dom";
// import "./App.css";
//import Header from "./components/Header";
//import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import summaryApi from "./common";
import Context from './context';
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
function App() {

   const dispatch = useDispatch();

   const fetchUserDetails = useCallback(async () => {
    try {
      const dataResponse = await fetch(summaryApi.UserDetails.url, {
        method: summaryApi.UserDetails.method,
        credentials: "include",
      });
  
      const dataApi = await dataResponse.json();
      console.log("dataApi", dataApi);
  
      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [dispatch])

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]); // ✅ No ESLint warning now


  return (
    <Context.Provider value={{
      fetchUserDetails // User detail fetch function
    }}>
      <ToastContainer />
      {/* className='min-h-[calc(100vh-120vh)] pt-0' */}
      <main>  
        <Outlet />
      </main>
    </Context.Provider>
  );
}

export default App;
