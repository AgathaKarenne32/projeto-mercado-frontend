import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";

const App = () => {
  const location = useLocation();

  const showHeader = !["/", "/signup"].includes(location.pathname);
  const showBottomNav = [
    "/purchase",
    "/list",
    "/reports/general",
    "/reports/item",
  ].includes(location.pathname);

  return (
    <main>
      <Header />
      <section className="main-content">
        <Outlet />
      </section>

    </main>
  );
};

export default App;
