import { Outlet } from "react-router-dom";
import Header from "./components/Header-Mobile/header-mobile";


const App = () => {

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
