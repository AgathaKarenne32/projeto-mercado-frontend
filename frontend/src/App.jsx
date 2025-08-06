import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";

const App = () => {
  const location = useLocation();

  const showHeader = !["/", "/signup"].includes(location.pathname);
  const showBottomNav = ["/purchase", "/list", "/reports/general", "/reports/item"].includes(
    location.pathname
  );

  return (
    <div className="phone-mockup">
      {showHeader && <Header />}
      <main className="main-content">
        <Outlet />
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
};

export default App;
