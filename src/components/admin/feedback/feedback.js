import React, { useEffect, useState } from "react";
import summaryApi from "../../../common";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { MdCancel } from "react-icons/md";
import Feeedbackdeleteform from "./feedbackdeleteform";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchDate, setSearchDate] = useState("");
  const [deletefeedback, setDeleteFeedback] = useState(null);

  const fetchFeedbacks = async () => {
    try {
      const fetchData = await fetch(summaryApi.get_feedback.url, {
        method: summaryApi.get_feedback.method,
        credentials: "include",
      });
      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setFeedbacks(dataResponse.data);
      }
      if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSearchDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  const filteredFeedbacks = searchDate
    ? feedbacks.filter(
        (feedback) =>
          new Date(feedback.date).toISOString().split("T")[0] === searchDate
      )
    : feedbacks;

  const generateStars = (rating) => {
    return Array.from({ length: rating }, (_, i) => (
      <span key={i} className="text-yellow-400">
        ★
      </span>
    ));
  };

  return (
    <section className="py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <div className=" rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              User Feedback
            </h2>
            <div className="mt-4 md:mt-0">
              <label
                htmlFor="search-date"
                className="mr-2 text-sm font-medium text-gray-600"
              >
                Search by Date:
              </label>
              <input
                type="date"
                id="search-date"
                value={searchDate}
                onChange={handleSearchDateChange}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300 text-sm"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="dark:text-white">
                <tr>
                  <th className="px-6 py-3 font-semibold">Name</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold">Suggestions</th>
                  <th className="px-6 py-3 font-semibold">Rating</th>
                  <th className="px-6 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="dark:text-white divide-y divide-gray-200">
                {filteredFeedbacks.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No feedbacks found for the selected date.
                    </td>
                  </tr>
                ) : (
                  filteredFeedbacks.map((data, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {moment(data?.createdAt).format("LL")}
                      </td>
                      <td className="px-6 py-4 whitespace-pre-wrap max-w-xs">
                        {data?.suggestions}
                      </td>
                      <td className="px-6 py-4">
                        {generateStars(data?.rating)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setDeleteFeedback(data)}
                          title="Delete"
                          className="text-red-500 hover:text-red-700 text-xl"
                        >
                          <MdCancel />
                        </button>
                        {deletefeedback && (
                          <Feeedbackdeleteform
                            onClose={() => setDeleteFeedback(null)}
                            packageData={deletefeedback}
                            fetchData={fetchFeedbacks}
                          />
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackList;
