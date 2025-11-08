import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Profile from "../pages/Profile/Profile";
import Purchase from "../pages/Purchase/Purchase";
import Drafts from "../pages/Drafts/Drafts";
import Reports from "../pages/Reports";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard/dashboard";
import MyReports from "../pages/MyReport";
import GoogleAuth from "../pages/GoogleAuth";
import ConfirmRegistration from "../pages/ConfirmRegistration/ConfirmRegistration";
import PrivateRoute from "../components/PrivateRoute";
import { useAuth } from "../contexts/AuthContext";

const LoginRedirect = () => {
  const { authData, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (authData && authData.accessToken) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Login />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/login" element={<LoginRedirect />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/auth/callback" element={<GoogleAuth />} />
    <Route
      path="/auth/confirm-registration"
      element={<ConfirmRegistration />}
    />

    <Route element={<PrivateRoute />}>
      <Route element={<App />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/compras" element={<Purchase />} />
        <Route path="/rascunhos" element={<Drafts />} />
        <Route path="/meus-relatorios" element={<MyReports />} />
        <Route path="/relatorios" element={<Reports />} />
        <Route path="/perfil" element={<Profile />} />
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;
