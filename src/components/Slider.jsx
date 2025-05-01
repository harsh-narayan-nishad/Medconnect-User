import React, { useState } from 'react';
// import { qrCode } from "../constants/index";
import Qrcodeimg from "./QrCodeGenerator";
import Appointment from "./AppointmentsSection";
import PdfUpload from "./PdfUpload";

const Slider = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':

        return <div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* QR Code Section */}
          <div className="w-full md:w-1/3 flex justify-center">
            <Qrcodeimg />
          </div>

          {/* Patient Info Section */}
          <div className="w-full md:w-2/3">
            <h2 className="text-xl font-semibold mb-2">Patient Information</h2>
            <p className="bg-gray-100 p-2 rounded mb-2">Name: John Doe</p>
            <p className="bg-gray-100 p-2 rounded mb-2">Age: 30</p>
            <p className="bg-gray-100 p-2 rounded mb-2">Gender: Male</p>
            <p className="bg-gray-100 p-2 rounded mb-2">Blood Group: O+</p>
            <p className="bg-gray-100 p-2 rounded">Contact: +91-1234567890</p>
          </div>
        </div>
        </div>;

      case 'documents':

        return <div >
           <PdfUpload />
        </div>;

      case 'appointments':

        return <div>
        <Appointment />
        </div>;

      default:
        return null;
    }
  };

  return (
    <div className="w-full mx-auto p-4">
      {/* Tabs */}
      <div className="flex justify-between bg-black overflow-hidden mb-4 p-2">
        <button
          className={`flex-1 py-2 rounded-md ${activeTab === 'profile' ? 'bg-orange-500 font-bold' : 'text-white'}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile Information
        </button>
        <button
          className={`flex-1 py-2 rounded-md ${activeTab === 'documents' ? 'bg-orange-500 font-bold' : 'text-white'}`}
          onClick={() => setActiveTab('documents')}
        >
          Documents
        </button>
        <button
          className={`flex-1 py-2 rounded-md ${activeTab === 'appointments' ? 'bg-orange-500 font-bold' : 'text-white'}`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
      </div>

      {/* Content Box */}
      <div style={{ border: '2px solid darkgrey' }} className="rounded-md p-4 min-h-[300px] bg-white shadow-sm ">
        {renderContent()}
      </div>
    </div>
  );
};

export default Slider;