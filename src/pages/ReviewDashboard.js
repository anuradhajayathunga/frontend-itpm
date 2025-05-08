import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [view, setView] = useState('Feedback');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/submissions');
        setSubmissions(res.data);
      } catch (err) {
        console.error('Error fetching submissions:', err);
        setSubmissions([]);
      }
    };
    fetchSubmissions();
  }, []);

  const handleResolve = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/submissions/${id}`, { status: 'Resolved' });
      setSubmissions(submissions.map(sub => sub._id === id ? { ...sub, status: 'Resolved' } : sub));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/submissions/${id}`);
      setSubmissions(submissions.filter(sub => sub._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredSubmissions = submissions.filter(sub => sub.type === view);

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Admin Dashboard</h2>
      <div className="flex gap-3 justify-center mb-5">
        <button
          className={`px-5 py-2 rounded-full ${view === 'Feedback' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setView('Feedback')}
        >
          View Feedback
        </button>
        <button
          className={`px-5 py-2 rounded-full ${view === 'Complaint' ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setView('Complaint')}
        >
          View Complaints
        </button>
      </div>
      <h3 className="text-xl font-semibold text-center mb-2">{view === 'Feedback' ? 'Feedback' : 'Complaints'}</h3>
      {filteredSubmissions.length === 0 ? (
        <p className="text-center">No {view.toLowerCase()} available.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">User Type</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Description</th>
              {view === 'Feedback' && <th className="border p-2">Rating</th>}
              {view === 'Complaint' && <th className="border p-2">Urgency</th>}
              <th className="border p-2">Picture</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.map(sub => (
              <tr key={sub._id}>
                <td className="border p-2">{sub.userType}</td>
                <td className="border p-2">{sub.category}</td>
                <td className="border p-2">{sub.description}</td>
                {view === 'Feedback' && (
                  <td className="border p-2">{'★'.repeat(sub.rating) + '☆'.repeat(5 - sub.rating)}</td>
                )}
                {view === 'Complaint' && <td className="border p-2">{sub.urgency}</td>}
                <td className="border p-2">
                  {sub.picture ? (
                    <img src={`http://localhost:5000${sub.picture}`} alt="Submission" className="w-12" />
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="border p-2">{sub.status}</td>
                <td className="border p-2 flex gap-2">
                  {sub.status === 'Open' && (
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