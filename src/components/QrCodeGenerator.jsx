// import { useState, useEffect, useRef } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import favicon from "../assets/logo.png";

// export default function QrCodeGenerator() {
//   const [qrList, setQrList] = useState([]);
//   const [counter, setCounter] = useState(0);
//   const qrRefs = useRef([]); // Store references for each QR code
//   useEffect(() => {
//     if (counter >= 1) return;

//     const intervalId = setInterval(() => {
//       const now = new Date();
//       const formattedDate = now
//         .toISOString()
//         .replace("T", " | Time: ")
//         .split(".")[0];
//       const dateTimeString = `Date: ${formattedDate}`;
//       const userId = localStorage.getItem('user');
//       const qrText = `https://medconnect-user.netlify.app//#/User-page/${userId})`;
//       setQrList((prevList) => {
//         const newList = [...prevList, { date: dateTimeString, qrText }];
//         return newList.length > 5 ? newList.slice(-5) : newList;
//       });

//       setCounter((prevCounter) => prevCounter + 1);
//     }, 10);

//     return () => clearInterval(intervalId);
//   }, [counter]);

//   // Function to download QR code
//   const downloadQR = (index) => {
//     const canvas = qrRefs.current[index]; // Get the canvas reference
//     if (canvas) {
//       const image = canvas.toDataURL("image/png"); // Convert canvas to image
//       const link = document.createElement("a");
//       link.href = image;
//       link.download = `QRCode-${index + 1}.png`; // Set filename
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//   // Function to share QR code via social media
//   const shareQR = (platform, qrText) => {
//     let url = encodeURIComponent(qrText);
//     let shareUrl = "";

//     switch (platform) {
//       case "whatsapp":
//         shareUrl = `https://api.whatsapp.com/send?text=${url}`;
//         break;
//       case "facebook":
//         shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
//         break;
//       case "twitter":
//         shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=Check+out+this+QR+code!`;
//         break;
//       case "linkedin":
//         shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
//         break;
//       case "email":
//         shareUrl = `mailto:?subject=Check out this QR Code&body=${url}`;
//         break;
//       default:
//         return;
//     }

//     window.open(shareUrl, "_blank"); // Open share link in new tab
//   };

//   return (
//     <div className="p-4">
//       <div
//         id="qrContainer"
//         className="mt-4 space-y-2 flex flex-wrap justify-center"
//       >
//         {qrList
//           .slice()
//           .reverse()
//           .map((qr, index) => (
//             <div
//               key={index}
//               className=" bg-white  p-2 rounded flex flex-col items-center w-auto max-w-xs"
//             >
//               <QRCodeCanvas
//                 value={qr.qrText}
//                 className="w-full h-auto max-w-[150px]"
//                 level="H"
//                 ref={(el) => (qrRefs.current[index] = el)} // Store ref for each QR code
//                 imageSettings={{
//                   src: favicon, // Using imported image
//                   height: 25,
//                   width: 25,
//                   excavate: true,
//                 }}
//               />

//               <button
//                 onClick={() => downloadQR(index)}
//                 className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm"
//               >
//                 Download QR
//               </button>
              
//               {/* <div className="mt-2 flex gap-2 flex-wrap justify-center">
//                 <button
//                   onClick={() => shareQR("whatsapp", qr.qrText)}
//                   className="px-2 py-1 bg-green-500 text-white rounded text-sm"
//                 >
//                   WhatsApp
//                 </button>
//                 <button
//                   onClick={() => shareQR("facebook", qr.qrText)}
//                   className="px-2 py-1 bg-blue-700 text-white rounded text-sm"
//                 >
//                   Facebook
//                 </button>
//                 <button
//                   onClick={() => shareQR("twitter", qr.qrText)}
//                   className="px-2 py-1 bg-sky-500 text-white rounded text-sm"
//                 >
//                   Twitter
//                 </button>
//                 <button
//                   onClick={() => shareQR("linkedin", qr.qrText)}
//                   className="px-2 py-1 bg-blue-800 text-white rounded text-sm"
//                 >
//                   LinkedIn
//                 </button>
//                 <button
//                   onClick={() => shareQR("email", qr.qrText)}
//                   className="px-2 py-1 bg-gray-600 text-white rounded text-sm"
//                 >
//                   Email
//                 </button>
//               </div> */}
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }


import { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import favicon from "../assets/logo.png";

export default function QrCodeGenerator() {
  const [qrList, setQrList] = useState([]);
  const [counter, setCounter] = useState(0);
  const qrRefs = useRef([]);

  useEffect(() => {
    if (counter >= 1) return;

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    if (!userId) {
      console.error("No user ID found in localStorage");
      return;
    }

    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toISOString().replace("T", " | Time: ").split(".")[0];
      const dateTimeString = `Date: ${formattedDate}`;
      
      // Corrected QR code URL
      const qrText = `https://medconnect-user.netlify.app/#/User-page/${userId}`;
      
      setQrList((prevList) => {
        const newList = [...prevList, { date: dateTimeString, qrText }];
        return newList.length > 5 ? newList.slice(-5) : newList;
      });

      setCounter((prevCounter) => prevCounter + 1);
    }, 10);

    return () => clearInterval(intervalId);
  }, [counter]);

  const downloadQR = (index) => {
    const canvas = qrRefs.current[index];
    if (canvas) {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `QRCode-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-4">
      <div
        id="qrContainer"
        className="mt-4 space-y-2 flex flex-wrap justify-center"
      >
        {qrList
          .slice()
          .reverse()
          .map((qr, index) => (
            <div
              key={index}
              className="bg-white p-2 rounded flex flex-col items-center w-auto max-w-xs"
            >
                <QRCodeCanvas
                  value={qr.qrText}
                  size={260}  // Increase the size to make it easier to scan
                  level="M"
                  ref={(el) => (qrRefs.current[index] = el)}
                  imageSettings={{
                    src: favicon,
                    height: 50,  // Adjust logo size accordingly
                    width: 50,
                    excavate: true,
                  }}
                />

              <button
                onClick={() => downloadQR(index)}
                className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm"
              >
                Download QR
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
