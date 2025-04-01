import { useState } from "react";

export default function PdfUploader() {
  const [pdfs, setPdfs] = useState([]);

  function uploadPdf(event) {
    event.preventDefault();
    const fileInput = document.getElementById("pdfInput");
    const pdfNameInput = document.getElementById("pdfName");
    const file = fileInput.files[0];
    const customName = pdfNameInput.value;

    if (file && customName) {
      const fileUrl = URL.createObjectURL(file);

      const now = new Date();
      const formattedDate = now.toISOString().replace("T", " | Time: ").split(".")[0];
      const dateTimeString = `Date: ${formattedDate}`;

      setPdfs((prevPdfs) => {
        const newPdfs = [...prevPdfs, { name: customName, url: fileUrl, date: dateTimeString }];
        return newPdfs.length > 5 ? newPdfs.slice(-5) : newPdfs;
      });
    } else {
      alert("Please select a PDF file and enter a name.");
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">PDF Uploader</h2>
      <form onSubmit={uploadPdf} className="space-y-2">
        <input type="file" id="pdfInput" accept="application/pdf" className="block" />
        <input type="text" id="pdfName" placeholder="Enter PDF Name" className="block border p-1" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Upload PDF</button>
      </form>
      <div id="pdfContainer" className="mt-4 space-y-2">
        {pdfs.slice().reverse().map((pdf, index) => (
          <div key={index} className="border p-2 rounded shadow-md">
            <a href={pdf.url} download={`${pdf.name}.pdf`} className="text-blue-500 underline">
              {pdf.name}
            </a>
            <div className="text-gray-600 text-sm">{pdf.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
