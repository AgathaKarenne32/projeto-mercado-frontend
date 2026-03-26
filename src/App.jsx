import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import HeaderMobile from "./components/Header-Mobile/header-mobile";
import { useAuth } from "./contexts/AuthContext";
import { useEffect, useState } from "react";

const App = () => {
  const { authData } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Atualiza o estado se a janela redimensionar
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="app-container">
      {/* O Header só aparece se houver dados de autenticação */}
      {authData && (isMobile ? <HeaderMobile /> : <Header />)}

      <section className="main-content">
        <Outlet />
      </section>
    </main>
  );
};

export default App;