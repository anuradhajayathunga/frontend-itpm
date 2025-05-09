import jsPDF from "jspdf";
import React, { useState } from "react";
const InvoiceGenerator = ({ collectorData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const printRef = React.useRef(null);

  // Sample collector data - this would come from your table
  //   const collectorData = [
  //     {
  //       id: "COL-2025-001",
  //       name: "John Smith",
  //       email: "john.smith@example.com",
  //       phone: "(555) 987-6543",
  //       location: "Los Angeles",
  //       area: "West Coast",
  //       status: "Approved",
  //       date: "May 5, 2025"
  //     },
  //     {
  //       id: "COL-2025-002",
  //       name: "Emma Johnson",
  //       email: "emma.j@example.com",
  //       phone: "(555) 123-4567",
  //       location: "New York",
  //       area: "East Coast",
  //       status: "Pending",
  //       date: "May 7, 2025"
  //     },
  //     {
  //       id: "COL-2025-003",
  //       name: "Michael Brown",
  //       email: "m.brown@example.com",
  //       phone: "(555) 234-5678",
  //       location: "Chicago",
  //       area: "Midwest",
  //       status: "Approved",
  //       date: "May 8, 2025"
  //     }
  //   ];

  // Invoice data
  const invoiceData = {
    invoiceNumber: "INV-2025-0042",
    date: "May 09, 2025",
    dueDate: "May 23, 2025",
    company: {
      name: "Collection Management Inc.",
      address: "123 Business Avenue",
      city: "New York, NY 10001",
      phone: "(555) 123-4567",
      email: "billing@collectionmgmt.com",
      website: "www.collectionmgmt.com",
    },
    subtotal: collectorData.length * 250,
    tax: collectorData.length * 250 * 0.08,
    get total() {
      return this.subtotal + this.tax;
    },
    notes: "Thank you for your business! Payment is due within 14 days.",
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
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

  // Function to simulate PDF download
  const downloadPDF = async () => {
    // In a real implementation, this would trigger the actual PDF download
    const element = printRef.current;
    if (!element) {
      return;
    }
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProperties =pdf.getImageProperties(data)
    const pdfWidth =  pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProperties.height * pdfWidth / imgProperties.width)
    console.log(imgProperties)

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("collector.pdf");

    alert("PDF download started!");
    // Reset state after download
    setTimeout(() => {
      setIsReady(false);
    }, 1000);
  };

  return (
    <div ref={printRef} className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
      {/* Invoice Preview */}
      <div className="mb-8 border-b pb-4">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {invoiceData.company.name}
            </h1>
            <p className="text-gray-600">{invoiceData.company.address}</p>
            <p className="text-gray-600">{invoiceData.company.city}</p>
            <p className="text-gray-600">{invoiceData.company.phone}</p>
            <p className="text-gray-600">{invoiceData.company.email}</p>
            <p className="text-gray-600">{invoiceData.company.website}</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-gray-800">INVOICE</h2>
            <p className="text-gray-600 mt-1">
              <span className="font-semibold">Invoice#:</span>{" "}
              {invoiceData.invoiceNumber}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Date:</span> {invoiceData.date}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Due Date:</span>{" "}
              {invoiceData.dueDate}
            </p>
          </div>
        </div>

        {/* Collectors Table */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Collectors Information
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">
                    ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">
                    Phone
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">
                    Location
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">
                    Area
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {collectorData.map((collector, index) => (
                  <tr
                    key={collector.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="py-3 px-4 text-gray-700 border-b">
                      {collector.id}
                    </td>
                    <td className="py-3 px-4 text-gray-700 border-b">
                      {collector.name}
                    </td>
                    <td className="py-3 px-4 text-gray-700 border-b">
                      {collector.email}
                    </td>
                    <td className="py-3 px-4 text-gray-700 border-b">
                      {collector.phone}
                    </td>
                    <td className="py-3 px-4 text-gray-700 border-b">
                      {collector.location}
                    </td>
                    <td className="py-3 px-4 text-gray-700 border-b">
                      {collector.area}
                    </td>
                    <td className="py-3 px-4 text-gray-700 border-b">
                      <StatusBadge status={collector.status} />
                    </td>
                    <td className="py-3 px-4 text-gray-700 border-b">
                      {collector.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6">
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
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">Notes:</h3>
          <p className="text-gray-600">{invoiceData.notes}</p>
        </div>

        {/* Payment Info */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">
            Payment Information:
          </h3>
          <p className="text-blue-700">Bank Name: Example Bank</p>
          <p className="text-blue-700">
            Account Name: Collection Management Inc.
          </p>
          <p className="text-blue-700">Account Number: 1234567890</p>
          <p className="text-blue-700">Routing Number: 987654321</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        {!isGenerating && !isReady && (
          <button
            onClick={generatePDF}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Generate PDF Invoice
          </button>
        )}

        {isGenerating && (
          <button
            disabled
            className="px-6 py-2 bg-gray-400 text-white font-medium rounded-lg flex items-center"
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
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center"
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
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>
          If you have any questions, please contact us at{" "}
          {invoiceData.company.email}
        </p>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
