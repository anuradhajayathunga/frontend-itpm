import React from "react";
import { Pie, Line } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
} from "chart.js";
import { FaTrash, FaRecycle, FaUsers, FaUserCog, FaUserClock } from "react-icons/fa";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const AdminDashboard = () => {
  // Pie chart data for waste distribution
  const pieData = {
    labels: ["Organic Waste", "Recyclables", "Non-Recyclables"],
    datasets: [
      {
        data: [500, 300, 200],
        backgroundColor: ["#3b82f6", "#14b8a6", "#9333ea"],
      },
    ],
  };

  // Line chart data for waste collection trends
  const lineData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Collected Waste (kg)",
        data: [1200, 1400, 1300, 1500, 1600],
        fill: false,
        borderColor: "#14b8a6",
        tension: 0.1,
      },
      {
        label: "Recycled Waste (kg)",
        data: [600, 750, 700, 800, 900],
        fill: false,
        borderColor: "#9333ea",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2 className="my-6 text-3xl font-semibold text-gray-700">Dashboard</h2>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
          <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
            <FaTrash className="w-5 h-5" />
          </div>
          <div>
            <p className="mb-2 text-lg font-medium text-gray-600">Total Waste Collected</p>
            <p className="text-2xl font-semibold text-gray-700">12,450 kg</p>
          </div>
        </div>

        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
          <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
            <FaRecycle className="w-5 h-5" />
          </div>
          <div>
            <p className="mb-2 text-lg font-medium text-gray-600">Recycled Waste</p>
            <p className="text-2xl font-semibold text-gray-700">5,200 kg</p>
          </div>
        </div>

        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
          <div className="p-3 mr-4 text-purple-500 bg-purple-100 rounded-full">
            <FaUsers className="w-5 h-5" />
          </div>
          <div>
            <p className="mb-2 text-lg font-medium text-gray-600">Total Clients</p>
            <p className="text-2xl font-semibold text-gray-700">3,800</p>
          </div>
        </div>

        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
          <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full">
            <FaUserCog className="w-5 h-5" />
          </div>
          <div>
            <p className="mb-2 text-lg font-medium text-gray-600">Total Collectors</p>
            <p className="text-2xl font-semibold text-gray-700">250</p>
          </div>
        </div>

        {/* <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
          <div className="p-3 mr-4 text-red-500 bg-red-100 rounded-full">
            <FaUserClock className="w-5 h-5" />
          </div>
          <div>
            <p className="mb-2 text-lg font-medium text-gray-600">Pending Collector Requests</p>
            <p className="text-2xl font-semibold text-gray-700">15</p>
          </div>
        </div> */}
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <div className="max-w-[500px] p-4 bg-white rounded-lg shadow-xs">
          <h4 className="mb-4 font-semibold text-gray-800">Waste Distribution</h4>
          <Pie data={pieData} />
        </div>

        <div className="max-w-[800px] p-4 bg-white rounded-lg shadow-xs">
          <h4 className="mb-4 font-semibold text-gray-800">Waste Collection Trends</h4>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
