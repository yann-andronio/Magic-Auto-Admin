import { Fragment } from "react/jsx-runtime";

import Header from "../../components/header/Header";
import FeaturesSection from "../../components/featuresection/FeaturesSection";
import Pub2 from "../../components/pub2/Pub2";
import Footers from "../../components/footers/Footers";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const HomeUser: React.FC = () => {
  return (
    <Fragment>
      <div className=" relative bg-cover bg-center lg:min-h-screen    ">
        <Navbar />

        <main>
          <Outlet />
        </main>
      </div>

      {/* <div className="header pt-16 ">
                <Header />
            </div>
            <main className={``}>
                <div className="pub1 p-5">
                    <FeaturesSection />
                </div>
                <div className="pub2 p-5">
                    <Pub2 />
                </div>
                <div className="pub2 ">
                    <Footers />
                </div>

            </main> */}
    </Fragment>
  );
};
export default HomeUser;
