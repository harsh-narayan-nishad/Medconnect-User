import React, { useState } from "react";

const AppointmentTable = () => {
  const [filters, setFilters] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); // ✅ date state
  const [statusFilter, setStatusFilter] = useState({
    visited: false,
    scheduled: false,
    notConfirmed: false,
  });

  const appointments = [
    {
      date: "2025-05-01",
      time: "10:00 - 10:30",
      doctor: "Dr. A Sharma",
      test: "CBC",
      disease: "Anemia",
      status: "booked",
      email: "user1@example.com",
    },
    {
      date: "2024-05-01",
      time: "07:00 - 07:30",
      doctor: "Dr. Prasoon Rawat",
      test: "blood test",
      disease: "Headache",
      status: "booked",
      email: "user1@example.com",
    },
    {
      date: "2025-05-01",
      time: "11:00 - 11:30",
      doctor: "Dr. B Gupta",
      test: "X-Ray",
      disease: "Chest Pain",
      status: "visited",
      email: "user2@example.com",
    },
    {
      date: "2025-05-01",
      time: "11:00 - 11:30",
      doctor: "Dr. B Gupta",
      test: "X-Ray",
      disease: "Chest Pain",
      status: "visited",
      email: "user2@example.com",
    },
    {
      date: "2025-05-01",
      time: "11:00 - 11:30",
      doctor: "Dr. B Gupta",
      test: "X-Ray",
      disease: "Chest Pain",
      status: "visited",
      email: "user2@example.com",
    },
    {
      date: "2025-05-01",
      time: "11:00 - 11:30",
      doctor: "Dr. B Gupta",
      test: "X-Ray",
      disease: "Chest Pain",
      status: "visited",
      email: "user2@example.com",
    },
    {
      date: "2025-05-01",
      time: "10:00 - 10:30",
      doctor: "Dr. A Sharma",
      test: "CBC",
      disease: "Anemia",
      status: "not confirmed",
      email: "user1@example.com",
    },
  ];

  const addFilter = (value) => {
    if (!filters.includes(value)) setFilters([...filters, value]);
  };

  const deleteAllFilters = () => {
    setFilters([]);
  };

  const toggleStatusFilter = (statusKey) => {
    setStatusFilter((prev) => ({ ...prev, [statusKey]: !prev[statusKey] }));
  };

  const filteredAppointments = appointments.filter((appt) => {
    if (
      filters.length > 0 &&
      !filters.some((filter) =>
        Object.values(appt).some((val) =>
          val.toLowerCase().includes(filter.toLowerCase())
        )
      )
    )
      return false;

    if (selectedDate && appt.date !== selectedDate) return false;

    if (
      (statusFilter.visited && appt.status !== "visited") ||
      (statusFilter.scheduled && appt.status !== "booked") ||
      (statusFilter.notConfirmed && appt.status !== "not confirmed")
    )
      return false;

    return true;
  });

  return (
    <div className="p-4 bg-white rounded-md">
      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={statusFilter.visited}
              onChange={() => toggleStatusFilter("visited")}
            />
            Visited
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={statusFilter.scheduled}
              onChange={() => toggleStatusFilter("scheduled")}
            />
            Booked
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={statusFilter.notConfirmed}
              onChange={() => toggleStatusFilter("notConfirmed")}
            />
            Not Confirmed
          </label>

          {/* ✅ Date Picker */}
          <label className="flex items-center gap-2">
            <span className="text-sm font-medium">Date:</span>
            <input
              type="date"
              className="border px-2 py-1 rounded-md"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </label>
        </div>

        {/* Filter text */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add filter"
            className="border px-2 py-1 rounded-md"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addFilter(e.target.value);
                e.target.value = "";
              }
            }}
          />
          <button
            onClick={deleteAllFilters}
            className="text-red-600 font-medium"
          >
            Delete All
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.map((f, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
            >
              {f}
            </span>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
  <table className="w-full table-auto border-gray-300 text-sm">
          <thead className="bg-orange-300">
            <tr>
              <th className="p-2 border border-gray-300">Date</th>
              <th className="p-2 border border-gray-300">Time</th>
              <th className="p-2 border border-gray-300">Doctor</th>
              <th className="p-2 border border-gray-300">Test</th>
              <th className="p-2 border border-gray-300">Disease</th>
              <th className="p-2 border border-gray-300">Status</th>
              <th className="p-2 border border-gray-300 text-center">Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appt, index) => (
              <tr key={index} className="hover:bg-orange-100">
                <td className="p-2 border border-gray-300">{appt.date}</td>
                <td className="p-2 border border-gray-300">{appt.time}</td>
                <td className="p-2 border border-gray-300">{appt.doctor}</td>
                <td className="p-2 border border-gray-300">{appt.test}</td>
                <td className="p-2 border border-gray-300">{appt.disease}</td>
                <td
                  className={`p-2 border border-gray-300 capitalize ${
                    appt.status === "visited"
                      ? "text-green-600"
                      : appt.status === "not confirmed"
                      ? "text-orange-600"
                      : "text-blue-600"
                  }`}
                >
                  {appt.status}
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  <a href={`mailto:${appt.email}`}></a>
                </td>
              </tr>
            ))}
            {filteredAppointments.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-800 border border-gray-300">
                  No matching appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTable;
