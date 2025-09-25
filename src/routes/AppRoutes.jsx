import { Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Profile from "../pages/Profile/Profile";

import Purchase from '../pages/Purchase/Purchase'
import Drafts from "../pages/Drafts";
import Reports from "../pages/Reports";

import ForgotPassword from "../pages/ForgotPassword";
import VerifyCode from "../pages/VerifyCode";
import NewPassword from "../pages/NewPassword";

import Dashboard from "../pages/Dashboard/dashboard";
import MyReports from "../pages/MyReport";
import GoogleAuth from "../pages/GoogleAuth";


const AppRoutes = () => (

  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/verify-code" element={<VerifyCode />} />
    <Route path="/reset-password" element={<NewPassword />} />
    <Route path="/auth/callback" element={<GoogleAuth />} />

    <Route element={<App />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/compras" element={<Purchase />} />
      <Route path="/rascunhos" element={<Drafts />} />
      <Route path="/meus-relatorios" element={<MyReports />} />
      <Route path="/relatorios" element={<Reports />} />
      <Route path="/perfil" element={<Profile />} />
    </Route>
  </Routes>

);

export default AppRoutes;
