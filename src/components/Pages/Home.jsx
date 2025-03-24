import Navbar from "../Navbar";
import HeroSection from "../HeroSection";
import FeatureSection from "../FeatureSection";
import Workflow from "../Workflow";
import Footer from "../Footer";
import Pricing from "../Pricing";
import Testimonials from "../Testimonials";
import Chat from "../Chat"


const App = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
 
        <FeatureSection />

        <Pricing />
        <Testimonials />
        <Chat/>
        <Footer />
      </div>
    </>
  );
};

export default App;
