import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import STATUS from "../common/status";

const CollectorApprovalWithEmail = ({ onClose, collecData, fetchData }) => {
  const [data, setData] = useState({ ...collecData });
  const [emailData, setEmailData] = useState({
    email: collecData?.email,
    firstName: collecData?.fname,
    subject: "",
    message: "",
  });
  const [allPackage, setAllPackage] = useState([]);

  useEffect(() => {
    const fetchAllPackage = async () => {
      try {
        const response = await fetch(SummaryApi.allPackage.url);
        const dataResponse = await response.json();
        setAllPackage(dataResponse?.data || []);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      }
    };
    fetchAllPackage();
  }, []);

  const handleStatusChange = (e) => {
    const { value } = e.target;
    const userName = data?.name || "Collector";
  
    let updatedRole = data.role;
  
    if (value === "Approved") {
      updatedRole = "COLLECTOR";
    } else if (value === "Denied") {
      updatedRole = "GENERAL";
    }
  
    setData((prev) => ({ ...prev, status: value, role: updatedRole }));
  
    const pkg = allPackage.find((pkg) =>
      pkg.title.toLowerCase().includes(value.toLowerCase())
    );
  
    setEmailData((prev) => ({
      ...prev,
      subject:  pkg?.titlen ||
      (value === "Approved"
        ? `${userName}, An Update on Your Collector Request`
        : `${userName}, An Update on Your Collector Request Is Approved`),
      message:
        pkg?.description ||
        (value === "Approved"
          ? `Dear ${userName},\n\nWe are pleased to inform you that your request has been approved. You are now officially part of our collector network. Welcome aboard!\n\nBest regards,\nThe Ecobin Team`
          : `Dear ${userName},\n\nThank you for your interest. After review, your request has not been approved.\n\nKind regards,\nThe Ecobin Team`),
    }));
  };
  

  const handleEmailInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Update Collector status
      const updateRes = await fetch(SummaryApi.updateCollector.url, {
        method: SummaryApi.updateCollector.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const updateData = await updateRes.json();

      // 2. Send Email
      const emailRes = await fetch(SummaryApi.send_email_message.url, {
        method: SummaryApi.send_email_message.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(emailData),
      });
      const emailResult = await emailRes.json();

      // 3. Store Email
      const storeRes = await fetch(SummaryApi.store_email.url, {
        method: SummaryApi.store_email.method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(emailData),
      });
      const storeResult = await storeRes.json();

      if (updateData.success && emailResult.success && storeResult.success) {
        toast.success("Request updated and email sent successfully.");
        onClose();
        fetchData();
      } else {
        toast.error("Something went wrong during the process.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 pt-12 pl-80 w-full h-full z-10 flex justify-center items-center bg-blue-200 bg-opacity-70">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-xl font-semibold">Collector Request Approval</h2>
          <button onClick={onClose} className="text-red-500 hover:scale-110">
            <IoMdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* STATUS SELECTOR */}
          <div>
            <label className="block font-medium">Status</label>
            <select
              name="status"
              value={data.status}
              onChange={handleStatusChange}
              className="w-full p-2 border rounded bg-slate-100"
            >
              {Object.values(STATUS).map((s) => (
                <option value={s} key={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* DISPLAY BASIC INFO */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Location</label>
              <input
                value={data.location}
                readOnly
                className="w-full p-2 border bg-gray-100 rounded"
              />
              
            </div>
            <div>
              <label className="block text-sm font-medium">Location</label>
              <input
                value={data.role}
                readOnly
                className="w-full p-2 border bg-gray-100 rounded"
              />
              
            </div>
            <div>
              <label className="block text-sm font-medium">Work Area</label>
              <input
                value={data.workarea}
                readOnly
                className="w-full p-2 border bg-gray-100 rounded"
              />
            </div>
          </div>

          {/* IMAGE DISPLAY */}
          <div className="grid grid-cols-3 gap-4">
            {data.fnic && (
              <img
                src={data.fnic}
                alt="Front NIC"
                className="h-32 rounded-lg border"
              />
            )}
            {data.bnic && (
              <img
                src={data.bnic}
                alt="Back NIC"
                className="h-32 rounded-lg border"
              />
            )}
            {data.vehicle && (
              <img
                src={data.vehicle}
                alt="Vehicle"
                className="h-32 rounded-lg border"
              />
            )}
          </div>

          {/* EMAIL COMPOSING */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">
              Send Email Notification
            </h3>
            <input
              type="text"
              name="subject"
              value={emailData.subject}
              onChange={handleEmailInputChange}
              placeholder="Subject"
              className="w-full mb-2 p-2 border rounded"
              required
            />
            <textarea
              name="message"
              value={emailData.message}
              onChange={handleEmailInputChange}
              placeholder="Email message"
              rows={7}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
            >
              Save & Send Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollectorApprovalWithEmail;
