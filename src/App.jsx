import React from "react";
import AppRoutes from "./routes.jsx";


const App = () => {
  return <AppRoutes />;
};

export default App;


// import { useState } from "react";

// export default function PdfUploader() {
//   const [pdfs, setPdfs] = useState([]);
//   const [dateTime, setDateTime] = useState("");

//   // Function to handle PDF upload
//   function uploadPdf(event) {
//     event.preventDefault();
//     const fileInput = document.getElementById("pdfInput");
//     const pdfNameInput = document.getElementById("pdfName");
//     const file = fileInput.files[0];
//     const customName = pdfNameInput.value;

//     if (file && customName) {
//       const fileUrl = URL.createObjectURL(file);

//       // Get current date and time
//       const now = new Date();
//       const year = now.getFullYear();
//       const month = String(now.getMonth() + 1).padStart(2, "0");
//       const day = String(now.getDate()).padStart(2, "0");
//       const hours = String(now.getHours()).padStart(2, "0");
//       const minutes = String(now.getMinutes()).padStart(2, "0");
//       const seconds = String(now.getSeconds()).padStart(2, "0");

//       const dateTimeString = `Date: ${year}-${month}-${day} | Time: ${hours}:${minutes}:${seconds}`;
//       setDateTime(dateTimeString); // Update the date and time in state

//       // Update pdf list
//       setPdfs((prevPdfs) => {
//         const newPdfs = [...prevPdfs, { name: customName, url: fileUrl, date: dateTimeString }];
//         return newPdfs.length > 5 ? newPdfs.slice(-5) : newPdfs;
//       });
//     } else {
//       alert("Please select a PDF file and enter a name.");
//     }
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-bold">PDF Uploader</h2>
//       <div>
//         {/* PDF Input Form */}
//         <input type="file" id="pdfInput" accept="application/pdf" className="block mb-2" />
//         <input type="text" id="pdfName" placeholder="Enter PDF Name" className="block border p-1 mb-2" />
//         <button
//           onClick={uploadPdf}
//           className="bg-[#046edc] text-white px-4 py-2 rounded"
//         >
//           Upload
//         </button>
//       </div>

//       {/* Display Date and Time */}
//       <div className="datetime mt-4 text-sm text-gray-600">
//         {dateTime && <span>{dateTime}</span>}
//       </div>

//       {/* Display PDFs */}
//       <div id="pdfContainer" className="mt-4 space-y-2">
//         {pdfs.slice().reverse().map((pdf, index) => (
//           <div key={index} className="border p-2 rounded shadow-md">
//             <a href={pdf.url} download={`${pdf.name}.pdf`} className="text-blue-500 underline">
//               {pdf.name}
//             </a>
//             <div className="text-gray-600 text-sm">{pdf.date}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
