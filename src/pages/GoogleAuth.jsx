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
    useEffect(() => {
      const accessToken = searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken");
      const userParam = searchParams.get("user");

      if (accessToken && refreshToken) {
        try {
          let userObj = null;
          if (userParam) {
            const cleanJson = userParam
              .replace(/^{|}$/g, "")
              .replace(/([a-zA-Z0-9_]+)=/g, '"$1":')
              .replace(/'/g, '"');
            userObj = JSON.parse(`{${cleanJson}}`);
          }

          login({ accessToken, refreshToken, user: userObj });
        } catch (e) {
          console.error("Erro no parse do usuário, logando apenas com tokens:", e);
          login({ accessToken, refreshToken, user: null });
        }
      } else {
        navigate("/login");
      }
    }, [searchParams, login, navigate]);
  }, [searchParams, login, navigate]);

  return <p>Processando login via Google...</p>;
};

export default GoogleAuth;
