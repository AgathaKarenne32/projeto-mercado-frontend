import { Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Purchase from "../pages/Purchase/Purchase";
import Drafts from "../pages/Drafts";
import Reports from "../pages/Reports";
import Dashboard from "../pages/Dashboard/dashboard";
import Profile from "../pages/Profile/Profile";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />

    <Route element={<App />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/compras" element={<Purchase />} />
      <Route path="/rascunhos" element={<Drafts />} />
      <Route path="/relatorios" element={<Reports />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/perfil" element={<Profile />} />
    </Route>
  </Routes>
);

export default AppRoutes;
