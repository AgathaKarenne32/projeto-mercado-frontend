import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const GoogleAuth = () => {
    const [searchParams] = useSearchParams();
    const { login } = useAuth();

    useEffect(() => {
        const accessToken = searchParams.get("accessToken");
        const refreshToken = searchParams.get("refreshToken");

        if (accessToken && refreshToken) {
            login({ token: accessToken, refreshToken });
        } else {
            window.location.href = "/login";
        }
    }, [searchParams]);

    return <p>Processando login via Google...</p>;
};

export default GoogleAuth;
