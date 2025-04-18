import React from "react";
import QrCode from "../components/QrCodeGenerator";

const ShareQrCode = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-black text-white">
      {/* Left Section */}
      <div className="rounded-lg w-1/2 border border-white shadow-sm mx-2 my-4 flex justify-center items-center">
        Qr Content
      </div>

      {/* Right Section */}
      <div className="w-1/2 mx-2 my-4 flex flex-col items-center justify-center space-y-4">
        <QrCode />
      </div>
    </div>
  );
};

export default ShareQrCode;
