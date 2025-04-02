
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
      // Reset file input and message after file is uploaded
      fileInput.value = "";  // Clears the file picker
      setIsFileUploaded(false);  // Reset file upload state
      setSelectedFileName(""); // Clear file name
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

        {/* <svg height="157px" width="157px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-18.47 -18.47 221.63 221.63" xml:space="preserve" fill="#000000" stroke="#000000" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path style="fill:#010002;" d="M149.968,50.186c-8.017-14.308-23.796-22.515-40.717-19.813 C102.609,16.43,88.713,7.576,73.087,7.576c-22.117,0-40.112,17.994-40.112,40.115c0,0.913,0.036,1.854,0.118,2.834 C14.004,54.875,0,72.11,0,91.959c0,23.456,19.082,42.535,42.538,42.535h33.623v-7.025H42.538 c-19.583,0-35.509-15.929-35.509-35.509c0-17.526,13.084-32.621,30.442-35.105c0.931-0.132,1.768-0.633,2.326-1.392 c0.555-0.755,0.795-1.704,0.644-2.63c-0.297-1.904-0.447-3.582-0.447-5.139c0-18.249,14.852-33.094,33.094-33.094 c13.703,0,25.789,8.26,30.803,21.04c0.63,1.621,2.351,2.534,4.058,2.14c15.425-3.568,29.919,3.883,36.604,17.168 c0.508,1.027,1.503,1.736,2.641,1.897c17.368,2.473,30.481,17.569,30.481,35.112c0,19.58-15.937,35.509-35.52,35.509H97.391 v7.025h44.761c23.459,0,42.538-19.079,42.538-42.535C184.69,71.545,169.884,53.901,149.968,50.186z"></path> </g> <g> <path style="fill:#010002;" d="M108.586,90.201c1.406-1.403,1.406-3.672,0-5.075L88.541,65.078 c-0.701-0.698-1.614-1.045-2.534-1.045l-0.064,0.011c-0.018,0-0.036-0.011-0.054-0.011c-0.931,0-1.85,0.361-2.534,1.045 L63.31,85.127c-1.403,1.403-1.403,3.672,0,5.075c1.403,1.406,3.672,1.406,5.075,0L82.296,76.29v97.227 c0,1.99,1.603,3.597,3.593,3.597c1.979,0,3.59-1.607,3.59-3.597V76.165l14.033,14.036 C104.91,91.608,107.183,91.608,108.586,90.201z"></path> </g> </g> </g> </g></svg> */}
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

          {/* Message Input */}
          {/* <input
            required
            placeholder="Enter file name"
            type="text"
            id="messageInput"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                uploadFile(e);
              }
            }}
  
          /> */}

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



        {/* <button id="sendButton"
        onClick={uploadFile}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
            <path fill="none" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888" />
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="33.67" stroke="#6c6c6c" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888" />
          </svg>
        </button> */}

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
