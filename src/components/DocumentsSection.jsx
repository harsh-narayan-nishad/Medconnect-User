// import React, { useEffect, useState } from "react";

// const Documents = () => {
//   const [documents, setDocuments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch documents
//   useEffect(() => {
//     const fetchDocuments = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/user/dashboard/documents", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch documents");
//         }

//         const data = await res.json();
//         setDocuments(data.documents || []);
//       } catch (err) {
//         console.error("Error fetching documents:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDocuments();
//   }, []);

//   return (
//     <div className="bg-white rounded-xl p-6">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Documents</h2>

//       {loading ? (
//         <p className="text-gray-500">Loading documents...</p>
//       ) : documents.length === 0 ? (
//         <p className="text-gray-500">No documents found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {documents.map((doc) => (
//             <div
//               key={doc._id}
//               className="border rounded-md shadow p-4 flex flex-col items-start gap-2 bg-orange-50"
//             >
//               <div className="w-full h-40 overflow-hidden rounded">
//                 <iframe
//                   src={doc.file}
//                   className="w-full h-full"
//                   title="Document preview"
//                 ></iframe>
//               </div>
//               <p className="text-sm text-gray-700 mt-2">
//                 <span className="font-semibold">Author:</span>{" "}
//                 {doc.access?.[0]?.fullname || "Unknown"}
//               </p>
//               <a
//                 href={doc.file}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 text-sm underline"
//               >
//                 View Full Document
//               </a>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Documents;



import React, { useEffect, useState } from "react";

const DocumentsSection = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      const res = await fetch("https://backend-453n.onrender.com/api/user/dashboard/documents", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch documents");
      }

      const data = await res.json();
      setDocuments(data.documents || []);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Utility function to detect image files
    const isImageFile = (url) => {
        return /\.(jpeg|jpg|png|gif|webp)$/i.test(url);
    };

    const getFileTypeLabel = (url) => {
        if (url.endsWith(".pdf")) return "📄 PDF Document";
        if (url.endsWith(".doc") || url.endsWith(".docx")) return "📝 Word Document";
        if (url.endsWith(".ppt") || url.endsWith(".pptx")) return "📊 PowerPoint";
        if (url.endsWith(".xls") || url.endsWith(".xlsx")) return "📈 Excel Sheet";
        return "📁 Document File";
    };      
  
  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Medical Documents</h2>

      {loading ? (
        <p className="text-gray-500">Loading documents...</p>
      ) : documents.length === 0 ? (
        <p className="text-gray-500">No documents uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {documents.map((doc) => (
            <div key={doc._id} className="border rounded shadow-sm p-2">
              <a
                href={doc.file}
                target="_blank"
                rel="noopener noreferrer"
                title="Click to view or download"
              >
                {isImageFile(doc.file) ? (
                  <img
                    src={doc.file}
                    alt="Medical Document"
                    className="w-full h-64 object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-700">
                        {getFileTypeLabel(doc.file)}
                      </p>
                      <p className="text-sm text-gray-500">Click to view or download</p>
                    </div>
                  </div>
                )}
              </a>
              <div className="p-2 bg-gray-50 text-sm text-gray-700 font-semibold">
                Author: <span className="font-normal">{doc.author.fullname}</span>
              </div>
            </div>
          ))}
        </div>

      )}
    </div>
  );
};

export default DocumentsSection;