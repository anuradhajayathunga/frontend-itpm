import React, { useEffect, useState } from "react";
import SummaryApi from "../../../common";
import moment from "moment";
import EditCollectorReq from "../../EditCollectorReq";
import ComplexTable from "../../../views/admin/tables/components/ComplexTable";

const CollectorPageWithTable = () => {
  const [allCollecter, setAllCollecter] = useState([]);
  const [edit, setEdit] = useState(null);
  const [formattedData, setFormattedData] = useState([]);

  const fetchAllCollecter = async () => {
    try {
      const response = await fetch(SummaryApi.allCollector.url);
      const dataResponse = await response.json();

      if (dataResponse?.data) {
        setAllCollecter(dataResponse.data);

        // Format data for the EnhancedComplexTable
        const tableData = dataResponse.data.map((collector) => ({
          name: `${collector.fname} ${collector.lname}`,
          status: collector.status,
          date: moment(collector.createdAt).format("MMM Do YY"),
          progress: getProgressValue(collector.status),
          email: collector.email,
          phone: collector.phone,
          location: collector.location,
          area: collector.workarea,
          rawData: collector, // Store the original data for editing
        }));

        setFormattedData(tableData);
      }
    } catch (error) {
      console.error("Error fetching collector data:", error);
    }
  };

  // Calculate progress value based on status
  const getProgressValue = (status) => {
    switch (status) {
      case "Approved":
        return 100;
      case "Pending":
        return 50;
      case "Denied":
        return 0;
      case "Expired":
        return 25;
      default:
        return 0;
    }
  };

  useEffect(() => {
    fetchAllCollecter();
  }, []);

  const handleRowEdit = (rowData) => {
    // Set the edit state with the original collector data
    setEdit(rowData.rawData);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        {/* EnhancedComplexTable will render the data */}
        <ComplexTable tableData={formattedData} onRowEdit={handleRowEdit} />

        {/* EditCollectorReq component will be shown when edit state is set */}
        {edit && (
          <EditCollectorReq
            onClose={() => setEdit(null)}
            collecData={edit}
            fetchData={fetchAllCollecter}
          />
        )}
      </div>
    </div>
  );
};

export default CollectorPageWithTable;
