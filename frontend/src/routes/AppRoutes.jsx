import { Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import PurchaseForm from "../pages/PurchaseForm";
import PurchaseList from "../pages/PurchaseList";
import Drafts from "../pages/Drafts";
import Reports from "../pages/Reports";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => (
    <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<App />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/purchase" element={<PurchaseForm />} />
            <Route path="/list" element={<PurchaseList />} />
            <Route path="/drafts" element={<Drafts />} />
            <Route path="/reports" element={<Reports />} />

        </Route>
    </Routes>
);

export default AppRoutes;
