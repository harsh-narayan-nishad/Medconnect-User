import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        console.log("Doctor ID from URL:", id);

        const response = await fetch(`https://backend-453n.onrender.com/api/doctors/doctors/${id}`);
        const data = await response.json();

        if (data && typeof data === 'object') {
          setDoctor(data);
        } else {
          console.error('Invalid doctor data:', data);
        }
      } catch (error) {
        console.error('Error fetching doctor:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!doctor) return <div className="p-4 text-red-500">Doctor not found.</div>;

  const availability = Array.isArray(doctor.availability) ? doctor.availability : [];

  return (
      <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Doctor Info */}
        <h1 className="text-3xl font-bold mb-2">{doctor.fullname}</h1>
        <h1 className="text-3xl font-bold text-gray-800 mb-2 capitalize">{doctor.name}</h1>
        <h2 className="text-xl text-gray-600 mb-2">{doctor.specialization}</h2>
        <h2 className="text-xl text-gray-600 mb-2">{doctor.subspecialization}</h2>
        <p className="text-gray-700 mb-6">{doctor.description}</p>

        {/* Availability Section */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Weekly Availability</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 border-b">Day</th>
                <th className="py-2 px-4 border-b">Time</th>
              </tr>
            </thead>
            <tbody>
              {doctor.availability?.map((slot, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b font-medium">{slot.day}</td>
                  <td className="py-2 px-4 border-b">
                    {slot.startTime} - {slot.endTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA Button */}
        <div className="mt-8">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;