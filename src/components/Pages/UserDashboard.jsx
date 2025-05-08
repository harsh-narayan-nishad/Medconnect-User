import React, { useState } from 'react';
import Navbar from "../Navbar";
import Footer from "../Footer";
import PdfUpload from "../PdfUpload";
import ProfilePhoto from "../UserProfileDetails";
import { qrCode } from "../../constants/index";
import SiderData from "../Sider";

const UserDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="w-[100vw] mx-auto">
        <ProfilePhoto />
      </div>

      <div className="max-w-7xl mx-auto  px-6">
   
        
          <SiderData/>

        <Footer />
      </div>
    </>
  );
};

export default UserDashboard;
