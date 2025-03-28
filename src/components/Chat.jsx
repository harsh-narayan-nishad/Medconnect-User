// import React from 'react';
// import ChatImage from '../assets/Chat.png';

// const Chat = () => {
//   return (
//     <div className="text-white fixed right-4 bottom-0 transform -translate-y-1/2 px-4 py-4 rounded-full flex items-center justify-center">
//       <section className="section video" aria-label="video">
//         <div className="container ">
//           <div className="video-card has-before has-bg-image ">
//             <a href="Assets/ambulance.html">
//               <button className="play-btn " aria-label="play video">
//                 <img
//                   alt="Profile image 1"
//                   className="w-16 h-16 rounded-full object-contain"
//                   src={ChatImage}
//                 /> 
//               </button>
//             </a>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Chat;


// all good but send button is not available in input box of popup
// import React, { useState, useRef, useEffect } from "react";
// import ChatImage from "../assets/Chat.png";

// const Chat = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const chatRef = useRef(null);

//   const toggleChat = () => {
//     setIsOpen((prev) => !prev);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (chatRef.current && !chatRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   return (
//     <div className="text-white fixed right-4 bottom-0 transform -translate-y-1/2 px-4 py-4 flex items-center justify-center z-50">
//       <section className="section video" aria-label="video">
//         <div className="container">
//           <div className="video-card has-before has-bg-image">
//             <button onClick={toggleChat} className="play-btn" aria-label="play video">
//               <img
//                 alt="Chat Icon"
//                 className="w-16 h-16 rounded-full object-contain"
//                 src={ChatImage}
//               />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Floating Chatbox */}
//       {isOpen && (
//         <div
//           ref={chatRef}
//           className="absolute bottom-24 right-2 w-80 bg-white text-black shadow-lg rounded-lg p-4 border"
//         >
//           <div className="flex justify-between items-center border-b pb-2 mb-2">
//             <h3 className="text-lg font-semibold">Live Chat</h3>
//             <button onClick={toggleChat} className="text-gray-500 hover:text-gray-700">
//               ✖
//             </button>
//           </div>
//           <div className="h-48 overflow-y-auto p-2">
//             <p className="text-gray-700 text-sm">Welcome! How can we help you?</p>
//           </div>
//           <input
//             type="text"
//             placeholder="Type a message..."
//             className="w-full p-2 border rounded-md mt-2"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chat;


//all working fine, only issue is enter button is not working
// import React, { useState, useRef, useEffect } from "react";
// import ChatImage from "../assets/Chat.png";

// const Chat = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const chatRef = useRef(null);

//   const toggleChat = () => {
//     setIsOpen((prev) => !prev);
//   };

//   const handleSend = () => {
//     if (message.trim()) {
//       setMessages([...messages, { text: message, sender: "user" }]);
//       setMessage("");
//     }
//   };

//   const handleDelete = (index) => {
//     setMessages(messages.filter((_, i) => i !== index));
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (chatRef.current && !chatRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   return (
//     <div className="text-white fixed right-4 bottom-0 transform -translate-y-1/2 px-4 py-4 flex items-center justify-center z-50">
//       <section className="section video" aria-label="video">
//         <div className="container">
//           <div className="video-card has-before has-bg-image">
//             <button onClick={toggleChat} className="play-btn" aria-label="play video">
//               <img
//                 alt="Chat Icon"
//                 className="w-16 h-16 rounded-full object-contain"
//                 src={ChatImage}
//               />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Floating Chatbox */}
//       {isOpen && (
//         <div
//           ref={chatRef}
//           className="absolute bottom-24 right-2 w-80 bg-white text-black shadow-lg rounded-lg p-4 border"
//         >
//           <div className="flex justify-between items-center border-b pb-2 mb-2">
//             <h3 className="text-lg font-semibold">Live Chat</h3>
//             <button onClick={toggleChat} className="text-gray-500 hover:text-gray-700">
//               ✖
//             </button>
//           </div>
//           <div className="h-48 overflow-y-auto p-2">
//             <p className="text-gray-700 text-sm">Welcome! How can we help you?</p>
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className="flex justify-between items-center mt-2 text-gray-800 text-sm bg-gray-200 p-2 rounded-md"
//               >
//                 {msg.text}
//                 <button
//                   onClick={() => handleDelete(index)}
//                   className="text-red-500 hover:text-red-700 text-xs ml-2"
//                 >
//                   ❌
//                 </button>
//               </div>
//             ))}
//           </div>
//           {/* Input & Send Button */}
//           <div className="flex items-center mt-2">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               className="w-full p-2 border rounded-md"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//             <button
//               onClick={handleSend}
//               className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//               Send
//             </button>
//           </div>
//           {/* Alert Message after Sending */}
//           {messages.length > 0 && (
//             <div className="mt-2 text-sm text-green-600 font-medium">
//               ✅ Thanks! We will connect shortly.
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chat;



import React, { useState, useRef, useEffect } from "react";
import ChatImage from "../assets/Chat.png";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);
  

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    setMessages(storedMessages);
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMessages = [...messages, message];
      setMessages(newMessages);
      setMessage("");

      // Use alert function here
      alert("Thanks for sharing!");
    }
  };

  const handleDelete = (index) => {
    const updatedMessages = messages.filter((_, i) => i !== index);
    setMessages(updatedMessages);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="text-white fixed right-4 bottom-0 transform -translate-y-1/2 px-4 py-4 flex items-center justify-center z-50">
      <section className="section video" aria-label="video">
        <div className="container">
          <div className="video-card has-before has-bg-image">
            <button onClick={toggleChat} className="play-btn" aria-label="play video">
              <img
                alt="Chat Icon"
                className="w-16 h-16 rounded-full object-contain"
                src={ChatImage}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Floating Chatbox */}
      {isOpen && (
        <div
          ref={chatRef}
          className="absolute bottom-20 right-0 w-80 backdrop-blur-lg border-b border-orange-700 shadow-sm shadow-orange-400 text-black  rounded-lg p-4 "
        >
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h3 className="text-lg font-semibold">Help Center</h3>
            <button onClick={toggleChat} className="text-gray-500 hover:text-gray-700">
              ✖
            </button>
          </div>

          <div className="h-48 overflow-y-auto p-2">
            <p className="text-gray-700 text-sm">Welcome ! How can we help you?</p>
            {messages.map((msg, index) => (
              <div
                key={index}
                className="mt-2 p-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md flex justify-between items-center"
              >
                {msg}
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-red-700 text-xs ml-2"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

          {/* Input Box + Send Button */}
          <div className="flex items-center mt-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 border rounded-md focus:outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSend}
              className="ml-2 px-3 py-2 bg-gradient-to-r text-white from-orange-500 to-orange-800  rounded-md hover:bg-orange-800  "
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
