import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import Login from "./components/LoginSignup/Login";
import Signup from "./components/LoginSignup/SignUp";
import DoctorSearch from "./components/Pages/DoctorSearch"
import UserDashboard from "./components/Pages/UserDashboard"
import AppointmentSchedule from "./components/Pages/AppointmentSchedule";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path ="doctor-search" element={<DoctorSearch/>} />
        <Route path = "user-dashboard" element={<UserDashboard/>} />
        <Route path = "appointment" element={<AppointmentSchedule />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
