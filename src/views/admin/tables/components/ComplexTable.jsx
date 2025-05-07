import React from "react";
import Card from "../../../../components/card";
import CardMenu from "../../../../components/card/CardMenu";
import { MdCancel, MdCheckCircle, MdOutlineError } from "react-icons/md";
import { BiMessageDots } from "react-icons/bi";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export default function ComplexTable(props) {
  const { tableData, onRowEdit } = props;
  const [sorting, setSorting] = React.useState([]);
  let defaultData = tableData || [];

  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">USER</p>
      ),
      cell: (info) => {
        const rowData = info.row.original;
        return (
          <div className="flex items-center text-sm">
            <div>
              <p className="text-sm font-bold text-navy-700 dark:text-white">
                {info.getValue()}
              </p>
              <p className="text-[12px] text-gray-600">{rowData.email}</p>
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor("phone", {
      id: "phone",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          PHONE NUMBER
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("location", {
      id: "location",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          LOCATION
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("area", {
      id: "area",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">AREA</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">STATUS</p>
      ),
      cell: (info) => {
        const status = info.getValue();
        const statusStyles = {
          Approved: "text-green-500 dark:text-green-300",
          Pending: "text-amber-500 dark:text-amber-300",
          Denied: "text-red-500 dark:text-red-300",
          Expired: "text-gray-500 dark:text-gray-300",
        };

        const statusIcons = {
          Approved: (
            <MdCheckCircle className={`${statusStyles[status]} me-1`} />
          ),
          Pending: (
            <MdOutlineError className={`${statusStyles[status]} me-1`} />
          ),
          Denied: <MdCancel className={`${statusStyles[status]} me-1`} />,
          Expired: <MdCancel className={`${statusStyles[status]} me-1`} />,
        };

        return (
          <div className="flex items-center">
            {statusIcons[status] || null}
            <p className={`text-sm font-bold ${statusStyles[status] || ""}`}>
              {status}
            </p>
          </div>
        );
      },
    }),
    columnHelper.accessor("date", {
      id: "date",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">DATE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
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
        const rowData = info.row.original;
        return (
          <div className="flex items-center space-x-4 text-sm">
            <button
              className="flex items-center justify-between px-2 py-2 text-2xl font-medium leading-5 text-blue-600 rounded-lg focus:outline-none focus:shadow-outline-gray"
              aria-label="Edit"
              onClick={() => onRowEdit && onRowEdit(rowData)}
            >
              <BiMessageDots />
            </button>
          </div>
        );
      },
    }),
  ];

  const [data, setData] = React.useState(() => [...defaultData]);

  React.useEffect(() => {
    if (tableData && tableData.length > 0) {
      setData([...tableData]);
    }
  }, [tableData]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Enables pagination
    initialState: {
      pagination: {
        pageSize: 9, // Show 10 rows per page
      },
    },
    debugTable: true,
  });

  const { getCanPreviousPage, getCanNextPage, nextPage, previousPage } = table;
  const { pageIndex, pageSize } = table.getState().pagination;
  const totalPages = Math.ceil(data.length / pageSize);

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      {/* Header */}
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Collectors' Requests
        </div>
        <CardMenu />
      </div>

      {/* Table Scroll Container */}
      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          {/* Table Header */}
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => (
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
                ))}
              </tr>
            ))}
          </thead>

          {/* Table Body */}
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="min-w-[150px] border-white/0 py-3 pr-4"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* No Data Message */}
        {data.length === 0 && (
          <div className="py-4 text-center text-gray-600">
            No data available
          </div>
        )}
      </div>

      {/* Pagination Controls (Only shown if more than 10 rows) */}
      {data.length > 10 && (
        <div className="flex justify-between items-center p-3 border-t dark:border-navy-700 mt-4">
          <button
            onClick={() => previousPage()}
            disabled={!getCanPreviousPage()}
            className={`px-4 py-1 rounded-md transition ${
              !getCanPreviousPage()
                ? "text-gray-400 cursor-not-allowed"
                : "bg-brand-500 text-white hover:bg-brand-600"
            }`}
          >
            Previous
          </button>

          <span className="text-sm text-navy-700 dark:text-white">
            Page {pageIndex + 1} of {totalPages}
          </span>

          <button
            onClick={() => nextPage()}
            disabled={!getCanNextPage()}
            className={`px-4 py-1 rounded-md transition ${
              !getCanNextPage()
                ? "text-gray-400 cursor-not-allowed"
                : "bg-brand-500 text-white hover:bg-brand-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </Card>
  );
}