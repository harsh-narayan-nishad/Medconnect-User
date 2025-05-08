import {Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import Login from "./components/LoginSignup/Login";
import Signup from "./components/LoginSignup/SignUp";
import DoctorSearch from "./components/Pages/DoctorSearch";
import UserDashboard from "./components/Pages/UserDashboard";
import AppointmentSchedule from "./components/Pages/AppointmentSchedule";
import ShareQr from "./components/ShareQrCode";
import DoctorProfile from "./components/Pages/DoctorsProfile";
<<<<<<< HEAD
import UserProfile from "./components/Pages/UserProfile";
=======
import VideoConfrence from "./components/VideoConfrence";
>>>>>>> f1aa93604b3578966f15d0dc49f99e549e25225d

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path ="doctor-search" element={<DoctorSearch/>} />
        <Route path = "user-dashboard/:username" element={<UserDashboard/>} />
        <Route path = "appointment" element={<AppointmentSchedule />} />
        <Route path = "qr-code-sharing" element = {<ShareQr />} />
        <Route path="/doctors-page/:id" element={<DoctorProfile />} />
<<<<<<< HEAD
        <Route path="/User-page/:id" element={<UserProfile />} />
 
=======
        <Route path = "/video" element ={<VideoConfrence/>} />

>>>>>>> f1aa93604b3578966f15d0dc49f99e549e25225d
      </Routes>
    </>
  );
};

export default AppRoutes;
