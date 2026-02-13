import { useEffect, useState } from 'react';
import Qrcodeimg from './QrCodeGenerator';
import Appointment from './AppointmentsSection';
import Documents from './DocumentsSection'; // Assuming you have a Documents component

const Slider = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token'); // adjust this if you store it differently
                const res = await fetch('https://backend-453n.onrender.com/api/user/dashboard/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch user profile');
                }
                const data = await res.json();
                setUserInfo(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchUserProfile();
    }, []);


    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* QR Code Section */}
                        <div className="flex justify-center">
                            <div className="bg-white rounded-xl p-4 ">
                                <Qrcodeimg />
                            </div>
                        </div>

                        {/* Patient Info Section */}
                        <div className="md:col-span-2 bg-white rounded-xl p-6">
                            <h2 className="text-2xl font-bold mb-4 text-orange-600">Patient Information</h2>
                            {userInfo ? (
                                <ul className="space-y-3 text-gray-700">
                                    <li><strong>Name:</strong> {userInfo.fullname}</li>
                                    <li><strong>DOB:</strong> {userInfo.DOB}</li>
                                    <li><strong>Age:</strong> {userInfo.age}</li>
                                    <li><strong>Gender:</strong> {userInfo.gender}</li>
                                    <li><strong>Contact:</strong> +91-{userInfo.phone}</li>
                                </ul>
                            ) : (
                                <p className="text-gray-500">Loading...</p>
                            )}
                        </div>
                    </div>
                );

            case 'documents':
                return <Documents />; // Render your Documents component here

            case 'appointments':
                return <Appointment />;

            case 'recommendation':
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-orange-600">Doctors Recommendation</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border border-orange-100 rounded-lg p-4 bg-orange-50">
                                <h3 className="text-lg font-semibold text-gray-800">Dr. Ananya Mehta</h3>
                                <p className="text-sm text-gray-600">Cardiologist</p>
                                <p className="text-sm text-gray-700 mt-2">8 years experience | City Care Hospital</p>
                            </div>
                            <div className="border border-orange-100 rounded-lg p-4 bg-orange-50">
                                <h3 className="text-lg font-semibold text-gray-800">Dr. Rohan Singh</h3>
                                <p className="text-sm text-gray-600">Dermatologist</p>
                                <p className="text-sm text-gray-700 mt-2">10 years experience | Medico Health Center</p>
                            </div>
                            <div className="border border-orange-100 rounded-lg p-4 bg-orange-50">
                                <h3 className="text-lg font-semibold text-gray-800">Dr. Priya Nair</h3>
                                <p className="text-sm text-gray-600">General Physician</p>
                                <p className="text-sm text-gray-700 mt-2">6 years experience | Sunrise Clinic</p>
                            </div>
                            <div className="border border-orange-100 rounded-lg p-4 bg-orange-50">
                                <h3 className="text-lg font-semibold text-gray-800">Dr. Arjun Verma</h3>
                                <p className="text-sm text-gray-600">Orthopedic Specialist</p>
                                <p className="text-sm text-gray-700 mt-2">12 years experience | Ortho Plus Hospital</p>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4">
            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-lg overflow-hidden mb-6 shadow">
                {['profile', 'documents', 'appointments', 'recommendation'].map(tab => (
                    <button
                        key={tab}
                        className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === tab
                                ? 'bg-orange-500 text-white'
                                : 'text-gray-700 hover:bg-orange-100'
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === 'profile' ? 'Profile Info' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl p-6 shadow-md min-h-[300px]">
                {renderContent()}
            </div>
        </div>
    );
};

export default Slider;
