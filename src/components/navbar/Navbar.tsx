import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Responsivenavbar from "../responsivenavbar/Responsivenavbar";
import { NavLink, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const [menuopen, setmenuopen] = useState<boolean>(false);
  const location = useLocation();

  const navItems = [
    { name: "Accueil", path: "/home" },
    { name: "Réservation", path: "/home/reservation" },
    { name: "Conseils", path: "/home/conseils" },
  ];

  const navStyles = {
    onhome: {
      active: "text-yellow-600 underline decoration-yellow-600",
      inactive: "text-white hover:text-yellow-600 no-underline",
    },
    onOther: {
      active: "text-blue-600 underline decoration-blue-600",
      inactive: "text-[#292929] hover:text-blue-500 no-underline",
    },
  };

  const currentStyles =location.pathname === "/home" ? navStyles.onhome : navStyles.onOther;
  const styleDeBase ="font-semibold transition-colors duration-300 decoration-2 underline-offset-8";

  return (
    <nav className="absolute w-full bg-transparent dark:bg-transparent">
      <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* logo */}
          <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
            <a
              href="/"
              className="text-2xl font-extrabold text-white select-none"
            >
              Magic<span className="text-blue-500"> Auto</span>
            </a>
          </div>

          {/* menu */}
          <div className="flex items-center space-x-6 md:space-x-10 dark:text-gray-100">
            <div className="hidden md:flex space-x-10 px-8 py-3">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  end={item.path === "/home"}
                  className={({ isActive }) =>`${styleDeBase} ${isActive ? currentStyles.active : currentStyles.inactive}`}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            <button
              className="md:hidden text-white hover:text-blue-500"
              onClick={() => setmenuopen(!menuopen)}
            >
              {menuopen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {menuopen && <Responsivenavbar setmenuopen={setmenuopen} />}
      </div>
    </nav>
  );
};

export default Navbar;
