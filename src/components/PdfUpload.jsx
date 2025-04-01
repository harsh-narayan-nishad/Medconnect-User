
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
  function uploadFile(event) {
    event.preventDefault();
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];
    const customMessage = message;

    if (file && customMessage) {
      const fileUrl = URL.createObjectURL(file);

      // Get current date and time
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      const dateTimeString = `Date: ${year}-${month}-${day} | Time: ${hours}:${minutes}:${seconds}`;
      setDateTime(dateTimeString); // Update the date and time in state

      // Update the list of uploaded files
      setPdfs((prevPdfs) => {
        const newPdfs = [...prevPdfs, { name: customMessage, url: fileUrl, date: dateTimeString }];
        return newPdfs.length > 5 ? newPdfs.slice(-5) : newPdfs;
      });

      // Reset message input after file is uploaded
      setMessage("");
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
 <span className="tooltip">
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

          {/* Message Input */}
          <input
            required
            placeholder="Enter file name"
            type="text"
            id="messageInput"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
  
          />

          {/* Upload Button */}
          {/* <button
            onClick={uploadFile}
            className="bg-[#046edc] text-white px-4 py-2 rounded"
          >
            Upload
          </button> */}

        <button id="sendButton"
        onClick={uploadFile}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
            <path fill="none" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888" />
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="33.67" stroke="#6c6c6c" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888" />
          </svg>
        </button>

        </div>

        {/* Display Date and Time */}
        <div className="datetime mt-4 text-sm text-gray-600">
          {dateTime && <span>{dateTime}</span>}
        </div>

        {/* Display Uploaded Files */}
        <div id="fileContainer" className="mt-4 space-y-2">
          {pdfs.slice().reverse().map((file, index) => (
            <div key={index} className="border p-2 rounded shadow-md">
              <a href={file.url} download={`${file.name}`} className="text-blue-500 underline">
                {file.name}
              </a>
              <div className="text-gray-600 text-sm">{file.date}</div>
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
    background-color: #fff;
    padding: 0 15px;
    border-radius: 10px;
    border: 1px solid #d1d5db;
  }
  .messageBox:focus-within {
    border: 1px solid rgb(110, 110, 110);
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
    color: black;
  }
  #messageInput:focus ~ #sendButton svg path,
  #messageInput:valid ~ #sendButton svg path {
    fill: #3c3c3c;
    // stroke: white;
    stroke : green;
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
    // stroke: white;
    stroke: #3c3c3c;
  }
`;

export default Input;
