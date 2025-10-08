import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [authData, setAuthData] = useState(null);


    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const user = localStorage.getItem("user");

        if (accessToken && refreshToken) {
            setAuthData({
                accessToken,
                refreshToken,
                user: user ? JSON.parse(user) : null,
            });
        }
    }, []);

    const login = (data) => {
        let accessToken, refreshToken, user;

        if (data.accessToken && data.refreshToken) {
            accessToken = data.accessToken;
            refreshToken = data.refreshToken;
            user = data.user || null;
        } else if (data.token && data.refreshTokenId) {
            accessToken = data.token;
            refreshToken = data.refreshTokenId;
            user = null;
        } else {
            console.error("Formato de resposta inesperado no login:", data);
            return;
        }

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        if (user) localStorage.setItem("user", JSON.stringify(user));
        else localStorage.removeItem("user");

        setAuthData({ accessToken, refreshToken, user });
        navigate("/dashboard", { replace: true });
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        setAuthData(null);
        navigate("/login", { replace: true });
    };

    return (
        <AuthContext.Provider value={{ authData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
