import Navbar from "../Navbar";
import HeroSection from "../HeroSection";
import QrCode from "../QrCode";

import Footer from "../Footer";
import Pricing from "../Pricing";
import Testimonials from "../Testimonials";


const UserDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
       
        <QrCode />


        <Footer />
      </div>
    </>
  );
};

export default UserDashboard;
