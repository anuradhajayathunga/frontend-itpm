import React, { useEffect, useState } from "react";
import SummaryApi from "../../../common";
import { toast } from "react-toastify";
import moment from "moment";
import ChangeUserRole from "../../ChangeUserRole";
import Card from "../../card";
import CardMenu from "../../card/CardMenu";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const UserTableWithReactTable = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });
  const [sorting, setSorting] = useState([]);

  // Pagination state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7, // default 5 rows per page
  });

  // Fetch all users data from the API
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

  // Handle edit user action
  const handleEditUser = (userData) => {
    setUpdateUserDetails(userData);
    setOpenUpdateRole(true);
  };

  // Define table columns
  const columns = [
    columnHelper.accessor("name", {
      id: "name",
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
              <p className="text-[10px] text-green-600">{userData.role}</p>
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
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          CREATED DATE
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {moment(info.getValue()).format("MMM Do YY")}
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
          <Card className="flex items-center space-x-4 text-sm">
            <button
              className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 hover:text-c-green-600 rounded-lg focus:outline-none focus:shadow-outline-gray hover:scale-110"
              aria-label="Edit"
              onClick={() => handleEditUser(userData)}
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
          </Card>
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

  const downloadPDF = () => {
    const doc = new jsPDF();

    const tableColumn = ["Name", "Email", "Role", "Created At"];
    const tableRows = [];

    allUsers.forEach((user) => {
      const rowData = [
        user.name,
        user.email,
        user.role,
        moment(user.createdAt).format("MMM Do YY"),
      ];
      tableRows.push(rowData);
    });

    doc.text("User List", 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("user-table.pdf");
  };

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
      <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
        <div className="relative flex items-center justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Users
          </div>
          <div className="flex justify-center gap-4 ">
            <button
              onClick={downloadPDF}
              className="px-4 py-2 mb-4 text-white bg-green-600 rounded hover:bg-green-700"
            >
              Downldoa PDF
            </button>

            <CardMenu />
          </div>
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

              {/* <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
                className="px-2 py-1 border rounded"
              >
                {[5, 10, 20, 30, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select> */}
            </div>
          )}
        </div>
      </Card>

      {/* Render the ChangeUserRole component when editing a user */}
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

export default UserTableWithReactTable;
