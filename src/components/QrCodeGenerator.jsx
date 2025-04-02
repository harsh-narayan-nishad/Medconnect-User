

import { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QrCodeGenerator() {
  const [qrList, setQrList] = useState([]);
  const [counter, setCounter] = useState(0);
  const qrRefs = useRef([]); // Store references for each QR code
  useEffect(() => {
    if (counter >= 1) return;

    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toISOString().replace("T", " | Time: ").split(".")[0];
      const dateTimeString = `Date: ${formattedDate}`;
      const qrText =
        "https://www.practo.com/search/doctors?results_type=doctor&q=%5B%7B%22word%22%3A%22Dentist%22%2C%22autocompleted%22%3Atrue%2C%22category%22%3A%22subspeciality%22%7D%5D&city=Bangalore";

      setQrList((prevList) => {
        const newList = [...prevList, { date: dateTimeString, qrText }];
        return newList.length > 5 ? newList.slice(-5) : newList;
      });

      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [counter]);

  // Function to download QR code
  const downloadQR = (index) => {
    const canvas = qrRefs.current[index]; // Get the canvas reference
    if (canvas) {
      const image = canvas.toDataURL("image/png"); // Convert canvas to image
      const link = document.createElement("a");
      link.href = image;
      link.download = `QRCode-${index + 1}.png`; // Set filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Function to share QR code via social media
  const shareQR = (platform, qrText) => {
    let url = encodeURIComponent(qrText);
    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=Check+out+this+QR+code!`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=Check out this QR Code&body=${url}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank"); // Open share link in new tab
  };

  return (
    <div className="p-4">
      <div id="qrContainer" className="mt-4 space-y-2 flex flex-wrap justify-center">
        {qrList
          .slice()
          .reverse()
          .map((qr, index) => (
            <div key={index} className="p-2 rounded flex flex-col items-center w-auto max-w-xs">
              {/* QR Code Canvas */}
              <QRCodeCanvas
                value={qr.qrText}
                className="w-full h-auto max-w-[150px]"
                level="H"
                ref={(el) => (qrRefs.current[index] = el)} // Store ref for each QR code
              />
              {/* Download Button */}
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
