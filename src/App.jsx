
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";


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
