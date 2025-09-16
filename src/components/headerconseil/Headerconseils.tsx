import s from "./headerconseil.module.css";
import vamepImage from "../../../public/assets/image/deco/vamep.png";
export default function Headerconseils() {
  return (
    <div
      className={` ${s.arriereplan} flex flex-row h-screen justify-center items-center overflow-hidden `}
    >
      <div
        className="relative z-10 text-center lg:text-left w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start p-8"
        data-aos="fade-right"
        data-aos-duration="1500"
      >
        <h1 className="text-white text-5xl lg:text-6xl font-extrabold mb-4 animate-fade-in-up">
          Astuces & Conseils
        </h1>
        <h2 className="text-white text-2xl lg:text-3xl font-light mb-6 animate-fade-in-up delay-200">
          Optimisez la sécurité et l’entretien de votre véhicule
        </h2>
        <p className="text-white text-lg max-w-lg mb-8 animate-fade-in-up delay-400">
          Nos experts vous guident avec des conseils pratiques pour garder votre
          voiture propre, sûre et performante. Découvrez des routines simples et
          efficaces pour prolonger la vie de votre véhicule et rouler l’esprit
          tranquille.
        </p>

        <a
          href="#guides"
          className="bg-[#f8c53b] hover:bg-[#e6b02e] text-[#333] px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105"
        >
          Voir les guides
        </a>
      </div>

      <div
        className="hidden lg:flex md:w-1/2 justify-end items-end relative"
        data-aos="fade-left"
        data-aos-duration="1500"
      >
        <img src={vamepImage} alt="" />
      </div>
    </div>
  );
}
