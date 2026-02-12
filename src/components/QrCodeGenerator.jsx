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
