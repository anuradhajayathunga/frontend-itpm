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

  const fetchUser = async () => {
    try {
      const response = await fetch(summaryApi.AllUsers.url);
      const dataResponse = await response.json();

      console.log("user data:", dataResponse);

      const users = dataResponse?.data || [];
      setAllUser(users);

      // // Calculate counts
      // const activePackages = packages.filter(
      //   (pack) => pack?.status === STATUS.Active
      // );
      // const inactivePackages = packages.filter(
      //   (pack) => pack?.status !== STATUS.Active
      // );

      // setActivePackageCount(activePackages.length);
      // setInactivePackageCount(inactivePackages.length);
    } catch (error) {
      console.error("Error fetching all packages:", error);
    }
  };

  const fetchcollector = async () => {
    try {
      const response = await fetch(summaryApi.allCollector.url);
      const dataResponse = await response.json();

      console.log("collector data:", dataResponse);

      const collector = dataResponse?.data || [];
      setAllCollector(collector);

      // // Calculate counts
      // const activePackages = packages.filter(
      //   (pack) => pack?.status === STATUS.Active
      // );
      // const inactivePackages = packages.filter(
      //   (pack) => pack?.status !== STATUS.Active
      // );

      // setActivePackageCount(activePackages.length);
      // setInactivePackageCount(inactivePackages.length);
    } catch (error) {
      console.error("Error fetching all packages:", error);
    }
  };
  const fetchfeedback = async () => {
    try {
      const response = await fetch(summaryApi.getAllFeedbacks.url);
      const dataResponse = await response.json();

      console.log("feedback data:", dataResponse);

      const feedback = dataResponse?.data;
      setAllFeedback(feedback);

      // // Calculate counts
      // const activePackages = packages.filter(
      //   (pack) => pack?.status === STATUS.Active
      // );
      // const inactivePackages = packages.filter(
      //   (pack) => pack?.status !== STATUS.Active
      // );

      // setActivePackageCount(activePackages.length);
      // setInactivePackageCount(inactivePackages.length);
    } catch (error) {
      console.error("Error fetching all packages:", error);
    }
  };
  const fetchEmails = async () => {
    try {
      const response = await fetch(summaryApi.get_send_message.url);
      const dataResponse = await response.json();

      console.log("email data:", dataResponse);

      const emails = dataResponse?.data;
      setAllEmail(emails);

      // // Calculate counts
      // const activePackages = packages.filter(
      //   (pack) => pack?.status === STATUS.Active
      // );
      // const inactivePackages = packages.filter(
      //   (pack) => pack?.status !== STATUS.Active
      // );

      // setActivePackageCount(activePackages.length);
      // setInactivePackageCount(inactivePackages.length);
    } catch (error) {
      console.error("Error fetching all packages:", error);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchcollector();
  }, []);

  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"users"}
          subtitle={allUser.length}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Collector"}
          subtitle={allCollector.length}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"NO of Feedback"}
          subtitle={allFeedback.length}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Your Emails"}
          subtitle={allEmail.length}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"New Tasks"}
          subtitle={"145"}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Projects"}
          subtitle={"$2433"}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 ">
        {/* <TotalSpent /> */}
        <PieChartCard />
        <DailyTraffic />
        {/* <WeeklyRevenue /> */}
      </div>

      {/* Tables & Charts */}

      {/* <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2"> */}
      {/* Check Table */}
      <div className="mt-5">
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
      </div>

      {/* Traffic chart & Pie Chart */}

      {/* <div className="mt-5 grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
        <DailyTraffic />
      </div> */}

      {/* Complex Table , Task & Calendar */}

      {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}

      {/* Task chart & Calendar */}

      <div className="mt-5 grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
        <TaskCard />
        <div className="grid grid-cols-1 rounded-[20px]">
          <MiniCalendar />
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Dashboard;
