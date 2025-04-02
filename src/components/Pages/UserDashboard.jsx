import Navbar from "../Navbar";

import QrCode from "../QrCode";
import Footer from "../Footer";
import PdfUpload from "../PdfUpload";
import ProfilePhoto from "../UserProfileDetails";

const UserDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="w-[100vw] mx-auto">
  <ProfilePhoto />
</div>

      <div className="max-w-7xl mx-auto  px-6">
        
        {/* <div className="text-center">
        
          <span className="bg-neutral-900 text-orange-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
            Profile
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
            Effortlessly Manage{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
              Your Health
            </span>
          </h2>
        </div> */}
        <QrCode />

        <div className="text-center">
          <span className="bg-neutral-900 text-orange-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
            Upload Pdf
          </span>

          <PdfUpload />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default UserDashboard;
