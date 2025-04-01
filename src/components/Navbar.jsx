

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import { navItems } from "../constants";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [userName, setUserName] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser).fullname : null;
  });
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-sm border-b border-[#f4f4f4]">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="cursor-pointer flex items-center flex-shrink-0" 
          onClick={() => navigate("/")}> 
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">Medconnect</span>
          </div>
          
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <div className="hidden lg:flex justify-center space-x-4 items-center">
              <ul className="cursor-pointer" onClick={() => navigate("/user-dashboard")}>
                {userName ? userName : "Research"}
              </ul>
              {!userName ? (
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-gradient-to-r text-white from-orange-500 to-orange-800 py-2 px-3 rounded-md"
                >
                  Create an account
                </button>
              ) : (
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    setUserName(null);

                  }}
                  className="bg-red-500 text-white py-2 px-3 rounded-md"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-white w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {/* {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))} */}
              <p>Hello </p>
            </ul>
            <div className="flex space-x-6">
              {!userName ? (
                <>
                  <button 
                    onClick={() => navigate("/login")}
                    className="py-2 px-3 border rounded-md"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="bg-gradient-to-r text-white from-orange-500 to-orange-800 py-2 px-3 rounded-md"
                  >
                    Create an account
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    setUserName(null);
                    navigate("/login");
                  }}
                  className="bg-gradient-to-r text-white from-orange-500 to-orange-800 py-2 px-3 rounded-md"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;