import React, { useEffect, useState } from "react";
import Nft2 from "../../../../assets/main-bg.png";
import Card from "../../../card";
import SummaryApi from "../../../../common";
import moment from "moment";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Import icons

const HistoryCard = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5;

  const fetchAllMessages = async () => {
    try {
      const response = await fetch(SummaryApi.get_send_message.url);
      const dataResponse = await response.json();
      console.log("email data", dataResponse);
      setAllMessages(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching all messages:", error);
    }
  };

  useEffect(() => {
    fetchAllMessages();
  }, []);

  const totalPages = Math.ceil(allMessages.length / messagesPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const getCurrentMessages = () => {
    const start = (currentPage - 1) * messagesPerPage;
    const end = start + messagesPerPage;
    return allMessages.slice(start, end);
  };

  return (
    <Card extra={"h-[600px] w-full"}>
      {/* Header */}
      <div className="flex items-center justify-between rounded-t-3xl p-3">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          Emails
        </div>
        <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
          {/* See all */}
        </button>
      </div>

      {/* Scrollable Message List */}
      <div className="h-[500px]">
        {getCurrentMessages().map((data, index) => (
          <div
            key={index}
            className="flex w-full items-start justify-between bg-white px-3 py-[20px] hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700 border-b dark:border-navy-700"
          >
            <div className="flex items-center gap-4">
              <div className="h-6 w-6 flex items-center justify-center">
                <img
                  className="h-full w-full rounded-full mb-6"
                  src={Nft2}
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <h5 className="text-sm font-bold text-navy-700 dark:text-white capitalize">
                  {data?.firstName}
                </h5>
                <p className="mt-0 text-sm font-normal text-gray-600 overflow-ellipsis">
                  {data?.email}
                </p>
                <div className="ml-0 flex items-center text-sm font-bold text-navy-700 dark:text-white">
                  {data?.subject}
                </div>
              </div>
            </div>

            <div className="mt-0 flex flex-col items-end text-navy-700 dark:text-white">
              <div className="ml-2 mt-4 flex items-center text-sm font-normal text-gray-600 dark:text-white">
                <p>{moment(data?.createdAt).startOf("hour").fromNow()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center p-3 border-t dark:border-navy-700">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 px-3 py-1 rounded-md transition ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "bg-brand-500 text-white hover:bg-brand-600"
            }`}
          >
            <FiChevronLeft size={18} />
            {/* <span>Previous</span> */}
          </button>

          <span className="text-sm text-navy-700 dark:text-white px-5">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 px-3 py-1 rounded-md transition ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "bg-brand-500 text-white hover:bg-brand-600"
            }`}
          >
            {/* <span>Next</span> */}
            <FiChevronRight size={18} />
          </button>
        </div>
      )}
    </Card>
  );
};

export default HistoryCard;