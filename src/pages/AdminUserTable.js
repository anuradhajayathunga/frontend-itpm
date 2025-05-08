import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import ChangeUserRole from "../components/ChangeUserRole";
// TableRow Component
const TableRow = ({ client, email, role, date, onEdit, onDelete }) => {
  return (
    <tr className="text-gray-700">
      <TableCell>
        <div className="flex items-center text-sm">
          {/* <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
            <img
              className="object-cover w-full h-full  rounded-full"
              src={client.avatar}
              alt={''}
              loading="lazy"
            />
            <div
              className="absolute inset-0 rounded-full shadow-inner"
              aria-hidden="true"
            ></div>
          </div> */}
          <div>
            <p className="font-semibold capitalize">{client.name}</p>
            <p className="text-[10px] text-gray-600">{client.role}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{role}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>
        <div className="flex items-center space-x-4 text-sm">
          <button
            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-c-green-600 rounded-lg focus:outline-none focus:shadow-outline-gray hover:scale-110"
            aria-label="Edit"
            onClick={onEdit}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
            </svg>
          </button>
          {/* <button
            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-c-red-100 rounded-lg focus:outline-none focus:shadow-outline-gray hover:scale-110"
            aria-label="Delete"
            onClick={onDelete}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button> */}
        </div>
      </TableCell>
    </tr>
  );
};

// TableCell Component
const TableCell = ({ children }) => {
  return <td className="px-4 py-3">{children}</td>;
};

const AdminUserTable = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(SummaryApi.AllUsers.url, {
        method: SummaryApi.AllUsers.method,
        credentials: "include",
      });
      const dataResponse = await fetchData.json();
      if (dataResponse.success) {
        setAllUsers(dataResponse.data);
      } else if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("An error occurred while fetching users.");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // const handleDelete = (clientName) => {
  //   console.log(`Delete action triggered for ${clientName}`);
  // };

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
      <h4 className="mb-4 text-lg font-semibold text-gray-600">All User</h4>
      <div className="max-w-[1200px] overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Created Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {allUsers.map((user, index) => (
              <TableRow
                key={index}
                client={{
                  name: user?.name,
                  role: user?.role,
                  avatar: "#", // Replace with actual avatar URL if available
                }}
                email={user?.email} // Replace with actual amount if applicable
                role={user?.role}
                date={moment(user?.createdAt).format("MMM Do YY")}
                onEdit={() => {
                  setUpdateUserDetails(user);
                  setOpenUpdateRole(true);
                }}
                // onDelete={() => handleDelete(user.name)}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="grid px-4 py-3 max-w-[1200px] text-xs font-semibold tracking-wide text-gray-500 uppercase border-t bg-gray-50 sm:grid-cols-9">
        <span className="flex items-center col-span-3">
          Showing 21-30 of 100
        </span>
        <span className="col-span-2"></span>
        <Pagination />
      </div> */}
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

// Pagination Component
const Pagination = () => {
  return (
    <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
      <nav aria-label="Table navigation">
        <ul className="inline-flex items-center">
          <li>
            <button
              className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
              aria-label="Previous"
            >
              <svg
                className="w-4 h-4 fill-current"
                aria-hidden="true"
                viewBox="0 0 20 20"
              >
                <path
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
          {[1, 2, 3, 4, 8, 9].map((page) => (
            <li key={page}>
              <button
                className={`px-3 py-1 rounded-md ${
                  page === 3
                    ? "text-white bg-purple-600"
                    : "focus:outline-none focus:shadow-outline-purple"
                }`}
              >
                {page}
              </button>
            </li>
          ))}
          <li>
            <span className="px-3 py-1">...</span>
          </li>
          <li>
            <button
              className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
              aria-label="Next"
            >
              <svg
                className="w-4 h-4 fill-current"
                aria-hidden="true"
                viewBox="0 0 20 20"
              >
                <path
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </span>
  );
};

export default AdminUserTable;
