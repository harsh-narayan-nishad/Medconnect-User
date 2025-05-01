import React, { useState } from 'react';
import Navbar from "../Navbar";
import Footer from "../Footer";
import PdfUpload from "../PdfUpload";
import ProfilePhoto from "../UserProfileDetails";
import { qrCode } from "../../constants/index";
import Slider from "../Slider";


const UserDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="w-[100vw] mx-auto">
        <ProfilePhoto />
      </div>

      {/* Slider with three buttons */}
      <Slider />

      <div className="max-w-7xl mx-auto  px-6 ">
        <div className="relative mt-20">
        <div className="flex flex-wrap mt-10 lg:mt-20">
          </div>
          {/* <div className="flex flex-wrap mt-10 lg:mt-20 bg-purple-400">
            {qrCode.map((qr, index) => (
              <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
                <div className="flex">
                  <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full">
                    {qr.icon}
                  </div>
                  <div>
                    <h5 className="mt-1 mb-6 text-xl">{qr.text}</h5>
                    <p className="text-md p-2 mb-20 text-neutral-500">
                      {qr.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {<QRCode_generator />} // comment this first 
          </div> */}


        </div>


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
