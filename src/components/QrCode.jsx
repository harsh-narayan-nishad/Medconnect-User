// import { qrCode } from "../constants";

// import QRCode_generator from "./QrCodeGenerator";


// const FeatureSection = () => {
//   return (
//     <div className="relative mt-20  ">

//       <div className="flex flex-wrap mt-10 lg:mt-20">

// {qrCode[1] && (
//   <div className="w-full sm:w-1/2 lg:w-1/3">
//     <div className="flex">
//       <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full">
//         {qrCode[1].icon}
//       </div>
//       <div>
//         <h5 className="mt-1 mb-6 text-xl">{qrCode[1].text}</h5>
//         <p className="text-md p-2 mb-20 text-neutral-500">
//           {qrCode[1].description}
//         </p>
//       </div>
//     </div>


//   </div>
// )}

//     <QRCode_generator />     
      
 
//     </div>

//     </div>
//   );
// };

// export default FeatureSection;

import { qrCode } from "../constants";
import QRCode_generator from "./QrCodeGenerator";

const FeatureSection = () => {
  return (
    <div className="relative mt-20">
      <div className="flex flex-wrap mt-10 lg:mt-20">
        {qrCode.map((qr, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
            <div className="flex">
              <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full">
                {qr.icon}
              </div>
              <div>
                <h5 className="mt-1 mb-6 text-xl">{qr.text}</h5>
                <p className="text-md p-2 mb-20 text-neutral-500">
                  {qr.description}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* <QRCode_generator /> */}
      </div>
    </div>
  );
};

export default FeatureSection;
