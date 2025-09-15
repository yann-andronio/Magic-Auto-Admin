import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    Aos.init({ duration: 1000 }); // tu peux configurer la durée par défaut
  }, []);

  return (
    <>
      {/* Navbar ou Footer global ici */}
      <Outlet />
    </>
  );
}

export default App;
