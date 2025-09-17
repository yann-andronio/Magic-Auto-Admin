import { setActiveName } from "../../stores/slice/activeLinkSlice";
import { RootState } from "../../stores/Store";
import { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { MdSettings } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaCar, FaParking, FaHistory } from "react-icons/fa";
import { MdCarRepair } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi2";

interface Menu {
  name: string;
  path?: string;
  icon: JSX.Element;
  subMenus: { name: string; path: string; iconsubmenu?: JSX.Element }[];
}

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menus: Menu[] = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LuLayoutDashboard size={23} />,
      subMenus: [],
    },
    {
      name: "Utilisateurs inscrits",
      path: "/admin/userregister",
      icon: <HiUserGroup size={23} />,
      subMenus: [],
    },
    {
      name: "Réservations Parking",
      path: "/home/parkingReservations",
      icon: <FaCar size={23} />,
      subMenus: [],
    },
    {
      name: "Lavage véhicules",
      path: "/home/lavagevehicule",
      icon: <MdCarRepair size={23} />,
      subMenus: [],
    },
    {
      name: "Parking en temps réel",
      path: "/admin/parkingRealtime",
      icon: <FaParking size={23} />,
      subMenus: [],
    },
    // {
    //   name: "Historique",
    //   path: "/home/historique",
    //   icon: <FaHistory size={21} />,
    //   subMenus: [],
    // },
  ];

  const dispatch = useDispatch();
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar);
  const activeName = useSelector(
    (state: RootState) => state.activeLink.activeName
  );

  const handleMenuClick = (menuName: string) => {
    if (closeBar) return;
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  useEffect(() => {
    if (closeBar) {
      setActiveMenu(null);
    }
  }, [closeBar]);

  return (
    <div className="relative">
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-[550ms] ease-in-out
        ${closeBar ? "w-20" : "w-64"} 
        bg-gradient-to-b from-[#5b6b90] to-[#759eee] shadow-xl text-white`}
        aria-label="Sidenav"
      >
        {/* Header logo */}
        <div className="flex items-center justify-center p-4 border-b border-[#3e5684]">
          <h1 className="font-mono text-2xl font-semibold text-[#fdb73d] transition-all duration-300">
            Logo
          </h1>
        </div>

        <div className="overflow-y-auto py-2 px-3 h-full">
          <ul className="space-y-2.5">
            {menus.map((menu, index) => (
              <li key={index} className="relative">
                {menu.subMenus.length === 0 ? (
                  <NavLink
                    onClick={() => dispatch(setActiveName(menu.name))}
                    to={menu.path || "#"}
                    end={menu.path === "/admin"} 
                    className={({ isActive }) =>
                      `relative flex items-center rounded-lg transition-all duration-300 p-2 
                      ${
                        isActive
                          ? "bg-[#759eee] text-white font-semibold"
                          : "text-gray-300 hover:bg-[#3d5173] hover:text-[#fdb73d]"
                      }
                      ${closeBar ? "justify-center" : "w-full"}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <span className="absolute left-0 top-0 h-full w-1 rounded-tl-lg rounded-bl-lg " />
                        )}
                        <span className="flex-shrink-0">{menu.icon}</span>
                        {!closeBar && (
                          <span className="ml-3 font-medium whitespace-nowrap">
                            {menu.name}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleMenuClick(menu.name)}
                    className={`flex items-center rounded-lg transition-all duration-300 p-2 w-full 
                      text-gray-300 hover:text-white hover:bg-[#2d3c52]
                      ${closeBar ? "justify-center" : ""}`}
                  >
                    <span className="flex-shrink-0">{menu.icon}</span>
                    {!closeBar && (
                      <span className="ml-3 font-medium whitespace-nowrap">
                        {menu.name}
                      </span>
                    )}
                    {!closeBar && (
                      <IoIosArrowForward
                        className={`flex-shrink-0 text-gray-400 transform transition-transform duration-300 ml-auto
                        ${activeMenu === menu.name ? "rotate-90" : ""}`}
                      />
                    )}
                  </button>
                )}
                {/* Sous-menus */}
                {menu.subMenus.length > 0 && activeMenu === menu.name && (
                  <ul className="pl-8 mt-2 space-y-2">
                    {menu.subMenus.map((subMenu, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={subMenu.path}
                          className="flex items-center p-2 text-sm text-gray-400 rounded-lg hover:bg-[#2d3c52] hover:text-white transition-colors duration-300"
                        >
                          {subMenu.iconsubmenu}
                          {!closeBar && (
                            <span className="ml-3">{subMenu.name}</span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Foote */}
        <div className="absolute bottom-4 left-0 w-full px-4 flex flex-col space-y-3">
          <button
            className={`flex items-center p-2 rounded-lg transition-all duration-300 shadow-lg
              bg-white text-[#1f2937] hover:bg-red-500 hover:text-white
              ${closeBar ? "justify-center" : ""}`}
          >
            <FiLogOut size={20} />
            {!closeBar && <span className="ml-3">Se déconnecter</span>}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
