import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import BottomNav from "./components/BottomNav";

const App = () => {
  const location = useLocation();

  const showHeader = !["/", "/signup"].includes(location.pathname);
  const showBottomNav = ["/purchase", "/list", "/reports/general", "/reports/item"].includes(
    location.pathname
  );

  return (
    <main>
      {/* {showHeader && <Header />} */}
      <Header />
      <section className="main-content">
        <Outlet />
      </section>
      {/* {showBottomNav && <BottomNav />} */}
    </main>
  );
};

export default App;
