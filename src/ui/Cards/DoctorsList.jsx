
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Likes from '../Buttons/LikeButton';

const DoctorProfileCard = () => {
    const navigate = useNavigate();

    return (
        <div className="group relative w-full max-w-lg bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
            {/* Profile Section */}
            <div className="flex items-center gap-4">
                <img 
                    src="https://via.placeholder.com/80" 
                    alt="Doctor Profile" 
                    className="w-20 h-20 rounded-full border-2 border-emerald-500"
                />
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">Dr. Prasoon Rawat</h2>
                    <p className="text-sm text-gray-500">Cardiologist | AIIMS Delhi</p>
                    <p className="text-sm text-gray-500">15+ Years Experience</p>
                </div>
            </div>
            
            {/* About Section */}
            <div className="mt-4">
                <p className="text-gray-600 text-sm">Passionate cardiologist dedicated to heart health and preventive care. Featured speaker at global conferences.</p>
            </div>
            
            {/* Stats Section */}
            <div className="flex justify-between items-center mt-4">
                <div>
                    <h4 className="text-lg font-semibold text-gray-800">10K+</h4>
                    <p className="text-sm text-gray-500">Followers</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-gray-800">120+</h4>
                    <p className="text-sm text-gray-500">Articles & Webinars</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-gray-800">4.9 ⭐</h4>
                    <p className="text-sm text-gray-500">Patient Rating</p>
                </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
                <button 
                    className="flex-1 bg-emerald-500 text-white font-medium py-2 rounded-xl hover:bg-emerald-600"
                    onClick={() => navigate("/appointment")}
                >
                    Schedule Appointment
                </button>
                <button 
                    className="flex-1 bg-gray-200 text-gray-800 font-medium py-2 rounded-xl hover:bg-gray-300"
                >
                    Join
                </button>
            </div>
            
            {/* Like Button */}
            <div className="mt-4 flex justify-end">
                <Likes />
            </div>
        </div>
    );
}

export default DoctorProfileCard;
