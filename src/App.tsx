import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

function App() {
 

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
