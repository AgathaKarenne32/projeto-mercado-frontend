import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const STORAGE_KEY = "@ComprasFacil:authData";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tenta recuperar os dados consolidados
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setAuthData(JSON.parse(stored));
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = (data, redirect = true) => {
    const accessToken = data.accessToken || data.token;
    const refreshToken = data.refreshToken || data.refreshTokenId;
    const user = data.user || null;

    if (!accessToken) {
      console.error("Erro: Token não encontrado na resposta do servidor.");
      return;
    }

    const sessionData = { accessToken, refreshToken, user };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
    setAuthData(sessionData);

    if (redirect) {
      navigate("/dashboard", { replace: true });
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthData(null);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);