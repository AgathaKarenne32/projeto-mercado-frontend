import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
    const { authData, loading } = useAuth(); // NOVO: Pega o loading

    if (loading) {
        return <div>Carregando...</div>; // Renderiza um placeholder
    }

    if (!authData || !authData.accessToken) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;