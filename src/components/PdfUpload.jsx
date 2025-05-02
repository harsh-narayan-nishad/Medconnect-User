
import React, { useState } from 'react';
import styled from 'styled-components';

const Input = () => {
  const [pdfs, setPdfs] = useState([]);
  const [dateTime, setDateTime] = useState("");
  const [message, setMessage] = useState("");
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState(""); // Store file name


  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setIsFileUploaded(true);
      setSelectedFileName(e.target.files[0].name); // Save file name

    }
  };
  // Function to handle file upload
  // function uploadFile(event) {
  //   event.preventDefault();
  //   const fileInput = document.getElementById("file");
  //   const file = fileInput.files[0];
  //   const customMessage = message;

  //   if (file && customMessage) {
  //     const fileUrl = URL.createObjectURL(file);

  //     // Get current date and time
  //     const now = new Date();
  //     const year = now.getFullYear();
  //     const month = String(now.getMonth() + 1).padStart(2, "0");
  //     const day = String(now.getDate()).padStart(2, "0");
  //     const hours = String(now.getHours()).padStart(2, "0");
  //     const minutes = String(now.getMinutes()).padStart(2, "0");
  //     const seconds = String(now.getSeconds()).padStart(2, "0");

  //     const dateTimeString = `Date: ${year}-${month}-${day} | Time: ${hours}:${minutes}:${seconds}`;
  //     setDateTime(dateTimeString); // Update the date and time in state

  //     // Update the list of uploaded files
  //     setPdfs((prevPdfs) => {
  //       const newPdfs = [...prevPdfs, { name: customMessage, url: fileUrl, date: dateTimeString }];
  //       return newPdfs.length > 5 ? newPdfs.slice(-5) : newPdfs;
  //     });

  //     // Reset message input after file is uploaded
  //     // Reset file input and message after file is uploaded
  //     fileInput.value = "";  // Clears the file picker
  //     setIsFileUploaded(false);  // Reset file upload state
  //     setSelectedFileName(""); // Clear file name
  //     setMessage("");
  //   } else {
  //     alert("Please select a file and enter a message.");
  //   }
  // }

  async function uploadFile(event) {
    event.preventDefault();
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];
    const customMessage = message;

    if (file && customMessage) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("message", customMessage);

      try {
        const res = await fetch("https://backend-453n.onrender.com/api/user/dashboard/documents/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        });

        if (!res.ok) {
          throw new Error("Failed to upload document.");
        }

        const data = await res.json();

        // Get current date and time
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        const dateTimeString = `Date: ${year}-${month}-${day} | Time: ${hours}:${minutes}:${seconds}`;
        setDateTime(dateTimeString);

        // Add uploaded file info to the list
        setPdfs((prevPdfs) => {
          const newPdfs = [...prevPdfs, { name: customMessage, url: data.url, date: dateTimeString }];
          return newPdfs.length > 5 ? newPdfs.slice(-5) : newPdfs;
        });

        fileInput.value = "";
        setIsFileUploaded(false);
        setSelectedFileName("");
        setMessage("");
      } catch (error) {
        console.error("Upload error:", error);
        alert("Upload failed. Please try again.");
      }
    } else {
      alert("Please select a file and enter a message.");
    }
  }


  return (
    <StyledWrapper>
      <div className="p-4 ">
        <div className="messageBox ">
          {/* File Upload Section */}
          <div className="fileUploadWrapper ">
      <label htmlFor="file">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 337 337"
          className={isFileUploaded ? 'text-green-500' : 'stroke-gray-600'}
        >
          <circle strokeWidth={20} stroke="currentColor" fill="none" r="158.5" cy="168.5" cx="168.5" />
          <path strokeLinecap="round" strokeWidth={25} stroke="currentColor" d="M167.759 79V259" />
          <path strokeLinecap="round" strokeWidth={25} stroke="currentColor" d="M79 167.138H259" />
        </svg>
 {/* Tooltip shows on hover */}
 <span className="tooltip ">
            {selectedFileName ? selectedFileName : "Add a file"}
 </span>        
 </label>
      <input
        type="file"
        id="file"
        name="file"
        className="hidden"
        onChange={handleFileChange} // Handle file change
      />
    </div>



<input
    required
    type="text"
    id="messageInput"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        uploadFile(e);
      }
    }}
    className="peer  w-full border-b-2 border-gray-300 bg-transparent text-lg text-gray-800 placeholder-gray-500 outline-none focus:border-blue-500"
    placeholder="Drop your file here... " // Keeps space for label animation
    autoFocus
  />

{/* send button */}

        {/* <button id="sendButton"
        onClick={uploadFile}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
            <path fill="none" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888" />
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="33.67" stroke="#6c6c6c" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888" />
          </svg>
        </button> */}

        </div>


{/* 
<div id="fileContainer" className="mt-4 space-y-2">
  {pdfs.slice().reverse().map((file, index) => (
    <div key={index} className="flex items-center justify-between border p-4 rounded shadow-md">

      <div className="text-gray-600 text-sm">{file.date}</div>

   
      <span className="px-2 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded">
        Approved
      </span>

     
      <a href={file.url} download={`${file.name}`} className="text-blue-500 underline">
        {file.name}
      </a>


      <div className="text-gray-700 text-sm">Consulting Fees</div>

      <div className="font-semibold text-gray-800">${file.amount}</div>

 
      <div className="text-gray-500 cursor-pointer">...</div>
    </div>
  ))}
</div> */}
<div id="fileContainer" className="mt-4 space-y-2">
  {pdfs.slice().reverse().map((file, index) => (
    <div key={index} className="flex items-center justify-between border p-4 rounded shadow-md relative">

      <div className="text-gray-600 text-sm">{file.date}</div>

      <div className="relative">
        <button className="px-2 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded">
          Approved 
        </button>
        <div className="absolute left-0 mt-2 w-36 bg-white border rounded shadow-lg hidden">
          <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">Pending</button>
          <button className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-100">Rejected</button>
        </div>
      </div>

   
      <a href={file.url} download={`${file.name}`} className="text-blue-500 underline">
        {file.name}
      </a>

      <div className="text-gray-700 text-sm">{file.type || "Medical Report"}</div>

      <a href={file.url} target="_blank" rel="noopener noreferrer">
        <button className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">
          View
        </button>
      </a>

      <a href={file.url} download={`${file.name}`}>
        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
          Download
        </button>
      </a>

  
      <div className="text-gray-500 cursor-pointer">...</div>
    </div>
  ))}
</div>


      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .messageBox {
    width: fit-content;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: #000;
    background-color: #f4f4f4;
    padding: 0 15px;
    border-radius: 10px;
  //  border: 1px solid #d1d5db;
    // border: 1px solid rgb(63, 63, 63);
  }
  .messageBox:focus-within {
    // border: 1px solid #606060;;
  }
  .fileUploadWrapper {
    width: fit-content;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Arial, Helvetica, sans-serif;
  }

  #file {
    display: none;
  }
  .fileUploadWrapper label {
    cursor: pointer;
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    // color: #3c3c3c;
    color: gray;
  }
  .fileUploadWrapper label svg {
    height: 18px;
  }
  .fileUploadWrapper label svg path {
    transition: all 0.3s;
  }
  .fileUploadWrapper label svg circle {
    transition: all 0.3s;
  }
  .fileUploadWrapper label:hover svg path {
    stroke: #fff;
  }
  .fileUploadWrapper label:hover svg circle {
    stroke: #fff;
    fill: #3c3c3c;
  }
  .fileUploadWrapper label:hover .tooltip {
    display: block;
    opacity: 1;
  }
  .tooltip {
    position: absolute;
    top: -40px;
    display: none;
    opacity: 0;
    color: black;
    font-size: 10px;
    text-wrap: nowrap;
    background-color: white;
    padding: 6px 10px;
    border: 1px solid #3c3c3c;
    border-radius: 5px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.596);
    transition: all 0.3s;
  }
  #messageInput {
    width: 25vw;
    height: 100%;
    background-color: transparent;
    outline: none;
    border: none;
    padding-left: 10px;
    // color: white;
    color: black;
  }
  #messageInput:focus ~ #sendButton svg path,
  #messageInput:valid ~ #sendButton svg path {
    fill: #3c3c3c;
    stroke: white;
    // stroke : green;
  }

  #sendButton {
    width: fit-content;
    height: 100%;
    background-color: transparent;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
  }
  #sendButton svg {
    height: 18px;
    transition: all 0.3s;
  }
  #sendButton svg path {
    transition: all 0.3s;
  }
  #sendButton:hover svg path {
    fill: #3c3c3c;
    stroke: white;
    // stroke: #3c3c3c;
  }
`;

export default Input;
