// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 mt-11 mb-11 ">
//       <div className="ring-1 ring-gray-300 w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>

//         <form className="space-y-5">
//           {/* Email Address */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Email Address</label>
//             <input 
//               type="email" 
//               placeholder="example@example.com" 
//               className="w-full p-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Password</label>
//             <div className="relative">
//               <input 
//                 type={showPassword ? "text" : "password"} 
//                 placeholder="Enter password" 
//                 className="w-full p-3 pr-12  bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
//               >
//                 {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//               </button>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="text-center">
//             <button 
//               type="submit" 
//               className="w-full bg-gradient-to-r from-orange-500 to-red-800   text-white py-3 rounded-lg font-medium "
//             >
//               Login
//             </button>
//           </div>
//         </form>

//         {/* Signup Link with React Router */}
//         <div className="text-center mt-4">
//           <p className="text-gray-700">
//             Don't have an account?{" "}
//             <Link to="/signup" className="text-blue-600 hover:underline font-medium">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://med-connect-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("token", data.token); // Store token
        navigate("/"); // Redirect to home page
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 mt-11 mb-11">
      <div className="ring-1 ring-gray-300 w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-800 text-white py-3 rounded-lg font-medium">
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p>Don't have an account? <button onClick={() => navigate("/signup")}>Sign Up</button></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
