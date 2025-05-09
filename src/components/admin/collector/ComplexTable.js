import React, { useState } from "react";
import Card from "../../card";
import CardMenu from "../../card/CardMenu";
import { MdCancel, MdCheckCircle, MdOutlineError } from "react-icons/md";
import { BiMessageDots } from "react-icons/bi";
import { FiDownload } from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

// Invoice Generator Component
const InvoiceGenerator = ({ collectorData, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const printRef = React.useRef(null);

  // Invoice data
  const invoiceData = {
    invoiceNumber: "INV-2025-0042",
    date: moment().format("MMMM DD, YYYY"), // e.g., "May 09, 2025"
    dueDate: moment().add(14, "days").format("MMMM DD, YYYY"), // 14 days later
    company: {
      name: "Ecobin Solution Pvt Ltd.",
      address: "123 Business Avenue",
      city: "New York, NY 10001",
      phone: "(555) 123-4567",
      email: "ecobin@collectionmgmt.com",
      website: "www.ecobinsolutin.com",
    },
    subtotal: collectorData.length * 50000,
    tax: collectorData.length * 50000 * 0.08,
    get total() {
      return this.subtotal + this.tax;
    },
    notes: "Thank you for your business! Payment is due within 14 days.",
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LKR",
    }).format(amount);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusStyles = {
      Approved: "bg-green-100 text-green-800",
      Pending: "bg-amber-100 text-amber-800",
      Denied: "bg-red-100 text-red-800",
      Expired: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}
      >
        {status}
      </span>
    );
  };

  // Function to simulate PDF generation
  const generatePDF = () => {
    setIsGenerating(true);

    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setIsReady(true);
    }, 1500);
  };

  // Function to generate and download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add company details
    doc.setFontSize(20);
    doc.text(invoiceData.company.name, 20, 20);
    doc.setFontSize(10);
    doc.text(invoiceData.company.address, 20, 30);
    doc.text(invoiceData.company.city, 20, 35);
    doc.text(invoiceData.company.phone, 20, 40);
    doc.text(invoiceData.company.email, 20, 45);
    doc.text(invoiceData.company.website, 20, 50);

    // Add invoice details
    doc.setFontSize(16);
    doc.text("INVOICE", 150, 20);
    doc.setFontSize(10);
    doc.text(`Invoice#: ${invoiceData.invoiceNumber}`, 150, 30);
    doc.text(`Date: ${invoiceData.date}`, 150, 35);
    doc.text(`Due Date: ${invoiceData.dueDate}`, 150, 40);

    // Add collectors table
    const tableColumn = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Location",
      "Area",
      "Status",
      "Date",
    ];

    const tableRows = collectorData.map((collector) => [
      collector.id || `COL-${Math.floor(Math.random() * 10000)}`,
      collector.name,
      collector.email,
      collector.phone,
      collector.location,
      collector.area,
      collector.status,
      collector.date,
    ]);

    autoTable(doc, {
      startY: 60,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [66, 135, 245] },
    });

    const finalY = doc.lastAutoTable.finalY || 150;

    // Add summary
    doc.setFontSize(12);
    doc.text("Invoice Summary", 20, finalY + 20);

    doc.setFontSize(10);
    doc.text(`Number of Collectors: ${collectorData.length}`, 20, finalY + 30);
    doc.text(`Rate per Collector: ${formatCurrency(250)}`, 20, finalY + 35);
    doc.text(
      `Subtotal: ${formatCurrency(invoiceData.subtotal)}`,
      20,
      finalY + 40
    );
    doc.text(`Tax (8%): ${formatCurrency(invoiceData.tax)}`, 20, finalY + 45);
    doc.text(`Total: ${formatCurrency(invoiceData.total)}`, 20, finalY + 55);

    // Add notes
    doc.setFontSize(10);
    doc.text("Notes:", 20, finalY + 70);
    doc.text(invoiceData.notes, 20, finalY + 75);

    // Add payment info
    doc.setFontSize(10);
    doc.text("Payment Information:", 20, finalY + 90);
    doc.text("Bank Name: Example Bank", 20, finalY + 95);
    doc.text("Account Name: Collection Management Inc.", 20, finalY + 100);
    doc.text("Account Number: 1234567890", 20, finalY + 105);
    doc.text("Routing Number: 987654321", 20, finalY + 110);

    // Save PDF
    doc.save("collectors_invoice.pdf");

    // Reset state after download
    setTimeout(() => {
      setIsReady(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-gray-900  bg-opacity-50 flex items-center justify-center z-50 bg-white/10 p-2 backdrop-blur-md">
      <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-5xl w-full max-h-screen">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-gray-800">Invoice Preview</h2>
          <div className="flex items-center gap-2">
            {/* Actions */}
            <div className="flex justify-center gap-4 mt-1">
              {!isGenerating && !isReady && (
                <button
                  onClick={generatePDF}
                  className="px-6 py-2 bg-gray-100  font-medium rounded-sm hover:bg-c-green-300 transition-colors"
                >
                  Generate PDF Invoice
                </button>
              )}

              {isGenerating && (
                <button
                  disabled
                  className="px-6 py-2 bg-gray-400 text-white font-medium rounded-sm flex items-center"
                >
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Generating PDF...
                </button>
              )}

              {isReady && (
                <button
                  onClick={downloadPDF}
                  className="px-6 py-2 bg-gray-800 text-white font-medium rounded-sm hover:bg-white hover:text-gray-800  transition-colors flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    ></path>
                  </svg>
                  Download Invoice PDF
                </button>
              )}

              <button
                onClick={onClose}
                className="text-gray-500 hover:text-red-700"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div ref={printRef} className="bg-white rounded-lg p-6">
          {/* Invoice Preview */}
          <div className="mb-8 border-b pb-4">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {invoiceData.company.name}
                </h1>
                <p className="text-gray-600">{invoiceData.company.address}</p>
                <p className="text-gray-600">{invoiceData.company.city}</p>
                <p className="text-gray-600">{invoiceData.company.phone}</p>
                <p className="text-gray-600">{invoiceData.company.email}</p>
                <p className="text-gray-600">{invoiceData.company.website}</p>
              </div>
              <div className="text-right">
                <h2 className="text-xl font-bold text-gray-800">INVOICE</h2>
                <p className="text-gray-600 mt-1">
                  <span className="font-semibold">Invoice#:</span>{" "}
                  {invoiceData.invoiceNumber}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Date:</span>{" "}
                  {invoiceData.date}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Due Date:</span>{" "}
                  {invoiceData.dueDate}
                </p>
              </div>
            </div>

            {/* Collectors Table */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Collectors Information
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-2 px-3 font-semibold text-gray-600 border-b">
                        ID
                      </th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-600 border-b">
                        Name
                      </th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-600 border-b">
                        Email
                      </th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-600 border-b">
                        Phone
                      </th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-600 border-b">
                        Location
                      </th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-600 border-b">
                        Area
                      </th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-600 border-b">
                        Status
                      </th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-600 border-b">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {collectorData.map((collector, index) => (
                      <tr
                        key={collector.id || index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="py-2 px-3 text-gray-700 border-b">
                          {collector.id ||
                            `COL-${Math.floor(Math.random() * 10000)}`}
                        </td>
                        <td className="py-2 px-3 text-gray-700 border-b">
                          {collector.name}
                        </td>
                        <td className="py-2 px-3 text-gray-700 border-b">
                          {collector.email}
                        </td>
                        <td className="py-2 px-3 text-gray-700 border-b">
                          {collector.phone}
                        </td>
                        <td className="py-2 px-3 text-gray-700 border-b">
                          {collector.location}
                        </td>
                        <td className="py-2 px-3 text-gray-700 border-b">
                          {collector.area}
                        </td>
                        <td className="py-2 px-3 text-gray-700 border-b">
                          <StatusBadge status={collector.status} />
                        </td>
                        <td className="py-2 px-3 text-gray-700 border-b">
                          {collector.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Invoice Summary
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-600">
                    Number of Collectors:
                  </span>
                  <span className="text-gray-800">{collectorData.length}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-600">
                    Rate per Collector:
                  </span>
                  <span className="text-gray-800">{formatCurrency(250)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-600">Subtotal:</span>
                  <span className="text-gray-800">
                    {formatCurrency(invoiceData.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-600">Tax (8%):</span>
                  <span className="text-gray-800">
                    {formatCurrency(invoiceData.tax)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-300 mt-2 pt-2">
                  <span className="font-bold text-gray-800">Total:</span>
                  <span className="font-bold text-gray-800">
                    {formatCurrency(invoiceData.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-1">
              <h3 className="font-semibold text-gray-700 mb-2">Notes:</h3>
              <p className="text-gray-600">{invoiceData.notes}</p>
            </div>

            {/* Payment Info */}
            {/* <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">
                Payment Information:
              </h3>
              <p className="text-blue-700">Bank Name: Example Bank</p>
              <p className="text-blue-700">
                Account Name: Collection Management Inc.
              </p>
              <p className="text-blue-700">Account Number: 1234567890</p>
              <p className="text-blue-700">Routing Number: 987654321</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main ComplexTable Component
const columnHelper = createColumnHelper();

export default function ComplexTable(props) {
  const { tableData, onRowEdit } = props;
  const [sorting, setSorting] = React.useState([]);
  const [showInvoice, setShowInvoice] = useState(false);
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
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          STATUS
        </p>
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
              className="flex items-center justify-between px-2 py-2 text-2xl font-medium leading-5 hover:text-blue-600 rounded-lg scale-110 focus:outline-none focus:shadow-outline-gray"
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
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 9,
      },
    },
    debugTable: true,
  });

  // Download handlers
  const handleShowInvoice = () => {
    setShowInvoice(true);
  };

  const handleCloseInvoice = () => {
    setShowInvoice(false);
  };

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
        <div className="flex items-center">
          <button
            onClick={handleShowInvoice}
            className="flex items-center px-4 py-2 mr-2  bg-gray-100 hover:bg-gray-300 dark:bg-blue-900"
          >
            <FiDownload className="mr-2" />
            Generate Invoice
          </button>
          <CardMenu />
        </div>
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
                : "bg-lime-500 text-white hover:bg-lime-600"
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
                : "bg-lime-500 text-white hover:bg-lime-600"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Invoice Modal */}
      {showInvoice && (
        <InvoiceGenerator collectorData={data} onClose={handleCloseInvoice} />
      )}
    </Card>
  );
}
