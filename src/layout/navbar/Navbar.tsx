import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../stores/Store";
import { toggleCloseBar } from "../../stores/slice/activeLinkSlice";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const activeName = useSelector(
    (state: RootState) => state.activeLink.activeName
  );
  const user = useSelector((state: RootState) => state.user);

  return (
    <Fragment>
      <div
        className="
          flex w-full justify-between items-center py-4 px-6 
          bg-white shadow-md text-gray-800 border-b border-gray-200
        "
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleCloseBar())}
            className="p-2 rounded-full transition-colors duration-200 hover:bg-gray-200 focus:outline-none"
          >
            <AiOutlineMenu size={27} className="text-[#759eee]" />
          </button>
          <h1 className="text-xl font-semibold text-[#fdb73d]">{activeName}</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <p
              className="
                h-10 w-10 rounded-full text-[#1c273a] bg-[#fdb73d] 
                flex items-center justify-center text-lg font-bold
              "
            >
              {user.name ? user.name.charAt(0).toUpperCase() : ""}
            </p>
          </div>

          <div className="flex flex-col text-sm">
            <h1 className="font-medium text-gray-800">{user.name}</h1>
            <p className="text-gray-500">{user.role}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
