import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import STATUS from "../common/status";
import { toast } from "react-toastify";
import SummaryApi from "../common";
const EditCollectorReq = ({ onClose, collecData, fetchData }) => {
  const [data, setData] = useState({ ...collecData });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If status is "Approved", update role to "Collector"
    // if (data.status === "Approved") {
    //   data.role = "COLLECTOR";
    // }

    const response = await fetch(SummaryApi.updateCollector.url, {
      method: SummaryApi.updateCollector.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    } else {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl h-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold">Collector's request</h2>
          <button
            className="text-gray-700 hover:text-red-600 hover:scale-110"
            onClick={onClose}
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={data.status}
              onChange={handleOnChange}
              className="p-2 outline-none bg-slate-100 border rounded"
            >
              {Object.values(STATUS).map((el) => (
                <option value={el} key={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>

          {/*<div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">First Name</label>

              <input
                type="text"
                name="fname"
                value={data.fname}
                onChange={handleOnChange}
                placeholder="First Name"
                className="outline-none capitalize flex-1 text-gray-600 placeholder:text-md placeholder:font-chivo py-2 px-[30px]"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="lname"
                value={data.lname}
                onChange={handleOnChange}
                placeholder="Last Name"
                className="outline-none capitalize flex-1 text-gray-600 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-2 px-[30px]"
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                placeholder="Email"
                className="outline-none  flex-1 text-gray-600 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-2 px-[35px]"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Phone Num</label>
              <input
                type="tel"
                name="phone"
                value={data.phone}
                onChange={handleOnChange}
                placeholder="Phone Number"
                className="outline-none  flex-1 text-gray-600 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-2 px-[30px]"
                pattern="\d{10}"
                required
              />
            </div>
          </div> */}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={data.location}
                className="outline-none  flex-1 text-gray-600 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-2 px-[30px]"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Area</label>
              <input
                type="text"
                name="workarea"
                value={data.workarea}
                className="outline-none  flex-1 text-gray-600 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-2 px-[30px]"
                readOnly
              />
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-3 gap-4">
            <div className="">
              <label className="block text-sm font-medium">
                NIC/Driving license
              </label>
              {data.fnic && (
                <img
                  src={data.fnic}
                  alt="Front NIC"
                  className="w-full h-32 object-cover rounded-lg border"
                />
              )}
              {data.bnic && (
                <img
                  src={data.bnic}
                  alt="Back NIC"
                  className="w-full h-32 object-cover rounded-lg border"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Vehicle Image</label>
              {data.vehicle && (
                <img
                  src={data.vehicle}
                  alt="Vehicle"
                  className="w-full h-32 object-cover rounded-lg border"
                />
              )}
            </div>
          </div>

          <div className="">
            <div>
              <label className="block text-sm font-medium">
                Vehicle Registration Num
              </label>
              <input
                type="text"
                name="reginumber"
                value={data.reginumber}
                onChange={handleOnChange}
                placeholder="Registration Number"
                className="outline-none  flex-1 text-gray-600 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-2 px-[30px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Chassis Num</label>
              <input
                type="text"
                name="chassisnumber"
                value={data.chassisnumber}
                onChange={handleOnChange}
                placeholder="Chassis Number"
                className="outline-none  flex-1 text-gray-600 placeholder:text-gray-400 placeholder:text-md placeholder:font-chivo py-2 px-[30px]"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-900"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCollectorReq;
