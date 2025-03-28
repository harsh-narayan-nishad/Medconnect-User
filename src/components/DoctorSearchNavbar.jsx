// import { Menu, X } from "lucide-react";
// import React, { useState, useRef, useEffect } from "react";
// import logo from "../assets/logo.png";
// import { navItems } from "../constants";
// import { useNavigate } from "react-router-dom";  
// import SearchBox from "../ui/Search2";
// import DropDown from "../ui/Buttons/DropDown";
// import DarkMode from "../ui/Buttons/NotificationsOnOff";
// import ProfilePopUp from "../ui/Cards/UserProfilePopUp";

// const Navbar = () => {
//   const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
//   const navigate = useNavigate();  

//   const [isVisible, setIsVisible] = useState(false);
//   const dropdownRef = useRef(null);
//   const buttonRef = useRef(null);


//   const toggleNavbar = () => {
//     setMobileDrawerOpen(!mobileDrawerOpen);
//   };
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target) &&
//         buttonRef.current &&
//         !buttonRef.current.contains(event.target)
//       ) {
//         setIsVisible(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);
//   return (
//     <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-[#f4f4f4]">
//       <div className="container px-4 mx-auto relative lg:text-sm">
//         <div className="flex justify-between items-center">
//           {/* Left: Logo */}
//           <div className="cursor-pointer flex items-center flex-shrink-0"
//           onClick={() => navigate("/")}
//           >
//             <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
//             <span className="text-xl tracking-tight">MedConnect</span>
//           </div>

//           {/* Center: Navigation Elements */}
//           <ul className="hidden lg:flex items-center gap-6">
//             <li>
//               <SearchBox className="max-w-[300px]" />
//             </li>
//             <li>
//               <DropDown />
//             </li>
//             <li>
//               <DarkMode />
//             </li>
//           </ul>

//           {/* Right: Profile & Buttons */}
//           <div className="hidden lg:flex items-center space-x-4">
//           <div className="relative inline-block">
//       {/* Profile Button */}
//       <button
//         ref={buttonRef}
//         className="px-4 py-2 bg-gray-200 rounded-lg shadow-md"
//         onClick={() => setIsVisible((prev) => !prev)}
//       >
//         Profile
//       </button>

//       {/* Dropdown Menu */}
//       {isVisible && (
//         <div
//           ref={dropdownRef}
//           className="absolute right-20 mt-2  w-48  shadow-lg rounded-lg"
//         >
//         <ProfilePopUp />
          
//         </div>
//       )}
//     </div>
            
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="lg:hidden flex">
//             <button onClick={toggleNavbar}>
//               {mobileDrawerOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {mobileDrawerOpen && (
//           <div className="fixed right-0 top-16 z-20 bg-neutral-900 w-full p-6 flex flex-col justify-center items-center lg:hidden">
//             <ul className="space-y-4">
//               {navItems.map((item, index) => (
//                 <li key={index}>
//                   <button onClick={() => navigate(item.href)} className="text-white">
//                     {item.label}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//             <div className="flex space-x-4 mt-4">
//               <button 
//                 onClick={() => navigate("/login")}
//                 className="py-2 px-3 border rounded-md text-white"
//               >
//                 Sign In
//               </button>
//               <button
//                 onClick={() => navigate("/signup")}
//                 className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
//               >
//                 Create an account
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// working well but profiel button is removed
// import { Menu, X } from "lucide-react";
// import React, { useState, useRef, useEffect } from "react";
// import logo from "../assets/logo.png";
// import { navItems } from "../constants";
// import { useNavigate } from "react-router-dom";  
// import SearchBox from "../ui/Search2";
// import DropDown from "../ui/Buttons/DropDown";
// import DarkMode from "../ui/Buttons/NotificationsOnOff";
// import ProfilePopUp from "../ui/Cards/UserProfilePopUp";

// const Navbar = () => {
//   const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
//   const navigate = useNavigate();  
//   const [isVisible, setIsVisible] = useState(false);
//   const dropdownRef = useRef(null);
//   const buttonRef = useRef(null);
//   const [userName, setUserName] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUserName(parsedUser.fullname);
//     }
//   }, []);

//   const toggleNavbar = () => {
//     setMobileDrawerOpen(!mobileDrawerOpen);
//   };
  
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target) &&
//         buttonRef.current &&
//         !buttonRef.current.contains(event.target)
//       ) {
//         setIsVisible(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);
  
//   return (
//     <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-[#f4f4f4]">
//       <div className="container px-4 mx-auto relative lg:text-sm">
//         <div className="flex justify-between items-center">
//           <div className="cursor-pointer flex items-center flex-shrink-0"
//           onClick={() => navigate("/")}
//           >
//             <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
//             <span className="text-xl tracking-tight">MedConnect</span>
//           </div>

//           <ul className="hidden lg:flex items-center gap-6">
//             <li>
//               <SearchBox className="max-w-[300px]" />
//             </li>
//             <li>
//               <DropDown />
//             </li>
//             <li>
//               <DarkMode />
//             </li>
//           </ul>

//           <div className="hidden lg:flex items-center space-x-4">
//             {userName ? (
//               <>
//                 <span className="text-gray-700">{userName}</span>
//                 <button
//                   onClick={() => {
//                     localStorage.removeItem("user");
//                     setUserName(null);
//                     navigate("/login");
//                   }}
//                   className="bg-red-500 text-white py-2 px-3 rounded-md"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={() => navigate("/signup")}
//                 className="bg-gradient-to-r text-white from-orange-500 to-orange-800 py-2 px-3 rounded-md"
//               >
//                 Create an account
//               </button>
//             )}
//           </div>

//           <div className="lg:hidden flex">
//             <button onClick={toggleNavbar}>
//               {mobileDrawerOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>

//         {mobileDrawerOpen && (
//           <div className="fixed right-0 top-16 z-20 bg-neutral-900 w-full p-6 flex flex-col justify-center items-center lg:hidden">
//             <ul className="space-y-4">
//               {navItems.map((item, index) => (
//                 <li key={index}>
//                   <button onClick={() => navigate(item.href)} className="text-white">
//                     {item.label}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//             <div className="flex space-x-4 mt-4">
//               {userName ? (
//                 <button
//                   onClick={() => {
//                     localStorage.removeItem("user");
//                     setUserName(null);
//                     navigate("/login");
//                   }}
//                   className="bg-red-500 text-white py-2 px-3 rounded-md"
//                 >
//                   Logout
//                 </button>
//               ) : (
//                 <>
//                   <button 
//                     onClick={() => navigate("/login")}
//                     className="py-2 px-3 border rounded-md text-white"
//                   >
//                     Sign In
//                   </button>
//                   <button
//                     onClick={() => navigate("/signup")}
//                     className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
//                   >
//                     Create an account
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { Menu, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import { navItems } from "../constants";
import { useNavigate } from "react-router-dom";  
import SearchBox from "../ui/Search2";
import DropDown from "../ui/Buttons/DropDown";
import DarkMode from "../ui/Buttons/NotificationsOnOff";
import ProfilePopUp from "../ui/Cards/UserProfilePopUp";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();  
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.fullname);
    }
  }, []);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-[#f4f4f4]">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="cursor-pointer flex items-center flex-shrink-0"
          onClick={() => navigate("/")}
          >
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">MedConnect</span>
          </div>

          <ul className="hidden lg:flex items-center gap-6">
            <li>
              <SearchBox className="max-w-[300px]" />
            </li>
            <li>
              <DropDown />
            </li>
            <li>
              <DarkMode />
            </li>
          </ul>

          <div className="hidden lg:flex items-center space-x-4">
            {userName ? (
              <>
                <div className="relative inline-block">
                  <button
                    ref={buttonRef}
                    className="px-4 py-2 bg-gray-200 rounded-lg shadow-md"
                    onClick={() => setIsVisible((prev) => !prev)}
                  >
                    {userName}
                  </button>
                  {isVisible && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-20 mt-2 w-48 shadow-lg rounded-lg"
                    >
                      <ProfilePopUp />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    setUserName(null);
                    navigate("/login");
                  }}
                  className="bg-red-500 text-white py-2 px-3 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/signup")}
                className="bg-gradient-to-r text-white from-orange-500 to-orange-800 py-2 px-3 rounded-md"
              >
                Create an account
              </button>
            )}
          </div>

          <div className="lg:hidden flex">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileDrawerOpen && (
          <div className="fixed right-0 top-16 z-20 bg-neutral-900 w-full p-6 flex flex-col justify-center items-center lg:hidden">
            <ul className="space-y-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <button onClick={() => navigate(item.href)} className="text-white">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex space-x-4 mt-4">
              {userName ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    setUserName(null);

                  }}
                  className="bg-red-500 text-white py-2 px-3 rounded-md"
                >
                  Logout
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => navigate("/login")}
                    className="py-2 px-3 border rounded-md text-white"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
                  >
                    Create an account
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;