import { Link } from "react-router-dom";
import s from "./header.module.css";
import moto from "../../image/deco/Moto.png";

export default function Header() {
  return (
    <div
      className={` ${s.arriereplan} flex flex-row h-screen justify-center items-center overflow-hidden bg-[#759EEE] lg:bg-transparent `}
    >
      <div
        className="hidden lg:flex md:w-1/2 justify-start items-start relative"
        data-aos="fade-right"
        data-aos-duration="2000"
      >
        <img src={moto} alt="" />
      </div>
      <div
        className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left relative z-10"
        data-aos="fade-left"
        data-aos-duration="2000"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
          Bienvenue chez <span className="text-[#f8c53b]">Magic Auto</span>
        </h1>

        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
          Votre guide pour la sécurité et la propreté
        </h2>

        <p className="text-white text-lg sm:text-xl max-w-lg mb-8 opacity-90">
          Découvrez des conseils pratiques, des solutions innovantes et des
          astuces d’experts pour entretenir votre véhicule, prolonger sa durée
          de vie et rouler en toute sérénité.
        </p>

        <div className="flex gap-4">
          <Link
            to="/home/conseils"
            className="bg-white text-[#759EEE] hover:bg-gray-100 px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105"
          >
            Découvrir nos conseils
          </Link>

          <Link
            to={"/home/reservation"}
            className="bg-[#f8c53b] hover:bg-[#e6b02e] text-[#333] px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105"
          >
            Réserver un service
          </Link>
        </div>
      </div>
    </div>
  );
}
