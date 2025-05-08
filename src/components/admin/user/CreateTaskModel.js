import React from "react";
import {
  FiX,
  FiCalendar,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiTrash2,
} from "react-icons/fi";
import { MdTitle } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";

const CreateTaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  collectorEmail,
}) => {
  if (!isOpen) return null;

  const wasteTypeIcons = {
    Plastic: <FiTrash2 className="text-blue-500" />,
    Glass: <FiTrash2 className="text-green-500" />,
    Metal: <FiTrash2 className="text-gray-500" />,
    Organic: <FiTrash2 className="text-amber-500" />,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass both the event and the collector email from the form
    onSubmit(e, formData.collectorEmail);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden transform transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center">
            <FiCalendar className="mr-2" /> Assign New Task
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-red-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-20"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Collector Information Section */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <MdTitle className="mr-1 text-blue-500" /> Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title || ""}
                onChange={onChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center mt-3">
                <MdOutlineDescription className="mr-1 text-blue-500" />{" "}
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description || ""}
                onChange={onChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Location Section */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FiMapPin className="mr-1 text-blue-500" /> City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city || ""}
                  onChange={onChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FiMapPin className="mr-1 text-blue-500" /> Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ""}
                  onChange={onChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  readOnly
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FiUser className="mr-1 text-blue-500" /> Collector Email
                </label>
                <input
                  type="email"
                  name="collectorEmail"
                  value={formData.collectorEmail || ""}
                  onChange={onChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FiMail className="mr-1 text-blue-500" /> User Email
                </label>
                <input
                  type="email"
                  name="uemail"
                  value={formData.uemail || ""}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <h3 className="text-lg font-medium text-gray-700 mb-3 border-b pb-2">
              Schedule Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FiCalendar className="mr-1 text-blue-500" /> Scheduled Date
                </label>
                <input
                  type="date"
                  name="scheduledDate"
                  value={formData.scheduledAt?.split("T")[0] || ""}
                  onChange={(e) => {
                    const date = e.target.value;
                    const time = formData.scheduledAt?.split("T")[1] || "00:00";
                    onChange({
                      target: { name: "scheduledAt", value: `${date}T${time}` },
                    });
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FiClock className="mr-1 text-blue-500" /> Scheduled Time
                </label>
                <input
                  type="time"
                  name="scheduledTime"
                  value={formData.scheduledAt?.split("T")[1] || ""}
                  onChange={(e) => {
                    const time = e.target.value;
                    const date =
                      formData.scheduledAt?.split("T")[0] ||
                      new Date().toISOString().split("T")[0];
                    onChange({
                      target: { name: "scheduledAt", value: `${date}T${time}` },
                    });
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Waste Type Section */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <h3 className="text-lg font-medium text-gray-700 mb-3 border-b pb-2">
              Waste Information
            </h3>

            <div className="flex flex-wrap gap-4">
              {["Plastic", "Glass", "Metal", "Organic"].map((type) => (
                <div
                  key={type}
                  className={`flex items-center px-3 py-2 rounded-lg border ${
                    formData.wasteType && formData.wasteType.includes(type)
                      ? "bg-blue-50 border-blue-300 text-blue-800"
                      : "bg-gray-100 border-gray-200 text-gray-500"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="wasteType"
                    value={type}
                    checked={
                      formData.wasteType && formData.wasteType.includes(type)
                    }
                    onChange={(e) => {
                      const selected = [...(formData.wasteType || [])];
                      if (e.target.checked) {
                        selected.push(type);
                      } else {
                        const index = selected.indexOf(type);
                        if (index !== -1) selected.splice(index, 1);
                      }
                      onChange({
                        target: { name: "wasteType", value: selected },
                      });
                    }}
                    className="mr-2 accent-blue-500"
                  />
                  <span className="mr-2">{wasteTypeIcons[type]}</span>
                  <span className="font-medium">{type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end pt-2 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-colors shadow-md"
            >
              Assign Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
