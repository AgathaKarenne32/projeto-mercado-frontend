import React, { useState } from "react";
import BottomNav from "./components/BottomNav.jsx";
import Header from "./components/Header.jsx";
import LoginScreen from "./components/LoginScreen.jsx";
import SignUpScreen from "./components/SignUpScreen.jsx";
import CadastroComprasScreen from "./components/CadastroComprasScreen.jsx";
import ListaComprasScreen from "./components/ListaComprasScreen.jsx";
import RelatoriosGeralScreen from "./components/RelatoriosGeralScreen.jsx";
import RelatoriosItemScreen from "./components/RelatoriosItemScreen.jsx";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("login");
  const [headerTitle, setHeaderTitle] = useState("");
  const [showHeader, setShowHeader] = useState(false);
  const [showBottomNav, setShowBottomNav] = useState(false);
  const [activeNav, setActiveNav] = useState("");
  const [reportTab, setReportTab] = useState("geral");

  const handleScreenChange = (screenName, title = "", navActive = "") => {
    setCurrentScreen(screenName);
    setHeaderTitle(title);
    setShowHeader(screenName !== "login" && screenName !== "signup");
    setShowBottomNav(
      screenName === "cadastroCompras" ||
      screenName === "listaCompras" ||
      screenName === "relatoriosGeral" ||
      screenName === "relatoriosItem",
    );
    setActiveNav(navActive);
    if (screenName.includes("relatorios")) {
      setShowBottomNav(true);
      setActiveNav("relatorios");
    }
  };

  const handleReportTabChange = (tab) => {
    setReportTab(tab);
    setCurrentScreen(tab === "geral" ? "relatoriosGeral" : "relatoriosItem");
    setHeaderTitle("Relatórios");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return (
          <LoginScreen
            onLoginSuccess={() =>
              handleScreenChange(
                "cadastroCompras",
                "Cadastro de Compras",
                "cadastro",
              )
            }
            onSignUpClick={() => handleScreenChange("signup")}
          />
        );
      case "signup":
        return (
          <SignUpScreen
            onSignUpSuccess={() =>
              handleScreenChange(
                "cadastroCompras",
                "Cadastro de Compras",
                "cadastro",
              )
            }
            onLoginClick={() => handleScreenChange("login")}
          />
        );
      case "cadastroCompras":
        return <CadastroComprasScreen />;
      case "listaCompras":
        return <ListaComprasScreen />;
      case "relatoriosGeral":
        return (
          <RelatoriosGeralScreen
            onTabChange={handleReportTabChange}
            activeTab={reportTab}
          />
        );
      case "relatoriosItem":
        return (
          <RelatoriosItemScreen
            onTabChange={handleReportTabChange}
            activeTab={reportTab}
          />
        );
      default:
        return (
          <LoginScreen
            onLoginSuccess={() =>
              handleScreenChange(
                "cadastroCompras",
                "Cadastro de Compras",
                "cadastro",
              )
            }
            onSignUpClick={() => handleScreenChange("signup")}
          />
        );
    }
  };

  return (
    <div className="phone-mockup">
      {showHeader && (
        <Header
          title={headerTitle}
          onBackClick={() => handleScreenChange("login")}
        />
      )}
      <main className="main-content">{renderScreen()}</main>
      {showBottomNav && (
        <BottomNav
          activeNav={activeNav}
          onNavClick={(nav) => {
            if (nav === "cadastro") {
              handleScreenChange(
                "cadastroCompras",
                "Cadastro de Compras",
                "cadastro",
              );
            } else if (nav === "compras") {
              handleScreenChange("listaCompras", "Lista de Compras", "compras");
            } else if (nav === "relatorios") {
              handleScreenChange("relatoriosGeral", "Relatórios", "relatorios");
              setReportTab("geral");
            }
          }}
        />
      )}
    </div>
  );
};

export default App;
