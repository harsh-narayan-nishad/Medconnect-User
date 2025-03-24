// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

// const SignUp = () => {
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add form submission logic here
//     console.log("Sign-up form submitted");
//     navigate("/login"); // Redirect after successful sign-up
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 mt-11 mb-11">
//       <div className="ring-1 ring-gray-300 w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>

//         <form className="space-y-5" onSubmit={handleSubmit}>
//           {/* Full Name */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Full Name</label>
//             <input 
//               type="text" 
//               placeholder="John Doe" 
//               className="w-full p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Email Address */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Email Address</label>
//             <input 
//               type="email" 
//               placeholder="example@example.com" 
//               className="w-full p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* New Password Field */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">New Password</label>
//             <div className="relative">
//               <input 
//                 type={showNewPassword ? "text" : "password"} 
//                 placeholder="Enter password" 
//                 className="w-full p-3 pr-12 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowNewPassword(!showNewPassword)}
//                 className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
//               >
//                 {showNewPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//               </button>
//             </div>
//           </div>

//           {/* Confirm Password Field */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
//             <div className="relative">
//               <input 
//                 type={showConfirmPassword ? "text" : "password"} 
//                 placeholder="Re-enter password" 
//                 className="w-full p-3 pr-12 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
//               >
//                 {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//               </button>
//             </div>
//           </div>

//           {/* Message */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Message</label>
//             <textarea 
//               rows="4" 
//               placeholder="Your message..." 
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//             ></textarea>
//           </div>

//           {/* Upload CV */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Upload CV</label>
//             <input 
//               type="file" 
//               className="w-full border p-2 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500" 
//             />
//             <p className="text-xs text-gray-500 mt-1">Max file size: 50MB</p>
//           </div>

//           {/* Submit Button */}
//           <div className="text-center">
//             <button 
//               type="submit" 
//               className="w-full bg-gradient-to-r from-orange-500 to-red-800 text-white py-3 rounded-lg font-medium "
//             >
//               Send Application
//             </button>
//           </div>

//           {/* Login Link with React Router */}
//           <div className="text-center mt-4">
//             <p className="text-gray-700">
//               Already have an account?{" "}
//               <button 
//                 type="button" 
//                 onClick={() => navigate("/login")} 
//                 className="text-blue-600 hover:underline font-medium"
//               >
//                 Login
//               </button>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const SignUp = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    age: "",
    DOB: "",
    gender: "",
    location: "",
    govid: "",
    medicalHistory: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://med-connect-backend.onrender.com/api/auth/register/user",
        formData
      );
      console.log("Registration Success:", response.data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 mt-11 mb-11">
      <div className="ring-1 ring-gray-300 w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input 
              type="text" 
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="John Doe" 
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@example.com"
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone</label>
            <input 
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="1234567890"
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Age</label>
            <input 
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
            <input 
              type="date"
              name="DOB"
              value={formData.DOB}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Gender</label>
            <select 
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Location</label>
            <input 
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, State"
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">New Password</label>
            <div className="relative">
              <input 
                type={showNewPassword ? "text" : "password"} 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full p-3 pr-12 border rounded-lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showNewPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="w-full p-3 pr-12 border rounded-lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-800 text-white py-3 rounded-lg font-medium"
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-4">
            <p className="text-gray-700">
              Already have an account?{" "}
              <button 
                type="button" 
                onClick={() => navigate("/login")} 
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
