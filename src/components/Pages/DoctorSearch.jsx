import Navbar from "../DoctorSearchNavbar";
import Footer from "../Footer";
import DocterCard from "../../ui/Cards/DoctorsList"


const App = () => {
  return (
    <div className="bg-[#f4f4f4 px-5">
        <Navbar />
        <div className="max-w-7xl mx-auto pt-20 px-6">
  <div className=""> 
    <h1 >Showing result for [], Location : Worldwide </h1>
    <h1 className="pb-7">Turn on 'find nearby' for near search</h1>
    <div 
      className="grid p-4 gap-6 justify-center"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gridAutoRows: "1fr", // Ensures equal height rows
        alignItems: "stretch", // Ensures uniform height
      }}
    >
      
      {Array(10).fill().map((_, index) => (
        <div key={index} className="flex justify-center">
          <DocterCard />
        </div>
      ))}
    </div>
  </div>
</div>
        <Footer />
    </div>
  );
};

export default App;
