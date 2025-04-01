import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QrCodeGenerator() {
  const [qrList, setQrList] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (counter >= 1) return;

    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toISOString().replace("T", " | Time: ").split(".")[0];
      const dateTimeString = `Date: ${formattedDate}`;
      const qrText = "https://www.practo.com/search/doctors?results_type=doctor&q=%5B%7B%22word%22%3A%22Dentist%22%2C%22autocompleted%22%3Atrue%2C%22category%22%3A%22subspeciality%22%7D%5D&city=Bangalore";

      setQrList((prevList) => {
        const newList = [...prevList, { date: dateTimeString, qrText }];
        return newList.length > 5 ? newList.slice(-5) : newList;
      });

      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [counter]);

  return (
 

    <div className="p-4">

  <div id="qrContainer" className="mt-4 space-y-2 flex flex-wrap justify-center">
    {qrList.slice().reverse().map((qr, index) => (
      <div 
        key={index} 
        className=" p-2 rounded  flex flex-col items-center w-auto max-w-xs"
      >
        
        <QRCodeCanvas value={qr.qrText} className="w-full h-auto max-w-[150px]" level="H" />
      </div>
    ))}
  </div>
</div>

  );
}