import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import summaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(summaryApi.updateUser.url, {
      method: summaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900  bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500  "
          onClick={onClose}
        >
          <IoMdClose size={24} />
        </button>

        <h1 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Change User Role
        </h1>

        <div className="space-y-3">
          <p className="text-gray-600">
            <span className="font-semibold">Name:</span> {name}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span> {email}
          </p>
          <div className="flex items-center justify-between border rounded-lg px-3 py-2">
            <p className="text-gray-700 font-medium">Role:</p>
            <select
              className="border-none bg-transparent focus:ring-0 text-gray-700"
              value={userRole}
              onChange={handleOnChangeSelect}
            >
              {Object.values(ROLE).map((el) => (
                <option value={el} key={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="w-full mt-6 py-2 bg-c-green-900 text-white rounded-lg font-medium hover:bg-dark transition"
          onClick={updateUserRole}
        >
          Role Change
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
