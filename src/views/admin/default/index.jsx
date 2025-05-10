import MiniCalendar from "../../../components/calendar/MiniCalendar";
import WeeklyRevenue from "./components/WeeklyRevenue";
import TotalSpent from "./components/TotalSpent";
import PieChartCard from "./components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";
import Widget from "../../../components/widget/Widget";
import CheckTable from "./components/CheckTable";
// import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "./components/DailyTraffic";
import TaskCard from "./components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import { useSelector } from "react-redux";
// import tableDataComplex from "./variables/tableDataComplex.json";
import summaryApi from "../../../common";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [allUser, setAllUser] = useState([]);
  const [allCollector, setAllCollector] = useState([]);
  const [allFeedback, setAllFeedback] = useState([]);
  const [allEmail, setAllEmail] = useState([]);
  const [allReq, setAllReq] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await fetch(summaryApi.AllUsers.url);
      const dataResponse = await response.json();
      console.log("user data:", dataResponse);
      const users = dataResponse?.data || [];
      setAllUser(users);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  const fetchCollector = async () => {
    try {
      const response = await fetch(summaryApi.allCollector.url);
      const dataResponse = await response.json();
      console.log("collector data:", dataResponse);
      const collector = dataResponse?.data || [];
      setAllCollector(collector);
    } catch (error) {
      console.error("Error fetching all collectors:", error);
    }
  };

  const fetchFeedback = async () => {
    try {
      const response = await fetch(summaryApi.getAllFeedbacks.url, {
        method: summaryApi.getAllFeedbacks.method,
      });
      const dataResponse = await response.json();
      console.log("feedback data:", dataResponse);
      const feedback = dataResponse?.data || [];
      setAllFeedback(feedback);
    } catch (error) {
      console.error("Error fetching all feedbacks:", error);
    }
  };

  const fetchEmails = async () => {
    try {
      const response = await fetch(summaryApi.get_send_message.url);
      const dataResponse = await response.json();
      console.log("email data:", dataResponse);
      const emails = dataResponse?.data || [];
      setAllEmail(emails);
    } catch (error) {
      console.error("Error fetching all emails:", error);
    }
  };

  const fetchCollectReq = async () => {
    try {
      const response = await fetch(summaryApi.get_all_waste.url);
      const dataResponse = await response.json();
      console.log("Req data:", dataResponse);
      const requests = dataResponse?.data || [];
      setAllReq(requests);
    } catch (error) {
      console.error("Error fetching all collection requests:", error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        // Use Promise.all to fetch all data concurrently
        await Promise.all([
          fetchUser(),
          fetchCollector(),
          fetchFeedback(),
          fetchEmails(),
          fetchCollectReq(),
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div>
      {/* Card widget */}
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Users"}
          subtitle={isLoading ? "Loading..." : allUser.length}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Collectors"}
          subtitle={isLoading ? "Loading..." : allCollector.length}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"No. of Feedback"}
          subtitle={isLoading ? "Loading..." : allFeedback.length}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Your Emails"}
          subtitle={isLoading ? "Loading..." : allEmail.length}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"New Tasks"}
          subtitle={"30"}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Collection Req"}
          subtitle={isLoading ? "Loading..." : allReq.length}
        />
      </div>

      {/* Charts */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 ">
        <PieChartCard />
        <DailyTraffic />
      </div>

      {/* Tables & Charts */}
      <div className="mt-5">
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
      </div>

      {/* Task chart & Calendar */}
      <div className="mt-5 grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
        <TaskCard />
        <div className="grid grid-cols-1 rounded-[20px]">
          <MiniCalendar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
