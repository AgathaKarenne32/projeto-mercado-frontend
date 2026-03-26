import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const GoogleAuth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const userParam = searchParams.get("user");


    const decoded = decodeURIComponent(userParam || "");
    const json = decoded
      .replace(/=/g, ":")
      .replace(/'/g, '"')
      .replace(/([a-zA-Z0-9_]+):/g, '"$1":');
    const { username, email } = JSON.parse(json);

    if (accessToken && refreshToken && username && email) {
      login({ accessToken, refreshToken, user: { username, email } });
      return;
    }
    try {
      const userParam = searchParams.get("user");
      if (accessToken && refreshToken && userParam) {
        const cleanJson = userParam
          .replace(/^{|}$/g, "")
          .replace(/([a-zA-Z0-9_]+)=/g, '"$1":')
          .replace(/'/g, '"');

        const userData = JSON.parse(`{${cleanJson}}`);

        login({
          accessToken,
          refreshToken,
          user: userData
        });
        return;
      }
    } catch (e) {
      console.error("Erro ao processar dados do Google:", e);
      login({ accessToken, refreshToken, user: null });
    }
    navigate("/login");
  }, [searchParams]);

  return <p>Processando login via Google...</p>;
};

export default GoogleAuth;
