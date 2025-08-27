import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const GoogleAuth = () => {
    const searchParams = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = searchParams.get("accessToken");
        const refreshToken = searchParams.get("refreshToken");

        if (accessToken && refreshToken) {

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);


            navigate("/dashboard");
        } else {

            navigate("/login");
        }
    }, [searchParams, navigate]);

    return <p>Processando login via Google...</p>;
};

export default GoogleAuth;
