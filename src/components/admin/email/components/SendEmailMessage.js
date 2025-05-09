import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import SummaryApi from "../../../../common";
import { toast } from "react-toastify";

const SendEmailMessage = ({ onClose, emailData, fetchData }) => {
  const [data, setData] = useState({
    ...emailData,
    email: emailData?.email,
    firstName: emailData?.firstName,
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "subject") {
      // Find the selected package based on the title
      const selectedPackage = allPackage.find((packa) => packa.title === value);
      // Update the data with the selected package's description
      setData({
        ...data,
        [name]: value,
        message: selectedPackage ? selectedPackage.description : "",
      });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send email
      const emailResponse = await fetch(SummaryApi.send_email_message.url, {
        method: SummaryApi.send_email_message.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // Store email data in database
      const storeResponse = await fetch(SummaryApi.store_email.url, {
        method: SummaryApi.store_email.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const emailData = await emailResponse.json();
      const storeData = await storeResponse.json();

      if (storeData.success && emailData.success) {
        // &&
        toast.success("Email sent and stored successfully.");
        onClose();
        fetchData(); // If fetchData is a function to fetch updated data
      } else {
        toast.error("Failed to send email or store data.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  //select subject and message
  const [allPackage, setAllPackage] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(5).fill(null);

  const fetchAllPackage = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.allPackage.url);
      const dataResponse = await response.json();
      console.log("package data", dataResponse);
      setAllPackage(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching all packages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPackage();
  }, []);

  return (
    <div>
      <div className="fixed top-0 bottom-0 left-0 right-0 pt-12 pl-80 w-full h-full z-10 flex justify-center items-center bg-green-200 bg-opacity-70">
        <div className="text-gray-900  p-4 rounded w-full max-w-2xl h-full max-h-[90%] overflow-hidden">
          <div className="w-full max-w-md">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={handleSubmit}
            >
              <div className="flex justify-between items-center pb-2 -mr-5 -mt-4">
                <div
                  className="w-fit ml-auto text-2xl bg-red-500 hover:bg-red-600 hover:scale-110 aspect-square hover:text-white cursor-pointer"
                  onClick={onClose}
                >
                  <IoMdClose />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-navy-600 text-sm font-bold mb-2"
                  htmlFor="firstName"
                >
                  Name
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={data.firstName}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-navy-600 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  From:
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value="ecobin.solution@gmail.com"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-navy-600 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  To:
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  name="email"
                  value={data.email}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-navy-600 text-sm font-bold mb-2"
                  htmlFor="subject"
                >
                  Subject
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="subject"
                  type="text"
                  placeholder="Enter the subject here..."
                  name="subject"
                  value={data.subject}
                  onChange={handleInputChange}
                  required
                />
                {/* <select
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="subject"
                  name="subject"
                  placeholder="Enter the subject here..."
                  value={data.subject}
                  onChange={handleInputChange}
                  required
                >
                  <option value={""}>subject</option>

                  {
                    allPackage.map((el, index) => {
                      return (
                        <option value={el.title} key={el.title + index}>{el.title}</option>
                      )
                    })
                  }
                </select> */}
              </div>
              <div className="mb-4">
                <label
                  className="block text-navy-600 text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  id="message"
                  rows={5}
                  placeholder="Enter your message here..."
                  name="message"
                  value={data.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-navy-400 hover:bg-navy-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Send
                </button>
              </div>
            </form>
            <p className="text-center text-red-800 text-xs">
              © 2024 <Link to={"/admin/default"}>Ecobin Solution</Link> All
              rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEmailMessage;
