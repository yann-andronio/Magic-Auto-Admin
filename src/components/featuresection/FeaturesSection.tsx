import { FaUserMd, FaHospital, FaUtensils, FaMapMarkerAlt } from 'react-icons/fa';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import s from "./featuresection.module.css";

const FeaturesSection = () => {
    return (
        <div className="py-16 bg-[#F5F5F5]">
            <div className="container mx-auto text-center">
                {/* Titre */}
                <h2 className="text-5xl font-extrabold text-[#22C55E] mb-8 font-poppins" data-aos="fade-down" data-aos-duration="1200">
                    Nos Fonctionnalités Clés
                </h2>
                <p className="text-lg text-[#4A5568] max-w-2xl mx-auto mb-12"
                    data-aos="zoom-in"
                    data-aos-delay="500"
                    data-aos-duration="1300">
                    Découvrez comment notre plateforme peut améliorer votre expérience de gestion des soins de santé.
                </p>

                {/* Fonctionnalités */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-0">
                    {/* Fonctionnalité 1 */}
                    <div
                        className={`${s.f1} bg-white p-6 rounded-2xl shadow-lg transition-shadow duration-500 transform hover:scale-105 hover:shadow-xl`}
                        data-aos="zoom-in"
                        data-aos-delay="500"
                        data-aos-duration="1300"
                    >
                        <div className="bg-[#22C55E] p-5 rounded-full inline-block mb-6">
                            <FaUserMd className="text-white text-5xl" />
                        </div>
                        <h3 className="text-[1.1rem] font-semibold text-[#333333] mb-4">Gestion des Patients</h3>
                        <ul className="text-left space-y-3 text-[#4A5568]">
                            <li className="flex items-center">
                                <AiOutlineCheckCircle className="text-[#38B2AC] mr-3" /> Suivi des patients.
                            </li>
                            <li className="flex items-center">
                                <AiOutlineCheckCircle className="text-[#38B2AC] mr-3" /> Antécédents médicaux.
                            </li>
                            <li className="flex items-center">
                                <AiOutlineCheckCircle className="text-[#38B2AC] mr-3" /> Gestion des ordonnances.
                            </li>
                        </ul>
                    </div>

                    {/* Fonctionnalité 2 */}
                    <div
                        className={`${s.f2} bg-white p-6 rounded-2xl shadow-lg transition-shadow duration-500 transform hover:scale-105 hover:shadow-xl`}
                        data-aos="zoom-in"
                        data-aos-delay="600"
                        data-aos-duration="1300"
                    >
                        <div className="bg-[#ffbb33] p-5 rounded-full inline-block mb-6">
                            <FaHospital className="text-white text-5xl" />
                        </div>
                        <h3 className="text-[1.1rem] font-semibold text-[#333333] mb-4">Consultation IA</h3>
                        <ul className="text-left space-y-3 text-[#4A5568]">
                            <li className="flex items-center">
                                <AiOutlineCheckCircle className="text-[#38B2AC] mr-3" /> Tests de symptômes.
                            </li>
                            <li className="flex items-center">
                                <AiOutlineCheckCircle className="text-[#38B2AC] mr-3" /> Hôpitaux conseillés.
                            </li>
                            <li className="flex items-center">
                                <AiOutlineCheckCircle className="text-[#38B2AC] mr-3" /> IA pour soins rapides.
                            </li>
                        </ul>
                    </div>

                    {/* Fonctionnalité 3 */}
                    <div
                        className={`${s.f3} bg-white p-6 rounded-2xl shadow-lg transition-shadow duration-500 transform hover:scale-105 hover:shadow-xl`}
                        data-aos="zoom-in"
                        data-aos-delay="700"
                        data-aos-duration="1300"
                    >
                        <div className="bg-[#4299E1] p-5 rounded-full inline-block mb-6">
                            <FaUtensils className="text-white text-5xl" />
                        </div>
                        <h3 className="text-[1.1rem] font-semibold text-[#333333] mb-4">Suggestions Alimentaires</h3>
                        <ul className="text-left space-y-3 text-[#4A5568]">
                            <li className="flex items-center">
                                <AiOutlineCheckCircle className="text-[#38B2AC] mr-3" /> Aliments à éviter.
                            </li>
                            <li className="flex items-center">
                                <AiOutlineCheckCircle className="text-[#38B2AC] mr-3" /> Conseils diététiques.
                            </li>
                            <li className="flex items-center">
                                <AiOutlineCheckCircle className="text-[#38B2AC] mr-3" /> Sur les maladies courantes.
                            </li>
                        </ul>
                    </div>

                    {/* Fonctionnalité 4 */}
                    <div
                        className={`${s.f4} bg-white p-6 rounded-2xl shadow-lg transition-shadow duration-500 transform hover:scale-105 hover:shadow-xl`}
                        data-aos="fade-left"
                        data-aos-delay="800"
                        data-aos-duration="1300"
                    >
                        <div className="bg-[#FF6347] p-5 rounded-full inline-block mb-6">
                            <FaMapMarkerAlt className="text-white text-5xl" />
                        </div>
                        <h3 className="text-[1.1rem] font-semibold text-[#333333] mb-4">Recherche des Hôpitaux</h3>
                        <ul className="text-left space-y-3 text-[#4A5568]">
                            <li className="flex items-center">
                                <AiOutlineCheckCircle className="text-[#38B2AC] mr-3" /> Trouvez les hôpitaux.
                            </li>
                            <li className="flex items-center">
                                <AiOutlineCheckCircle className="text-[#38B2AC] mr-3" /> Spécialités médicales.
                            </li>
                            <li className="flex items-center">
                                <AiOutlineCheckCircle className="text-[#38B2AC] mr-3" /> Avis des patients.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturesSection;
