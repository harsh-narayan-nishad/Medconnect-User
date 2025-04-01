import Navbar from "../Navbar";

import QrCode from "../QrCode";
import Footer from "../Footer";
import PdfUpload from "../PdfUpload"

const UserDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">

        <QrCode />

        <div className="text-center">
        <span className="bg-neutral-900 text-orange-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
          Upload Pdf
        </span>

        <PdfUpload/>
      </div>
     


       
       
        <Footer />
      </div>
    </>
  );
};

export default UserDashboard;
