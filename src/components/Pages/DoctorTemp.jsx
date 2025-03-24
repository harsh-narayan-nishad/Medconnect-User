import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Hook to get URL params
import Navbar from "../DoctorSearchNavbar";
import Footer from "../Footer";
import DocterCard from "../../ui/Cards/DoctorsList";

const App = () => {
  const location = useLocation(); // Get current URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query"); // Get search term

  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    // Simulate fetching filtered results
    const doctors = Array(10).fill().map((_, index) => ({
      id: index,
      name: `Doctor ${index + 1}`,
      specialty: "Cardiologist",
    }));

    if (searchQuery) {
      const filtered = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors(doctors);
    }
  }, [searchQuery]);

  return (
    <div className="bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <h2 className="text-2xl font-bold mb-4">
          Showing results for: <span className="text-orange-500">{searchQuery}</span>
        </h2>
        <div className="p-4">
          <div
            className="grid gap-6 justify-center"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gridAutoRows: "1fr",
              alignItems: "stretch",
            }}
          >
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="flex justify-center">
                  <DocterCard name={doctor.name} specialty={doctor.specialty} />
                </div>
              ))
            ) : (
              <p>No doctors found for "{searchQuery}"</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
