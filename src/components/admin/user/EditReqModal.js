import React from "react";
import { FiX } from "react-icons/fi";

const EditModal = ({ isOpen, onClose, onSubmit, formData, onChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 pt-12  w-full h-full z-10 flex justify-center items-center bg-white/10 p-2 backdrop-blur-md">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800"> Request</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                readOnly
                r
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lname"
                value={formData.lname}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                readOnly
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                readOnly
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                readOnly
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                readOnly
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scheduled Date
              </label>
              <input
                type="date"
                value={formData.scheduledAt?.split("T")[0] || ""}
                // onChange={(e) => {
                //   const newDate = e.target.value;
                //   const time = formData.scheduledAt?.split("T")[1] || "00:00";
                //   setFormData((prev) => ({
                //     ...prev,
                //     scheduledAt: `${newDate}T${time}`,
                //   }));
                // }}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                readOnly
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scheduled Time
              </label>
              <input
                type="time"
                value={formData.scheduledAt?.split("T")[1] || ""}
                // onChange={(e) => {
                //   const newTime = e.target.value;
                //   const date =
                //     formData.scheduledAt?.split("T")[0] ||
                //     moment().format("YYYY-MM-DD");
                //   setFormData((prev) => ({
                //     ...prev,
                //     scheduledAt: `${date}T${newTime}`,
                //   }));
                // }}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Waste Type
            </label>
            {["Plastic", "Glass", "Metal", "Organic"].map((type) => (
              <label
                key={type}
                className="flex items-center space-x-2 text-gray-800"
              >
                <input
                  type="checkbox"
                  name="wasteType"
                  value={type}
                  checked={formData.wasteType.includes(type)}
                  onChange={(e) => {
                    const selected = [...formData.wasteType];
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
                  className="accent-green-500 mr-2 cursor-default"
                  disabled
                />
                {type}
              </label>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
