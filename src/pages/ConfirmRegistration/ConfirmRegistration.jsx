import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import styles from "./ConfirmRegistration.module.css";

export default function ConfirmRegistration() {
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState("Confirmando sua conta...");

    useEffect(() => {
        const token = new URLSearchParams(location.search).get("token");

        if (!token) {
            setMessage("Token inválido!");
            return;
        }

        api.post("/auth/confirm-registration", { token })
            .then(() => {
                setMessage("Conta ativada com sucesso! Redirecionando para login...");
                setTimeout(() => navigate("/login"), 3000);
            })
            .catch((err) => {
                setMessage(err.response?.data?.message || "Ocorreu um erro ao ativar sua conta.");
            });
    }, [location.search, navigate]);

    return (
        <div className={styles.container}>
            {message.includes("sucesso") && (
                <i className={`fas fa-check-circle ${styles.iconSuccess}`}></i>
            )}
            <h1 className={styles.message}>{message}</h1>
            {message.includes("sucesso") && (
                <button className={styles.button} onClick={() => navigate("/login")}>
                    Faça Login
                </button>
            )}
        </div>
    );
}
