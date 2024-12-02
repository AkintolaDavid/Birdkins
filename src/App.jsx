import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Landing from "./Landing";
import LandingBox from "./LandingBox";
import FeaturedCourse from "./FeaturedCourse";
import AboutTechbams from "./AboutTechbams";
import { ChakraProvider } from "@chakra-ui/react";
import BrowseCourse from "./BrowseCourse";
import Testimonial from "./Testimonial";
import Blog from "./Blog";
import Footer from "./Footer";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import VerifyOTP from "./auth/SignupverifyOtp";
import ForgotPassword from "./auth/ForgotPassword";
import PasswordVerifyOTP from "./auth/PasswordVerifyOtp";
import ResetPassword from "./auth/Resetpassword";
import ProtectedRoute from "./ProtectedRoute";
import CoursePage from "./CoursePage";
import Home from "./Home";
import SignupTutor from "./auth/SignupTutor";
import SignupVerifyOtpTutor from "./auth/SignupVerifyOtpTutor";
import SigninTutor from "./auth/SigninTutor";
import ForgotPasswordTutor from "./auth/ForgotPasswordTutor";
import PasswordVerifyOTPTutor from "./auth/PasswordVerifyOTPTutor";
import ResetPasswordTutor from "./auth/ResetPasswordTutor";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signintutor" element={<SigninTutor />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signuptutor" element={<SignupTutor />} />
          <Route path="/verifyOtp" element={<VerifyOTP />} />
          <Route path="/verifyOtpTutor" element={<SignupVerifyOtpTutor />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<PasswordVerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/forgot-passwordtutor"
            element={<ForgotPasswordTutor />}
          />
          <Route path="/verify-otptutor" element={<PasswordVerifyOTPTutor />} />
          <Route path="/reset-passwordtutor" element={<ResetPasswordTutor />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course/:id"
            element={
              <ProtectedRoute>
                <CoursePage />
              </ProtectedRoute>
            }
          />{" "}
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
