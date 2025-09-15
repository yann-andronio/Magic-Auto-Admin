
import s from "./header.module.css";


export default function Header() {
  return (
    <div
      className={` ${s.arriereplan} flex flex-row h-screen justify-center items-center overflow-hidden `}
    >
      <div
        className={`text-3xl  w-full lg:w-1/2 flex flex-col justify-center items-center relative`}
      >
        <h2 className="text-white text-4xl font-bold mb-4">
          Votre meilleure guide
        </h2>

        <h2 className="text-[#ffc935] ">pour la sécurité et propreté</h2>
      </div>

      <div className="hidden lg:flex md:w-1/2 justify-end items-end relative">
        <img
          src="./assets/image/deco/vamep.png"
          alt=""
          className="object-contain"
        />
      </div>
    </div>
  );
}
