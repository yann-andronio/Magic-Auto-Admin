import { Fragment } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { FaHospitalAlt, FaHeartbeat, FaBrain } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Pub2: React.FC = () => {
    return (
        <Fragment>
          <div className="bg-[#F5F5F5] min-h-screen flex flex-col items-center justify-center text-center px-8">
            <h1 className="text-6xl font-bold text-[#22C55E] mb-8" data-aos="fade-up" data-aos-duration="1000">
                Accès universel et <span className="text-[#ffbb33]">équitable aux soins</span>
            </h1>
            <p className="text-lg text-gray-600 mb-12" data-aos="fade-up" data-aos-duration="1200">
                Notre plateforme innovante utilise l'IA pour vous connecter à des soins de santé de qualité, tout en facilitant la gestion des patients pour les professionnels de la santé.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-50 transition-all duration-300 hover:scale-105" data-aos="zoom-in" data-aos-duration="1400">
                    <FaHeartbeat className="text-[#22C55E] text-6xl mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-[#212529] mb-2">IA Diagnostic</h3>
                    <p className="text-gray-600">
                        Notre IA détecte les maladies bénignes et propose des recommandations instantanées.
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-50 transition-all duration-300 hover:scale-105" data-aos="zoom-in" data-aos-duration="1600">
                    <FaHospitalAlt className="text-[#ffbb33] text-6xl mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-[#212529] mb-2">Recommandation d'hôpitaux</h3>
                    <p className="text-gray-600">
                        Trouvez l'hôpital le plus proche en fonction de votre maladie et des spécialités médicales.
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-50 transition-all duration-300 hover:scale-105" data-aos="zoom-in" data-aos-duration="1800">
                    <FaBrain className="text-[#22C55E] text-6xl mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-[#212529] mb-2">Conseils alimentaires</h3>
                    <p className="text-gray-600">
                        L'IA vous guide sur les aliments à éviter en fonction de votre état de santé.
                    </p>
                </div>
            </div>

            <div className="mt-16">
                <Link to="/teste" className="bg-gradient-to-r from-[#22C55E] to-[#ffbb33] text-white py-4 px-12 rounded-full text-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200" data-aos="fade-up" data-aos-duration="2000">
                    Commencer l'évaluation de santé
                </Link>
            </div>
        </div>

            <div className="py-16 text-white text-center px-8 relative">
                <h2 className="text-5xl font-extrabold mb-8 text-[#ffbb33] tracking-wide">
                    Gestion des comptes patients et médecins
                </h2>
                <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
                    Les médecins peuvent gérer efficacement les informations de leurs patients et suivre leur traitement, tandis que les patients accèdent à leur propre ordonnance en toute sécurité.
                </p>

                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/path/to/illustration.svg')] bg-cover bg-center"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto relative z-10">

                    <div className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] p-8 rounded-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
                        <h3 className="text-3xl font-semibold text-white mb-6">Compte médecin</h3>
                        <ul className="space-y-6">
                            <li className="flex items-center text-lg">
                                <CheckCircleIcon className="text-white h-6 w-6 mr-3" />
                                <span className="text-white">Gestion des ordonnances</span>
                            </li>
                            <li className="flex items-center text-lg">
                                <CheckCircleIcon className="text-white h-6 w-6 mr-3" />
                                <span className="text-white">Suivi des diagnostics</span>
                            </li>
                            <li className="flex items-center text-lg">
                                <CheckCircleIcon className="text-white h-6 w-6 mr-3" />
                                <span className="text-white">Consultation de l'IA</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-r from-[#ffbb33] to-[#FF8C00] p-8 rounded-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
                        <h3 className="text-3xl font-semibold text-white mb-6">Compte patient</h3>
                        <ul className="space-y-6">
                            <li className="flex items-center text-lg">
                                <CheckCircleIcon className="text-white h-6 w-6 mr-3" />
                                <span className="text-white">Accès à l'ordonnance</span>
                            </li>
                            <li className="flex items-center text-lg">
                                <CheckCircleIcon className="text-white h-6 w-6 mr-3" />
                                <span className="text-white">Consultation des diagnostics</span>
                            </li>
                            <li className="flex items-center text-lg">
                                <CheckCircleIcon className="text-white h-6 w-6 mr-3" />
                                <span className="text-white">Recommandations diététiques de l'IA</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default Pub2;
