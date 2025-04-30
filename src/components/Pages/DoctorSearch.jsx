// import Navbar from "../DoctorSearchNavbar";
// import Footer from "../Footer";
// import DocterCard from "../../ui/Cards/DoctorsList"

// const DoctorSearch = () => {

//   return (
//     <div className="bg-[#f4f4f4 px-5">
//         <Navbar />
//         <div className="max-w-7xl mx-auto pt-20 px-6">
//   <div className=""> 
//     <h1 className="text-blue-500" >Showing result for <span >[]</span>, Location : India </h1>
//     <h1 className="pb-7">Turn on 'find nearby' for near search</h1>
//     <div 
//       className="grid p-4 gap-6 justify-center"
//       style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
//         gridAutoRows: "1fr", // Ensures equal height rows
//         alignItems: "stretch", // Ensures uniform height
//       }}
//     >
      
//       {Array(10).fill().map((_, index) => (
//         <div key={index} className="flex justify-center">
//           <DocterCard />
//         </div>
//       ))}
//     </div>
//   </div>
// </div>
//         <Footer />
//     </div>
//   );
// };

// export default DoctorSearch;


import Navbar from "../Navbar";
import Footer from "../Footer";
import DocterCard from "../../ui/Cards/DoctorsList";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

const DoctorSearch = () => {
  const location = useLocation();
  const searchTermFromRoute = location.state?.searchTerm || '';

  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchTermFromRoute);
  const [cityFilter, setcityFilter] = useState("");
  const [specialization, setspecialization] = useState("");
  const [language , setLanguage] = useState("");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observer = useRef();

  const fetchDoctors = async (pageNum = 1, append = false) => {
    try {
      setLoading(true);
      const response = await axios.get("https://backend-453n.onrender.com/api/doctors/doctors", {
        params: {
          page: pageNum,
          limit: 15,
          search: searchTerm,
          city: cityFilter,
          specialization,
          language,
        },
      });

      const newDoctors = response.data.doctors;

      setDoctors(prev => append ? [...prev, ...newDoctors] : newDoctors);
      setHasMore(pageNum < response.data.totalPages);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchDoctors(1, false);
  }, [searchTerm, cityFilter, specialization, language]);

  useEffect(() => {
    if (page > 1) {
      fetchDoctors(page, true);
    }
  }, [page]);

  const lastDoctorRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <div className="bg-[#f4f4f4] px-5 min-h-screen">
      <Navbar initialsearchTerm={searchTermFromRoute} />

      <div className="max-w-7xl mx-auto pt-20 px-6">
        {/* Search Bar */}
        <div className="bg-[#e0e0e0] p-4 rounded-md flex gap-2">
          <div className="flex items-center bg-white px-4 py-2 rounded">
            <span className="mr-2">📍</span>
            <input
              type="text"
              placeholder="city ..."
              value={cityFilter}  
              onChange={(e) => setcityFilter(e.target.value)}
              className="bg-transparent focus:outline-none"
            />
          </div>
          <input
            type="text"
            placeholder="Search for the doctor ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded bg-white focus:outline-none"
          />
          <div className="flex items-center bg-white px-4 py-2 rounded">
            <span className="mr-2">A/अ</span>
            <input
              type="text"
              placeholder="Language ..."
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* specializations */}
        <div className="flex gap-3 mt-4 flex-wrap">
          {["Cardiology", "Neurologist", "Dermatologist", "Pediatrician"].map((spec) => (
            <button
              key={spec}
              // onClick={() => setspecialization(spec)}
              onClick={() => setspecialization(specialization === spec ? "" : spec)}
              className={`px-4 py-1 rounded-full text-sm ${specialization === spec ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Doctor List */}
        <div className="pt-6">
          <h1 className="text-blue-500">
            Showing results for <span className="font-bold">{searchTerm || "All Doctors"}</span>, city: <span className="font-bold">{cityFilter || "India"}</span>
          </h1>
          <div
            className="grid p-4 gap-6 justify-center"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gridAutoRows: "1fr",
              alignItems: "stretch",
            }}
          >
            {doctors.map((doctor, index) => {
              if (doctors.length === index + 1) {
                return (
                  <div key={doctor._id} ref={lastDoctorRef} className="flex justify-center">
                    <DocterCard doctor={doctor} />
                  </div>
                );
              } else {
                return (
                  <div key={doctor._id} className="flex justify-center">
                    <DocterCard doctor={doctor} />
                  </div>
                );
              }
            })}
            {loading && Array(5).fill().map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col p-4 bg-white rounded-2xl shadow-md w-full max-w-lg h-[300px]" />
            ))}
          </div>
          {!loading && !hasMore && (
            // <p className="text-center text-gray-400 mt-4">You've reached the end 🎉</p>
            <div className="text-center text-gray-500 py-4 flex flex-col items-center">
            <hr className="w-[97vw] border-gray-300 mb-2" />
            <p className="text-sm">No more results to show</p>
          </div>
        
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DoctorSearch;
