import React, { useEffect, useState } from "react";
import SummaryApi from "../../../common";
import { toast } from "react-toastify";
import moment from "moment";
import Card from "../../card";
import CardMenu from "../../card/CardMenu";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import EditModal from "./EditReqModal";
import DeleteModal from "./DeleteReqModal";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import CreateTaskModal from "./CreateTaskModel";

const columnHelper = createColumnHelper();

const UserReq = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  // const [collectorEmail, setCollectorEmail] = useState(""); // State for collector email
  const [editFormData, setEditFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    wasteType: [],
    scheduledAt: "",
  });

  const [taskFormData, setTaskFormData] = useState({
    title: "",
    description: "",
    uemail: "",
    city: "",
    address: "",
    wasteType: [],
    scheduledAt: "",
    email:"",
  });

  // Pagination state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7, // default 7 rows per page
  });

  // Fetch all users data from the API
  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(SummaryApi.get_all_waste.url, {
        method: SummaryApi.get_all_waste.method,
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

  // Handle edit user action
  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditFormData({
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      phone: user.phone,
      city: user.city,
      wasteType: user.wasteType,
      address: user.address,
      scheduledAt: moment(user.scheduledAt).format("YYYY-MM-DDTHH:mm"),
    });
    setIsEditModalOpen(true);
  };

  const handleTask = (user) => {
    setSelectedUser(user);
    // Reset collector email when opening task modal
    setTaskFormData({
      title: "",
      description: "",
      uemail: user.email,
      phone:user.phone,
      city: user.city,
      wasteType: user.wasteType || [],
      address: user.address,
      scheduledAt: moment(user.scheduledAt).format("YYYY-MM-DDTHH:mm"),
    });
    setIsTaskModalOpen(true);
  };

  // Handle update user form submission
  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      // Get the user ID
      const userId = selectedUser._id; // Assuming _id is the user identifier

      // Construct the data to send to the API (without id in the body)
      const updateData = {
        ...editFormData,
      };

      // Make API call to update the user data with ID in the URL
      const response = await fetch(SummaryApi.update_waste(userId).url, {
        method: SummaryApi.update_waste(userId).method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("User updated successfully!");
        setIsEditModalOpen(false);
        fetchAllUsers(); // Refresh the data
      } else {
        toast.error(result.message || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("An error occurred while updating user request");
    }
  };

  // Handle input change in edit form
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle input change in task form
  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setTaskFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle delete user action
  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete user
  const confirmDelete = async () => {
    try {
      // Get the user ID
      const userId = selectedUser._id; // Assuming _id is the user identifier

      // Make API call to delete the user
      const response = await fetch(SummaryApi.delete_waste(userId).url, {
        method: SummaryApi.delete_waste(userId).method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        // No need for body if ID is in URL
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Waste collection request deleted successfully!");
        setIsDeleteModalOpen(false);
        fetchAllUsers(); // Refresh the data
      } else {
        toast.error(
          result.message || "Failed to delete waste collection request"
        );
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(
        "An error occurred while deleting the waste collection request"
      );
    }
  };

  // Handle create task form submission
  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const taskData = {
        title: taskFormData.title,
        description: taskFormData.description,
        uemail: taskFormData.uemail,
        city: taskFormData.city,
        address: taskFormData.address,
        wasteType: taskFormData.wasteType,
        assignedDate: taskFormData.scheduledAt, // Map scheduledAt → assignedDate
        email: taskFormData.collectorEmail,     // Collector's email for lookup
      };
  
      const response = await fetch(SummaryApi.assign_task.url, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "credentials": "include" 
        },
        body: JSON.stringify(taskData),
      });
  
      const result = await response.json();

      if (result.success) {
        toast.success("Task assigned successfully!");
        setIsTaskModalOpen(false);
        fetchAllUsers();
      } else {
        toast.error(result.message || "Failed to assign task");
      }
    } catch (error) {
      toast.error("An error occurred while assigning task");
    }
  };

  // Handle collector email change
  const handleCollectorEmailChange = (e) => {
  };

  // Define table columns
  const columns = [
    columnHelper.accessor("fname", {
      id: "fname",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">NAME</p>
      ),
      cell: (info) => {
        const userData = info.row.original;
        return (
          <div className="flex items-center text-sm">
            <div>
              <p className="font-semibold capitalize text-navy-700 dark:text-white">
                {info.getValue()}
              </p>
              <p className="text-[12px] capitalize">{userData.lname}</p>
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor("email", {
      id: "email",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">EMAIL</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("city", {
      id: "city",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">City</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("scheduledAt", {
      id: "scheduledAt",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">DATE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {moment(info.getValue()).format("MMM Do YY")}
        </p>
      ),
    }),
    columnHelper.accessor("scheduledAt", {
      id: "scheduledTime",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Time</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {moment(info.getValue()).format("hh:mm A")}
        </p>
      ),
    }),
    columnHelper.accessor("actions", {
      id: "actions",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          ACTIONS
        </p>
      ),
      cell: (info) => {
        const userData = info.row.original;
        return (
          <div className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => handleEdit(userData)}
              className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-green-600 rounded-lg focus:outline-none focus:shadow-outline-gray hover:scale-110"
              aria-label="Edit"
            >
              <MdEdit className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDelete(userData)}
              className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg focus:outline-none focus:shadow-outline-gray hover:scale-110"
              aria-label="Delete"
            >
              <MdDelete className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleTask(userData)}
              className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-blue-600 rounded-lg focus:outline-none focus:shadow-outline-gray hover:scale-110"
              aria-label="Assign Task"
            >
              <FaShare className="w-5 h-5" />
            </button>
          </div>
        );
      },
    }),
  ];

  // Initialize the table with React Table
  const table = useReactTable({
    data: allUsers,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <Card className="w-full overflow-hidden rounded-lg shadow-xs">
      <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
        <div className="relative flex items-center justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Waste Collection Request
          </div>
          <CardMenu />
        </div>

        <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
          <table className="w-full whitespace-no-wrap">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="!border-px !border-gray-400"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
                      >
                        <div className="items-center justify-between text-xs text-gray-200">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className=" divide-y">
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id} className="text-gray-700">
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id} className="pr-4 py-3 border-white/0">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Loading State */}
          {allUsers.length === 0 && (
            <div className="py-4 text-center text-gray-600">
              No users found or loading...
            </div>
          )}

          {/* Pagination Controls */}
          {allUsers.length > 8 && (
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span>
                  Page{" "}
                  <strong>
                    {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount().toLocaleString()}
                  </strong>
                </span>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdateUser}
          formData={editFormData}
          onChange={handleEditFormChange}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          userName={`${selectedUser?.fname} ${selectedUser?.lname}`}
        />
      )}

      {/* Task Modal */}
      {isTaskModalOpen && (
        <CreateTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={handleCreateTask}
        formData={taskFormData}
        onChange={handleTaskFormChange}
      />
      )}
    </Card>
  );
};

export default UserReq;