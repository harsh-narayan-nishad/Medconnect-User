// import React from "react";
// import { useNavigate, Link } from "react-router-dom";

// const DoctorProfileCardClean = ({ doctor }) => {
//     const navigate = useNavigate();

//     return (
//         <div className="bg-white  rounded-lg overflow-hidden border border-gray-100">


//             <div className="px-4 py-5 sm:px-6">
//                 <div className="flex items-center">
//                     <div className="flex-shrink-0">
//                         <img
//                             className="h-16 w-16 rounded-full border-2 border-emerald-400"
//                             src={
//                                 doctor?.profileImage ||
//                                 "https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg="
//                             }
//                             alt="Doctor Profile"
//                         />
//                     </div>
//                     <div className="ml-4">
//                         <h3 className="text-lg font-semibold text-gray-900">
//                             {doctor?.fullname}
//                         </h3>
//                         <p className="text-sm text-gray-500">
//                             {doctor?.specialization}{" "}
//                             {doctor?.clinicName && `| ${doctor.clinicName}`}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                             {doctor?.experience
//                                 ? `${doctor.experience} Years Experience`
//                                 : "Experience N/A"}
//                         </p>
//                     </div>
//                 </div>
//                 <div className="mt-4">
//                     <p className="text-sm text-gray-700">
//                         {doctor?.description
//                             ? doctor.description.split(" ").slice(0, 10).join(" ") +
//                             (doctor.description.split(" ").length > 10 ? " ..." : "")
//                             : "No description provided."}
//                     </p>
//                 </div>

//                 {/* Location Section */}
//                 <div className="mt-4 bg-emerald-50 px-3 py-2 rounded-md border border-emerald-200">
//                     <p className="text-sm text-emerald-700 font-medium">
//                         📍 Location:{" "}
//                         <span className="font-normal">
//                             {doctor?.location || "Not Provided"}
//                         </span>
//                     </p>
//                 </div>

//                 <div className="mt-4 grid grid-cols-3 gap-4">
                 
//                     <div className="text-center">
//                         <div className="text-lg font-semibold text-emerald-600">
//                             {doctor?.stories?.length
//                                 ? `${doctor.stories.length} Stories`
//                                 : "No Stories"}
//                         </div>
//                         <div className="text-sm text-gray-500">Stories</div>
//                     </div>
//                     <div className="text-center">
//                         <div className="text-lg font-semibold text-emerald-600">
//                             {doctor?.rating ? `${doctor.rating} ⭐` : "N/A"}
//                         </div>
//                         <div className="text-sm text-gray-500">Rating</div>
//                     </div>
//                 </div>
//             </div>

//             <div className="bg-[#f4f4f4] px-4 py-3 sm:px-6 flex justify-between">
//                 <button
//                     onClick={() => navigate("/appointment")}
//                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
//                 >
//                     Schedule Appointment
//                 </button>
//                 <Link to={`/doctors-page/${doctor._id}`}>
//                     <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-[f4f4f4] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                         Profile
//                     </button>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default DoctorProfileCardClean;

import React from "react";
import { useNavigate, Link } from "react-router-dom";

const DoctorProfileCardClean = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              className="h-16 w-16 rounded-full border border-gray-200"
              src={
                doctor?.profileImage ||
                "https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg="
              }
              alt="Doctor Profile"
            />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {doctor?.fullname}
            </h3>
            <p className="text-sm text-gray-500">
              {doctor?.specialization}
              {doctor?.clinicName && ` | ${doctor.clinicName}`}
            </p>
            <p className="text-sm text-gray-500">
              {doctor?.experience
                ? `${doctor.experience} Years Experience`
                : "Experience N/A"}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-700">
            {doctor?.description
              ? doctor.description.split(" ").slice(0, 10).join(" ") +
                (doctor.description.split(" ").length > 10 ? " ..." : "")
              : "No description provided."}
          </p>
        </div>

        {/* Location Section */}
        <div className="mt-4 bg-emerald-50 px-3 py-2 rounded-md border border-emerald-200">
          <p className="text-sm text-emerald-700 font-medium">
            📍 Location:{" "}
            <span className="font-normal">
              {doctor?.location || "Not Provided"}
            </span>
          </p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-emerald-600">
              {doctor?.stories?.length
                ? `${doctor.stories.length} Stories`
                : "No Stories"}
            </div>
            <div className="text-sm text-gray-500">Stories</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-emerald-600">
              {doctor?.rating ? `${doctor.rating} ⭐` : "N/A"}
            </div>
            <div className="text-sm text-gray-500">Rating</div>
          </div>
        </div>
      </div>

      <div className="bg-[#f4f4f4] px-4 py-3 sm:px-6 flex justify-between">
        <button
          onClick={() => navigate("/appointment")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          Schedule Appointment
        </button>
        <Link to={`/doctors-page/${doctor._id}`}>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-[#f4f4f4] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DoctorProfileCardClean;
