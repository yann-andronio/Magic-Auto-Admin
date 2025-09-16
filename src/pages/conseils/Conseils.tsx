import { useState } from "react";
import Headerconseils from "../../components/headerconseil/Headerconseils";
import conseilsData from "../../data/conseilsData";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import im1 from "../../../public/assets/image/conseils/1.png";
import im2 from "../../../public/assets/image/conseils/2.png";
import im3 from "../../../public/assets/image/conseils/3.png";
import im4 from "../../../public/assets/image/conseils/4.png";
import im5 from "../../../public/assets/image/conseils/5.png";

export default function Home() {
  const [open, setOpen] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpen(open === index ? null : index);
  };

  return (
    <div className=" min-h-screen overflow-hidden">
      <header>
        <Headerconseils />
      </header>

      <main className="py-20 px-4  sm:px-12 lg:px-28">
        <div className="text-center mb-16">
          <h2 className="text-4xl relative sm:text-5xl font-extrabold text-[#759eee] mb-4 font-poppins">
            Conseils d'experts pour votre véhicule
            <img
              src={im3}
              className="absolute -top-10 -right-20 w-[18%] hidden lg:block"
              data-aos="fade-left"
            />
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Gardez votre voiture en parfait état grâce à nos astuces pratiques
            sur le lavage, l'entretien et la sécurité. Chaque conseil est un pas
            de plus vers une conduite sereine et un véhicule impeccable.
          </p>
        </div>

        <div className="relative">
          <img
            src={im1}
            className="absolute top-0 left-0 w-[17%] hidden lg:block"
            data-aos="fade-right"
          />
          <img
            src={im4}
            className="absolute top-[20rem] -right-10 w-[17%] hidden lg:block"
            data-aos="fade-left"
          />
          <img
            src={im2}
            className="absolute top-[40rem] -left-16 w-[15%] hidden lg:block"
            data-aos="fade-right"
          />
          <img
            src={im5}
            className="absolute top-[60rem] -right-16 w-[13%] hidden lg:block"
            data-aos="fade-left"
          />
        </div>
        {/* liste conseils jiaby */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {conseilsData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => toggleOpen(index)}
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <div
                className="p-6 flex items-center justify-between"
                style={{ borderLeft: `5px solid ${item.color}` }}
              >
                <div className="flex items-center">
                  <div className="text-4xl mr-4" style={{ color: item.color }}>
                    {item.icone}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 leading-tight">
                    {item.titre}
                  </h3>
                </div>
                <button className="text-xl text-blue-500 hover:text-blue-700 transition-colors duration-300">
                  {open === index ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  open === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0">
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: `${item.color}15`,
                      border: `1px solid ${item.color}30`,
                    }}
                  >
                    <p className="font-bold mb-1" style={{ color: item.color }}>
                      💡 Notre suggestion
                    </p>
                    <p className="text-sm text-gray-700">{item.suggestion}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
