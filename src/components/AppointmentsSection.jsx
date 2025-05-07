// import React, { useState, useEffect } from "react";

// const AppointmentTable = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [filters, setFilters] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [submissionDate, setsubmissionDate] = useState("");
//   const [statusFilter, setStatusFilter] = useState({
//     completed: false,
//     confirmed: false,
//     pending: false,
//   });

//   // Fetch appointments from backend
//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await fetch("https://backend-453n.onrender.com/api/user/dashboard/appointments", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch appointments");
//         }

//         const data = await res.json();
//         setAppointments(data.appointments || []);
//       } catch (err) {
//         console.error("Error fetching appointments:", err);
//       }
//     };

//     fetchAppointments();
//   }, []);

//   // Filter logic
//   const addFilter = (value) => {
//     if (!filters.includes(value)) setFilters([...filters, value]);
//   };

//   const deleteAllFilters = () => setFilters([]);

//   const toggleStatusFilter = (key) =>
//     setStatusFilter((prev) => ({ ...prev, [key]: !prev[key] }));

//   const filteredAppointments = appointments.filter((appt) => {
//     if (
//       filters.length &&
//       !filters.some((f) =>
//         Object.values(appt).some((v) =>
//           String(v).toLowerCase().includes(f.toLowerCase())
//         )
//       )
//     )
//       return false;

//       if (selectedDate && new Date(appt.date).toISOString().split("T")[0] !== selectedDate){
//         return false;
//       }

//     if (
//       (statusFilter.completed && appt.status.toLowerCase() !== "completed") ||
//       (statusFilter.confirmed && appt.status.toLowerCase() !== "accepted") ||
//       (statusFilter.pending && appt.status.toLowerCase() !== "pending")
//     ){
//       return false;
//     }

//     return true;
//   });

//   return (
//     <div className="bg-white rounded-xl p-6">
//       {/* Filter Controls */}
//       <div className="flex flex-wrap gap-4 mb-4 justify-between items-center">
//         <div className="flex flex-wrap gap-4">
//           {["Completed", "Confirmed", "Pending"].map((key) => (
//             <label
//               key={key}
//               className="flex items-center gap-2 text-sm text-gray-600"
//             >
//               <input
//                 type="checkbox"
//                 checked={statusFilter[key]}
//                 onChange={() => toggleStatusFilter(key)}
//                 className="accent-orange-500"
//               />
//               {key === "notConfirmed"
//                 ? "Not Confirmed"
//                 : key.charAt(0).toUpperCase() + key.slice(1)}
//             </label>
//           ))}
//           <input
//             type="date"
//             className="border rounded-md px-3 py-1 text-sm"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//           />
//         </div>

//         <div className="flex items-center gap-2">
//           <input
//             type="text"
//             placeholder="Search filter..."
//             className="border px-3 py-1 rounded-md text-sm"
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 addFilter(e.target.value);
//                 e.target.value = "";
//               }
//             }}
//           />
//           <button
//             onClick={deleteAllFilters}
//             className="text-red-600 text-sm font-semibold"
//           >
//             Clear Filters
//           </button>
//         </div>
//       </div>

//       {/* Filter Chips */}
//       {filters.length > 0 && (
//         <div className="flex flex-wrap gap-2 mb-4">
//           {filters.map((f, i) => (
//             <span
//               key={i}
//               className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"
//             >
//               {f}
//             </span>
//           ))}
//         </div>
//       )}

//       {/* Appointment Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm border-collapse">
//           <thead className="bg-orange-500 text-white">
//             <tr>
//               {["Submission Date", "Appointment Date" ,"Time", "Doctor", "Visited For", "Status"].map(
//                 (head, i) => (
//                   <th
//                     key={i}
//                     className="p-2 text-left border border-orange-600"
//                   >
//                     {head}
//                   </th>
//                 )
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAppointments.length ? (
//               filteredAppointments.map((appt, i) => (
//                 <tr key={i} className="hover:bg-orange-50 transition-colors">
//                   <td className="p-2 border">{appt.submissionDate}</td>
//                   <td className="p-2 border">{appt.date}</td>
//                   <td className="p-2 border">{appt.time}</td>
//                   <td className="p-2 border">{appt.doctorName}</td>
//                   <td className="p-2 border">{appt.visitedFor}</td>
//                   <td
//                     className={`p-2 border capitalize font-medium ${
//                       appt.status.toLowerCase() === "completed"
//                         ? "text-green-600"
//                         : appt.status.toLowerCase() === "accepted"
//                         ? "text-yellow-600"
//                         : "text-blue-600"
//                     }`}
//                   >
//                     {appt.status}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center p-4 text-gray-500">
//                   No matching appointments found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AppointmentTable;


import React, { useState, useEffect } from "react";

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [filters, setFilters] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [statusFilter, setStatusFilter] = useState({
    completed: false,
    confirmed: false,
    pending: false,
  });

  // Fetch appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("https://backend-453n.onrender.com/api/user/dashboard/appointments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch appointments");

        const data = await res.json();
        setAppointments(data.appointments || []);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, []);

  const addFilter = (value) => {
    if (!filters.includes(value)) setFilters([...filters, value]);
  };

  const deleteAllFilters = () => setFilters([]);

  const toggleStatusFilter = (key) => {
    setStatusFilter((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredAppointments = appointments.filter((appt) => {
    // Text filter
    if (
      filters.length &&
      !filters.some((f) =>
        Object.values(appt).some((v) =>
          String(v).toLowerCase().includes(f.toLowerCase())
        )
      )
    )
      return false;

    // Date filter
    if (
      selectedDate &&
      new Date(appt.date).toISOString().split("T")[0] !== selectedDate
    ) {
      return false;
    }

    // Status filter
    const activeStatuses = Object.keys(statusFilter).filter((key) => statusFilter[key]);
    if (activeStatuses.length > 0) {
      const statusMap = {
        completed: "completed",
        confirmed: "accepted",
        pending: "pending",
      };
      if (!activeStatuses.some((key) => appt.status.toLowerCase() === statusMap[key])) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="bg-white rounded-xl p-6">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-4 justify-between items-center">
        <div className="flex flex-wrap gap-4">
          {["completed", "confirmed", "pending"].map((key) => (
            <label
              key={key}
              className="flex items-center gap-2 text-sm text-gray-600 capitalize"
            >
              <input
                type="checkbox"
                checked={statusFilter[key]}
                onChange={() => toggleStatusFilter(key)}
                className="accent-orange-500"
              />
              {key}
            </label>
          ))}
          <input
            type="date"
            className="border rounded-md px-3 py-1 text-sm"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search filter..."
            className="border px-3 py-1 rounded-md text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addFilter(e.target.value);
                e.target.value = "";
              }
            }}
          />
          <button
            onClick={deleteAllFilters}
            className="text-red-600 text-sm font-semibold"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.map((f, i) => (
            <span
              key={i}
              className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"
            >
              {f}
            </span>
          ))}
        </div>
      )}

      {/* Appointment Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-orange-500 text-white">
            <tr>
              {["Submission Date", "Appointment Date", "Time", "Doctor", "Visited For", "Status"].map(
                (head, i) => (
                  <th key={i} className="p-2 text-left border border-orange-600">
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length ? (
              filteredAppointments.map((appt, i) => (
                <tr key={i} className="hover:bg-orange-50 transition-colors">
                  <td className="p-2 border">
                    {new Date(appt.submissionDate).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    {new Date(appt.date).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">{appt.time}</td>
                  <td className="p-2 border">{appt.doctorName}</td>
                  <td className="p-2 border">{appt.visitedFor}</td>
                  <td
                    className={`p-2 border capitalize font-medium ${
                      appt.status.toLowerCase() === "completed"
                        ? "text-green-600"
                        : appt.status.toLowerCase() === "accepted"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  >
                    {appt.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  Loading appointments...
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
