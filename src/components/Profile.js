import { useEffect, useState } from "react";
import { FaTimes, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

// const Profile = ({ open, setOpen }) => {
//   // if (!open || !user) return null;

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (

//     <>
//     profile
//     </>
//   );
// };

// export default Profile;

const Profile = ({ open, setOpen }) => {
  const user = useSelector((state) => state?.user?.user);

  // Close the modal when clicking outside
  const handleClose = (e) => {
    if (e.target.id === "profile-modal-bg") {
      setOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-700 hover:text-red-500 text-xl"
        >
          <FaTimes />
        </button>
        {/* Profile Info */}
        <div className="text-center">
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt="avatar"
              className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-green-600 text-white flex items-center justify-center mx-auto mb-3 text-2xl font-bold uppercase">
              {user?.name?.charAt(0) || "?"}
            </div>
          )}

          <h2 className="text-xl font-semibold capitalize">
            {user?.name || "Unnamed"}
          </h2>

          <p className="text-gray-700 text-sm flex justify-center items-center gap-1">
            <FaMapMarkerAlt className="text-sm" />
            {user?.city || "Location unknown"}
          </p>
        </div>
        {/* Stats */}
        <div className="flex justify-around mt-6 mb-4 text-center">
          <div>
            <p className="text-green-600 font-semibold">
              ${user?.totalSpent || "0"}
            </p>
            <p className="text-xs text-gray-700">Total Spent</p>
          </div>
          <div>
            <p className="text-green-600 font-semibold">
              {user?.lastOrder || "N/A"}
            </p>
            <p className="text-xs text-gray-700">Last Order</p>
          </div>
          <div>
            <p className="text-green-600 font-semibold">
              {user?.totalOrders || "0"}
            </p>
            <p className="text-xs text-gray-700">Total Orders</p>
          </div>
        </div>
        <hr className="my-4" />
        {/* Contact Info */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-gray-700" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhone className="text-gray-700" />
            <span>{user?.phone || "+1 000-000-0000"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
