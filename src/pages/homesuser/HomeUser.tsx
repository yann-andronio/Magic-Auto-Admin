import { Fragment } from "react/jsx-runtime";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Footer from "../../components/footer/Footer";
import "./homeuser.css"


const HomeUser: React.FC = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
    
  const  location=useLocation()
  return (
    <Fragment>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main>
          <Outlet />
        </main>
        {location.pathname == "/home/reservation" ? null  : <footer className=" pt-0 bg-transparent  foot">
          <Footer />
        </footer>}
       
      </div>
    </Fragment>
  );
};
export default HomeUser;
