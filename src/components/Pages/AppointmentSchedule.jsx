import Navbar from "../Navbar";

import Footer from "../Footer";




const AppointmentSchedule = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
       <>
       <div className="relative mt-20 border-b border-neutral-800 min-h-[800px]">
             <div className="text-center">
               <span className="bg-neutral-900 text-orange-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
                 Appointments
               </span>
               <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
               Effortlessly Manage{" "}
                 <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
                 Your Health
                 </span>
               </h2>
             </div>
             <div className="flex flex-wrap mt-10 lg:mt-20">
              
             </div>
           </div>
       </>
   


        <Footer />
      </div>
    </>
  );
};

export default AppointmentSchedule;
