
// import React, { useState, useEffect } from "react";
// const AppointmentTable = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [filters, setFilters] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
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

//         if (!res.ok) throw new Error("Failed to fetch appointments");

//         const data = await res.json();
//         setAppointments(data.appointments || []);
//       } catch (err) {
//         console.error("Error fetching appointments:", err);
//       }
//     };

//     fetchAppointments();
//   }, []);

//   const addFilter = (value) => {
//     if (!filters.includes(value)) setFilters([...filters, value]);
//   };

//   const deleteAllFilters = () => setFilters([]);

//   const toggleStatusFilter = (key) => {
//     setStatusFilter((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   const filteredAppointments = appointments.filter((appt) => {
//     // Text filter
//     if (
//       filters.length &&
//       !filters.some((f) =>
//         Object.values(appt).some((v) =>
//           String(v).toLowerCase().includes(f.toLowerCase())
//         )
//       )
//     )
//       return false;

//     // Date filter
//     if (
//       selectedDate &&
//       new Date(appt.date).toISOString().split("T")[0] !== selectedDate
//     ) {
//       return false;
//     }

//     // Status filter
//     const activeStatuses = Object.keys(statusFilter).filter((key) => statusFilter[key]);
//     if (activeStatuses.length > 0) {
//       const statusMap = {
//         completed: "completed",
//         confirmed: "accepted",
//         pending: "pending",
//       };
//       if (!activeStatuses.some((key) => appt.status.toLowerCase() === statusMap[key])) {
//         return false;
//       }
//     }

//     return true;
//   });

//   return (
//     <div className="bg-white rounded-xl p-6">
//       {/* Filter Controls */}
//       <div className="flex flex-wrap gap-4 mb-4 justify-between items-center">
//         <div className="flex flex-wrap gap-4">
//           {["completed", "confirmed", "pending"].map((key) => (
//             <label
//               key={key}
//               className="flex items-center gap-2 text-sm text-gray-600 capitalize"
//             >
//               <input
//                 type="checkbox"
//                 checked={statusFilter[key]}
//                 onChange={() => toggleStatusFilter(key)}
//                 className="accent-orange-500"
//               />
//               {key}
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
//               {["Submission Date", "Appointment Date", "Time", "Doctor", "Visited For", "Status"].map(
//                 (head, i) => (
//                   <th key={i} className="p-2 text-left border border-orange-600">
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
//                   <td className="p-2 border">
//                     {new Date(appt.submissionDate).toLocaleDateString()}
//                   </td>
//                   <td className="p-2 border">
//                     {new Date(appt.date).toLocaleDateString()}
//                   </td>
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
//                 <td colSpan="6" className="text-center p-4 text-gray-500">
//                     Loading appointments...
//                   {/* <Loader /> */}

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

import { Menu, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { navItems } from "../constants";
import SearchBox from "../ui/Search2";
import DropDown from "../ui/Buttons/DropDown";
import DarkMode from "../ui/Buttons/NotificationsOnOff";
import ProfilePopUp from "../ui/Cards/UserProfilePopUp";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.fullname);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-sm border-b border-[#f4f4f4]">
      <div className="container px-4 mx-auto relative lg:text-sm flex justify-between items-center">
        {/* Logo */}
        <div
          className="cursor-pointer flex items-center flex-shrink-0"
          onClick={() => navigate("/")}
        >
          <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
          <span className="text-xl tracking-tight">Mediconnect</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-6">
          <li>
            <SearchBox className="max-w-[300px]" />
          </li>
          <li>
            <DropDown />
          </li>
          <li>
            <DarkMode />
          </li>
        </ul>

        {/* User Profile and Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          {userName ? (
            <div className="relative inline-block">
              <button
                ref={buttonRef}
                className="px-4 py-2 bg-gray-200 rounded-lg shadow-md"
                onClick={() => setIsVisible((prev) => !prev)}
              >
                {userName}
              </button>
              {isVisible && (
                <div
                  ref={dropdownRef}
                  className="absolute right-20 mt-2 w-48 shadow-lg rounded-lg"
                >
                  <ProfilePopUp />
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/signup")}
              className="bg-gradient-to-r text-white from-orange-500 to-orange-800 py-2 px-3 rounded-md"
            >
              Create an account
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex">
          <button onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}>
            {mobileDrawerOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed right-0 top-16 z-20 bg-neutral-900 w-full p-6 flex flex-col items-center lg:hidden">
          <ul className="space-y-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => navigate(item.href)}
                  className="text-white"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex space-x-4 mt-4">
            {userName ? (
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  setUserName(null);
                }}
                className="bg-red-500 text-white py-2 px-3 rounded-md"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="py-2 px-3 border rounded-md text-white"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
                >
                  Create an account
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

