import Banner from "./components/Banner";
//import tableDataTopCreators from "./variables/tableDataTopCreators.json";
//import { tableColumnsTopCreators } from "./variables/tableColumnsTopCreators";
import HistoryCard from "./components/HistoryCard";
//import TopCreatorTable from "./components/TableTopCreators";
import Card from "../../card";
import SummaryApi from "../../../common";
import { useEffect, useState } from "react";
import { TbMessage } from "react-icons/tb";
import SendEmailMessage from "./components/SendEmailMessage";
import moment from "moment";
const Email = () => {
  const [allEmail, setAllEmail] = useState([]);
  const [openSendMessage, setOpenSendMessage] = useState(false);
  const fetchAllEmails = async () => {
    try {
      const response = await fetch(SummaryApi.get_emails.url);
      const dataResponse = await response.json();
      console.log("email data", dataResponse);
      setAllEmail(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching all emails:", error);
    }
  };

  useEffect(() => {
    fetchAllEmails();
  }, []);
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        {/* NFt Banner */}
        <div className="mb-4 mt-3 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <HistoryCard />
        </div>
      </div>

      {/* right side section */}
      {/* <Banner /> */}
      <div>
        <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
          <Card extra={"mt-3 !z-5 overflow-hidden"}>
            {/* Top Creator Header */}
            <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-4 pt-4 pb-[20px] shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none">
              <h4 className="text-lg font-bold text-navy-700 dark:text-white">
                Send Message
              </h4>
              {/* <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-lime-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
              See all
            </button> */}
            </div>
            {/* Top Creator Heading */}
            <div className="w-full overflow-x-scroll px-4 md:overflow-x-hidden">
              <table className="w-full min-w-[500px] overflow-x-scroll">
                <thead>
                  <tr>
                    {/* <th>
                    <div className="flex items-center justify-between pt-4 pb-2 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                      Name
                    </div>
                  </th> */}
                    <th>
                      <div className="flex items-center justify-between pt-4 pb-2 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                        Email
                      </div>
                    </th>
                    {/* <th>
                    <div className="flex items-center justify-between pt-4 pb-2 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                      Phone
                    </div>
                  </th> */}
                    <th>
                      <div className="flex items-center justify-between pt-4 pb-2 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                        Send Date
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className="px-4">
                  {allEmail.map((data, index) => (
                    <tr>
                      {/* <td>
                      <p className="text-md font-medium text-navy-600 dark:text-white">
                        {data?.firstName}
                      </p>
                    </td> */}
                      <td>
                        <p className="text-md font-medium text-navy-600  dark:text-white">
                          {data?.email}
                        </p>
                      </td>
                      {/* <td>
                        <p className="text-md font-medium text-navy-600  dark:text-white">
                          {data?.phone}
                        </p>
                      </td> */}
                      <td>
                        <p className="text-md font-medium text-navy-600  dark:text-white">
                          {moment(data?.createdAt).format("LL")}
                        </p>
                      </td>
                      <td>
                        <p
                          className="text-2xl font-bold   text-navy-400 hover:scale-110 hover:text-cyan-500 dark:text-white "
                          onClick={() => setOpenSendMessage(data)}
                        >
                          <TbMessage />
                        </p>
                      </td>
                    </tr>
                  ))}
                  {openSendMessage && (
                    <SendEmailMessage
                      onClose={() => setOpenSendMessage(null)}
                      emailData={openSendMessage}
                      fetchData={fetchAllEmails}
                    />
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Email;
