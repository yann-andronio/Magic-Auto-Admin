import React from "react";
import { Link } from "react-router-dom";

interface Props {
  setmenuopen: (value: boolean) => void;
}

const Responsivenavbar: React.FC<Props> = ({ setmenuopen }) => {
  const navItems = [
    { name: "Accueil", path: "/home" },
    { name: "Réservation", path: "/home/reservation" },
    { name: "Conseils", path: "/home/conseils" },
  ];

  return (
    <div className="md:hidden absolute top-20 right-4 w-40 bg-white dark:bg-gray-900/90 rounded-lg shadow-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700 z-50 py-2">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          onClick={() => setmenuopen(false)}
          className="block cursor-pointer text-sm font-medium text-gray-800 dark:text-gray-100 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-white dark:hover:bg-yellow-500 transition-colors duration-200"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Responsivenavbar;
