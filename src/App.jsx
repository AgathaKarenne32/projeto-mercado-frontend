import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header-Mobile/header-mobile";

const App = () => {
  const location = useLocation();

  const showHeader = !["/login", "/signup"].includes(location.pathname);
  const showBottomNav = [
    "/purchase",
    "/list",
    "/reports/general",
    "/reports/item",
  ].includes(location.pathname);

  return (
    <main>
      {showHeader && <Header />}
      <section className="main-content">
        <Outlet />
      </section>
      {showBottomNav}
    </main>
  );
};

export default App;
