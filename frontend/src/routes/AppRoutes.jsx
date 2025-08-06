import { Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import PurchaseForm from "../pages/PurchaseForm";
import PurchaseList from "../pages/PurchaseList";
import ReportsGeneral from "../pages/ReportsGeneral";
import ReportsItem from "../pages/ReportsItem";

const AppRoutes = () => (
    <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<App />}>
            <Route path="/purchase" element={<PurchaseForm />} />
            <Route path="/list" element={<PurchaseList />} />
            <Route path="/reports/general" element={<ReportsGeneral />} />
            <Route path="/reports/item" element={<ReportsItem />} />
        </Route>
    </Routes>
);

export default AppRoutes;
