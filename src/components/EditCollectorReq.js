import React, { useState, useEffect } from "react";
import { X, Mail, Check, Camera, Truck, FileText } from "lucide-react";
import SummaryApi from "../common";
import STATUS from "../common/status";
import { toast } from "react-toastify";

const CollectorApprovalWithEmail = ({ onClose, collecData, fetchData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ ...collecData });
  const [emailData, setEmailData] = useState({
    email: collecData?.email,
    firstName: collecData?.fname,
    subject: "",
    message: "",
  });
  const [allPackage, setAllPackage] = useState([]);
  const [activeTab, setActiveTab] = useState("details");

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

  useEffect(() => {
    // Initialize email template based on current status
    handleStatusChange({ target: { value: data.status || "Pending" } });
  }, [allPackage]);

  const handleStatusChange = (e) => {
    const { value } = e.target;
    const userName = data?.fname || "Collector";

    let updatedRole = data.role;

    if (value === "Approved") {
      updatedRole = "COLLECTOR";
    } else if (value === "Denied") {
      updatedRole = "GENERAL";
    }

    setData((prev) => ({ ...prev, status: value, role: updatedRole }));

    const pkg = allPackage.find((pkg) =>
      pkg.title?.toLowerCase().includes(value.toLowerCase())
    );

    setEmailData((prev) => ({
      ...prev,
      subject:
        pkg?.title ||
        (value === "Approved"
          ? `${userName}, Your Collector Request Has Been Approved`
          : `${userName}, An Update on Your Collector Request`),
      message:
        pkg?.description ||
        (value === "Approved"
          ? `Dear ${userName},\n\nWe are pleased to inform you that your request has been approved. You are now officially part of our collector network. Welcome aboard!\n\nBest regards,\nThe Ecobin Team`
          : `Dear ${userName},\n\nThank you for your interest. After review, your request has not been approved at this time.\n\nKind regards,\nThe Ecobin Team`),
    }));
  };

  const handleEmailInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
        // Use toast from the original component
        toast.success("Request updated and email sent successfully.");
        onClose();
        fetchData();
      } else {
        toast.error("Something went wrong during the process.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const StatusBadge = ({ status }) => {
    const getStatusColor = () => {
      switch (status) {
        case "Approved":
          return "bg-green-100 text-green-800";
        case "Denied":
          return "bg-red-100 text-red-800";
        case "Pending":
          return "bg-yellow-100 text-yellow-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900  bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-gray-50 border-b">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Collector Request Approval
            </h2>
            <StatusBadge status={data.status || "Pending"} />
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button
              type="button"
              className={`px-4 py-2 font-medium ${
                activeTab === "details"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("details")}
            >
              <div className="flex items-center gap-2">
                <FileText size={16} />
                <span>Request Details</span>
              </div>
            </button>
            <button
              type="button"
              className={`px-4 py-2 font-medium ${
                activeTab === "email"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("email")}
            >
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>Email Notification</span>
              </div>
            </button>
            <button
              type="button"
              className={`px-4 py-2 font-medium ${
                activeTab === "documents"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("documents")}
            >
              <div className="flex items-center gap-2">
                <Camera size={16} />
                <span>Documents</span>
              </div>
            </button>
          </div>

          {activeTab === "details" && (
            <div className="space-y-6">
              {/* Status selector with modern styling */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div className="relative">
                  <select
                    name="status"
                    value={data.status || "Pending"}
                    onChange={handleStatusChange}
                    className="w-full p-3 pr-10 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
                  >
                    {Object.values(STATUS).map((s) => (
                      <option value={s} key={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Collector information cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-700 mb-3">
                    Personal Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Name</span>
                      <span className="text-sm font-medium">
                        {data.fname} {data.lname}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Email</span>
                      <span className="text-sm font-medium">{data.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Phone</span>
                      <span className="text-sm font-medium">
                        {data.phone || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-700 mb-3">
                    Work Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Location</span>
                      <span className="text-sm font-medium">
                        {data.location || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Work Area</span>
                      <span className="text-sm font-medium">
                        {data.workarea || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Role</span>
                      <span className="text-sm font-medium">
                        {data.role || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "email" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient
                </label>
                <input
                  type="email"
                  value={emailData.email}
                  onChange={handleEmailInputChange}
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={emailData.subject}
                  onChange={handleEmailInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={emailData.message}
                  onChange={handleEmailInputChange}
                  rows={8}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-6">
              <h3 className="font-medium text-gray-700">
                Verification Documents
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-3 py-2 border-b">
                    <div className="flex items-center gap-2">
                      <Camera size={16} className="text-gray-500" />
                      <span className="text-sm font-medium">Front NIC</span>
                    </div>
                  </div>
                  {data.fnic ? (
                    <div className="p-2">
                      <img
                        src={data.fnic}
                        alt="Front NIC"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="h-40 flex items-center justify-center text-gray-400">
                      <span>No image</span>
                    </div>
                  )}
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-3 py-2 border-b">
                    <div className="flex items-center gap-2">
                      <Camera size={16} className="text-gray-500" />
                      <span className="text-sm font-medium">Back NIC</span>
                    </div>
                  </div>
                  {data.bnic ? (
                    <div className="p-2">
                      <img
                        src={data.bnic}
                        alt="Back NIC"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="h-40 flex items-center justify-center text-gray-400">
                      <span>No image</span>
                    </div>
                  )}
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-3 py-2 border-b">
                    <div className="flex items-center gap-2">
                      <Truck size={16} className="text-gray-500" />
                      <span className="text-sm font-medium">Vehicle</span>
                    </div>
                  </div>
                  {data.vehicle ? (
                    <div className="p-2">
                      <img
                        src={data.vehicle}
                        alt="Vehicle"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="h-40 flex items-center justify-center text-gray-400">
                      <span>No image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Footer with action buttons */}
          <div className="flex justify-end space-x-3 mt-8 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Check size={16} />
                  <span>Save & Send Email</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectorApprovalWithEmail;
