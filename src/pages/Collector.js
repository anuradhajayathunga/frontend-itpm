import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import SummaryApi from "../common";
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Calendar, X, Plus, AlignLeft, Clock, CheckCircle } from "lucide-react";

const Collector = () => {
  const user = useSelector((state) => state?.user?.user);
  const collectorEmail = user?.email;

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedDate: new Date().toISOString().split("T")[0],
  });

  // Status colors
  const statusColors = {
    pending: "#FFA500",
    completed: "#32CD32",
    inProgress: "#3498db",
    cancelled: "#FF6347",
  };

  // Fetch tasks for the collector
  const fetchTasks = async (email) => {
    setLoading(true);
    try {
      const res = await fetch(SummaryApi.get_collector_tasks(email).url);
      const data = await res.json();
      const formattedTasks = data.map((task) => ({
        id: task.id || Math.random().toString(36).substring(2, 9),
        title: task.title,
        start: task.assignedDate,
        backgroundColor: statusColors[task.status?.toLowerCase() || "pending"],
        borderColor: statusColors[task.status?.toLowerCase() || "pending"],
        extendedProps: {
          description: task.description,
          status: task.status || "pending",
          email: task.uemail,
          phone: task.phone,
          city: task.city,
          address: task.address,
          wasteType: task.wasteType || [],
        },
      }));
      setEvents(formattedTasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (collectorEmail) {
      fetchTasks(collectorEmail);
    }
  }, [collectorEmail]);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setShowAddTaskModal(false);
  };

  const openAddTaskModal = () => {
    setShowAddTaskModal(true);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();
    try {
      const taskData = {
        ...formData,
        email: collectorEmail,
      };

      const res = await fetch(SummaryApi.assign_task.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      const data = await res.json();

      if (res.ok) {
        setFormData({
          title: "",
          description: "",
          assignedDate: new Date().toISOString().split("T")[0],
        });
        fetchTasks(collectorEmail);
        setShowAddTaskModal(false);
      } else {
        console.error("Task assignment failed:", data.message);
      }
    } catch (err) {
      console.error("Error assigning task:", err);
    }
  };

  // Function to get the status badge with appropriate color
  const StatusBadge = ({ status }) => {
    const statusLower = status?.toLowerCase() || "pending";
    const getStatusInfo = () => {
      switch (statusLower) {
        case "completed":
          return {
            icon: <CheckCircle size={14} />,
            text: "Completed",
            bgColor: "bg-green-100",
            textColor: "text-green-800",
            borderColor: "border-green-200",
          };
        case "inprogress":
        case "in progress":
          return {
            icon: <Clock size={14} />,
            text: "In Progress",
            bgColor: "bg-blue-100",
            textColor: "text-blue-800",
            borderColor: "border-blue-200",
          };
        case "cancelled":
          return {
            icon: <X size={14} />,
            text: "Cancelled",
            bgColor: "bg-red-100",
            textColor: "text-red-800",
            borderColor: "border-red-200",
          };
        default:
          return {
            icon: <Clock size={14} />,
            text: "Pending",
            bgColor: "bg-yellow-100",
            textColor: "text-yellow-800",
            borderColor: "border-yellow-200",
          };
      }
    };

    const { icon, text, bgColor, textColor, borderColor } = getStatusInfo();

    return (
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full ${bgColor} ${textColor} text-xs font-medium border ${borderColor}`}
      >
        <span className="mr-1">{icon}</span>
        {text}
      </div>
    );
  };

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-fadeIn">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold text-blue-800">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-5">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <Header/>
      <div className="bg-white rounded-lg shadow-md p-6 mx-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 rounded-lg mr-3">
              <Calendar className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Task Calendar
              </h1>
              <p className="text-sm text-gray-500">
                Manage your collection schedule
              </p>
            </div>
          </div>
          <button
            onClick={openAddTaskModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition duration-300 shadow-sm"
          >
            <Plus size={18} className="mr-1" />
            Add Task
          </button>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="calendar-container">
              <style jsx>{`
                .calendar-container .fc {
                  font-family: Inter, system-ui, -apple-system, sans-serif;
                }
                .calendar-container .fc-toolbar-title {
                  font-size: 1.5rem;
                  color: #1e40af;
                  font-weight: 600;
                }
                .calendar-container .fc-button {
                  background-color: #f9fafb;
                  border-color: #e5e7eb;
                  color: #4b5563;
                  font-weight: 500;
                  text-transform: capitalize;
                  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                  padding: 0.5rem 1rem;
                }
                .calendar-container
                  .fc-button-primary:not(:disabled).fc-button-active,
                .calendar-container .fc-button-primary:not(:disabled):active {
                  background-color: #2563eb;
                  border-color: #2563eb;
                  color: white;
                }
                .calendar-container .fc-button-primary:hover {
                  background-color: #f3f4f6;
                  border-color: #d1d5db;
                }
                .calendar-container .fc-day-today {
                  background-color: #eff6ff !important;
                }
                .calendar-container .fc-daygrid-day-number {
                  font-size: 0.875rem;
                  color: #374151;
                  padding: 0.5rem;
                }
                .calendar-container .fc-event {
                  border-radius: 4px;
                  font-size: 0.8rem;
                  border-width: 0;
                  padding: 2px 4px;
                  font-weight: 500;
                  cursor: pointer;
                  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                }
                .calendar-container .fc-daygrid-day-top {
                  justify-content: center;
                  padding-top: 4px;
                }
                .calendar-container .fc-col-header-cell {
                  background-color: #f9fafb;
                  padding: 0.75rem 0;
                }
                .calendar-container .fc-col-header-cell-cushion {
                  color: #4b5563;
                  font-weight: 600;
                  text-decoration: none !important;
                }
                .calendar-container .fc-daygrid-day.fc-day-sat,
                .calendar-container .fc-daygrid-day.fc-day-sun {
                  background-color: #f9fafb;
                }
                .calendar-container .fc-event-title {
                  padding: 2px 0;
                }
                .calendar-container .fc-theme-standard td,
                .calendar-container .fc-theme-standard th {
                  border-color: #f3f4f6;
                }
              `}</style>
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,dayGridWeek",
                }}
                events={events}
                eventClick={handleEventClick}
                height="auto"
                aspectRatio={1.8}
                eventTimeFormat={{
                  hour: "numeric",
                  minute: "2-digit",
                  meridiem: "short",
                }}
                dayMaxEvents={3}
                eventDisplay="block"
                themeSystem="standard"
                firstDay={1} // Start week on Monday
                fixedWeekCount={false}
                showNonCurrentDates={true}
                businessHours={{
                  daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
                  startTime: "08:00",
                  endTime: "18:00",
                }}
              />
            </div>
          )}
        </div>

        {/* View Task Modal */}
        <Modal
          isOpen={!!selectedEvent}
          onClose={closeModal}
          title="Task Details"
        >
          {selectedEvent && (
            <div className="space-y-5">
              {/* Header with title and date */}
              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-800">
                  {selectedEvent.title}
                </h3>
                <div className="flex items-center mt-2 text-blue-600">
                  <Calendar size={16} className="mr-2" />
                  <span className="text-sm">
                    {new Date(selectedEvent.startStr).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div>
                <StatusBadge status={selectedEvent.extendedProps.status} />
              </div>

              {/* Content Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Contact Card */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="bg-indigo-50 px-4 py-2 border-b border-gray-200">
                    <h4 className="font-medium text-indigo-700">
                      Contact Information
                    </h4>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        {selectedEvent.extendedProps.email || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        {selectedEvent.extendedProps.phone || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location Card */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="bg-green-50 px-4 py-2 border-b border-gray-200">
                    <h4 className="font-medium text-green-700">
                      Location Details
                    </h4>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        City
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        {selectedEvent.extendedProps.city || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Address
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        {selectedEvent.extendedProps.address || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Waste Type */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-amber-50 px-4 py-2 border-b border-gray-200">
                  <h4 className="font-medium text-amber-700">Waste Type</h4>
                </div>
                <div className="p-4">
                  {Array.isArray(selectedEvent.extendedProps.wasteType) &&
                  selectedEvent.extendedProps.wasteType.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.extendedProps.wasteType.map(
                        (waste, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full border border-amber-200"
                          >
                            {waste}
                          </span>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      No waste type specified
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-purple-50 px-4 py-2 border-b border-gray-200 flex items-center">
                  <AlignLeft size={16} className="mr-2 text-purple-700" />
                  <h4 className="font-medium text-purple-700">Description</h4>
                </div>
                <div className="p-4">
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
                    {selectedEvent.extendedProps.description ? (
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {selectedEvent.extendedProps.description}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500 italic">
                        No description provided
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-300 shadow-sm"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* View Task Modal */}
        <Modal
          isOpen={!!selectedEvent}
          onClose={closeModal}
          title="Task Details"
        >
          {selectedEvent && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {selectedEvent.title}
                </h3>
                <p className="text-sm text-gray-500 flex items-center">
                  <Calendar size={16} className="mr-1" />
                  {new Date(selectedEvent.startStr).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>

              <div>
                <StatusBadge status={selectedEvent.extendedProps.status} />
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                {/* Contact Information */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 border-b pb-1 mb-2">
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm text-gray-700">
                        {selectedEvent.extendedProps.email || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm text-gray-700">
                        {selectedEvent.extendedProps.phone || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 border-b pb-1 mb-2">
                    Location
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <p className="text-xs text-gray-500">City</p>
                      <p className="text-sm text-gray-700">
                        {selectedEvent.extendedProps.city || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="text-sm text-gray-700">
                        {selectedEvent.extendedProps.address || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Waste Type */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 border-b pb-1 mb-2">
                    Waste Type
                  </h4>
                  {Array.isArray(selectedEvent.extendedProps.wasteType) &&
                  selectedEvent.extendedProps.wasteType.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.extendedProps.wasteType.map(
                        (waste, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {waste}
                          </span>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-700">
                      No waste type specified
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 border-b pb-1 mb-2 flex items-center">
                    <AlignLeft size={16} className="mr-1" /> Description
                  </h4>
                  <p className="text-sm text-gray-700 bg-white p-3 rounded-md border border-gray-100">
                    {selectedEvent.extendedProps.description ||
                      "No description provided."}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default Collector;
