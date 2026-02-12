import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserProfile = () => {
  const { id: userId } = useParams();
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [docLoading, setDocLoading] = useState(true);
  const [error, setError] = useState("");
  const [docError, setDocError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`https://backend-453n.onrender.com/api/users/users/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };
  
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem('token'); // adjust this if you store it differently
        const res = await fetch(`https://backend-453n.onrender.com/api/user/dashboard/documents/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!res.ok) throw new Error("Failed to fetch documents");
        const data = await res.json();
        setDocuments(data);
      } catch (err) {
        setDocError("Nothing to show");
      } finally {
        setDocLoading(false);
      }
    };
  
    fetchUserData();
    fetchDocuments();
  }, [userId]);
  

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">Loading user data...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex flex-col items-center p-6 md:flex-row">
          <Avatar className="h-32 w-32 mb-4">
            <AvatarImage src={user.image || "/placeholder.svg"} alt={user.fullname} />
            <AvatarFallback>{user.fullname?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">{user.name}</h1>
            <p className="text-lg text-gray-600 mb-1">
              <span className="font-medium text-gray-700">Date of Birth:</span> {new Date(user.DOB).toLocaleDateString()}
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-medium text-gray-700">Age:</span> {user.age}
            </p>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Documents</h2>
        {docLoading ? (
          <p className="text-gray-500">Loading documents...</p>
        ) : docError ? (
          <p className="text-red-500">{docError}</p>
        ) : documents.length === 0 ? (
          <p className="text-gray-500">No documents available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <a
                key={doc._id}
                href={doc.file}
                target="_blank"
                rel="noopener noreferrer"
                className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                {doc.file.endsWith(".pdf") ? (
                  <div className="flex items-center justify-center h-40 bg-gray-100 text-gray-500">
                    PDF Document
                  </div>
                ) : (
                  <img src={doc.file} alt="Document" className="w-full h-40 object-cover rounded" />
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;