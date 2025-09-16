import Header from "../../components/header/Header";
import { servicesData } from "../../data/servicesData";

export default function Home() {
  return (
    <div className=" overflow-hidden">
      <header>
        <Header />
      </header>
      <main>
        <section id="Services" className="relative py-20 px-6 mt-6">
          {/* titre */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#759eee] dark:text-white mb-4">
              Nos Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              "Découvrez nos prestations de lavage et de parking, alliant
              qualité, rapidité et sécurité."
            </p>
          </div>

          {/* Card services */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 z-10 relative">
            {servicesData.map((service, index) => (
              <div
                key={index}
                className={`rounded-xl p-8 shadow-lg transition-shadow cursor-default bg-gradient-to-r hover:shadow-2xl ${service.gradient}`}
                data-aos="zoom-in"
                data-aos-duration="1500"
              >
                {/* header card*/}
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white p-3 rounded-full">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {service.title}
                  </h3>
                </div>

                <p className="text-white/90 mb-6">{service.description}</p>

                {/* resakaprix */}
                <div className="bg-white/10 p-4 rounded-lg mb-6 shadow-inner">
                  <h4 className="text-white text-xl font-bold mb-2">Tarifs</h4>
                  {service.prices.map((price, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-1"
                    >
                      <span className="text-white/90">{price.label}</span>
                      <span className="text-white font-bold">
                        {price.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Liste des détails */}
                <h4 className="text-white text-xl font-bold mb-3">
                  Inclus dans le service :
                </h4>
                <div className="relative">
                  <ul className="space-y-3">
                    {service.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-white"
                      >
                        <span className="bg-white/20 p-2 rounded-full flex items-center justify-center">
                          {detail.icon}
                        </span>
                        <span className="text-lg">{detail.label}</span>
                      </li>
                    ))}
                  </ul>

                  <img
                    src={`./assets/image/deco/${service.image}.png`}
                    alt={`Image de ${service.title}`}
                    className=" -right-7 top-0 absolute object-cover rounded-t-xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
