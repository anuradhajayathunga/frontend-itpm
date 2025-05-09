import React, { useState, useEffect } from "react";
import SummaryApi from "../common"; // Make sure this path is correct
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [view, setView] = useState("Feedback");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(SummaryApi.getAllFeedbacks.url, {
          method: SummaryApi.getAllFeedbacks.method,
        });
        const result = await response.json();
        if (response.ok) {
          setSubmissions(result);
        } else {
          toast.error("Failed to load feedbacks.");
        }
      } catch (err) {
        console.error("Error fetching submissions:", err);
        setSubmissions([]);
        toast.error("Error fetching data.");
      }
    };
    fetchSubmissions();
  }, []);

  const handleResolve = async (id) => {
    try {
      const response = await fetch(SummaryApi.updateFeedbackById(id).url, {
        method: SummaryApi.updateFeedbackById(id).method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Resolved" }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Marked as resolved.");
        setSubmissions((prev) =>
          prev.map((sub) =>
            sub._id === id ? { ...sub, status: "Resolved" } : sub
          )
        );
      } else {
        toast.error(result.message || "Failed to update status.");
      }
    } catch (err) {
      console.error("Error updating feedback:", err);
      toast.error("Error updating feedback.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteFeedbackById(id).url, {
        method: SummaryApi.deleteFeedbackById(id).method,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Deleted successfully.");
        setSubmissions((prev) => prev.filter((sub) => sub._id !== id));
      } else {
        toast.error(result.message || "Failed to delete.");
      }
    } catch (err) {
      console.error("Error deleting feedback:", err);
      toast.error("Error deleting feedback.");
    }
  };

  const filteredSubmissions = submissions.filter(
    (sub) => sub.type === view
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Admin Dashboard</h2>
      <div className="flex gap-3 justify-center mb-5">
        <button
          className={`px-5 py-2 rounded-full ${
            view === "Feedback" ? "bg-green-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setView("Feedback")}
        >
          View Feedback
        </button>
        <button
          className={`px-5 py-2 rounded-full ${
            view === "Complaint" ? "bg-red-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setView("Complaint")}
        >
          View Complaints
        </button>
      </div>

      <h3 className="text-xl font-semibold text-center mb-2">{view}</h3>

      {filteredSubmissions.length === 0 ? (
        <p className="text-center">No {view.toLowerCase()} available.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">User Type</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Description</th>
              {view === "Feedback" && <th className="border p-2">Rating</th>}
              {view === "Complaint" && <th className="border p-2">Urgency</th>}
              <th className="border p-2">Picture</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.map((sub) => (
              <tr key={sub._id}>
                <td className="border p-2">{sub.userType}</td>
                <td className="border p-2">{sub.category}</td>
                <td className="border p-2">{sub.description}</td>
                {view === "Feedback" && (
                  <td className="border p-2">
                    {"★".repeat(sub.rating) + "☆".repeat(5 - sub.rating)}
                  </td>
                )}
                {view === "Complaint" && (
                  <td className="border p-2">{sub.urgency}</td>
                )}
                <td className="border p-2">
                  {sub.picture ? (
                    <img
                      src={sub.picture}
                      alt="Submission"
                      className="w-12 h-12 object-cover"
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="border p-2">{sub.status}</td>
                <td className="border p-2 flex gap-2">
                  {sub.status === "Open" && (
                    <button
                      onClick={() => handleResolve(sub._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Mark as Resolved
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(sub._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
