import { Fragment, useState } from "react";
import { FaHome } from "react-icons/fa";
import s from "./teste.module.css";
import Questiontest from "../../components/Questiontest/Questiontest";
import { useNavigate } from "react-router-dom";
import Resultattest from "../../components/resultattest/Resultatest";
import { RiseLoader } from 'react-spinners';

const Testes: React.FC = () => {
    const [showResults, setShowResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate("/");
    };

    const handleFinish = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setShowResults(true);
        }, 3000);
    };

    return (
        <Fragment>
            <div className="bg-[#f5f5f5] relative h-screen flex flex-col items-center justify-center p-2 lg:p-8 md:p-8 overflow-hidden">
                {/* Décorations côté gauche */}
                <div className={`${s.pillule1} hidden lg:block md:block`}>
                    <img src="./assets/image/medicaments/15.png" alt="Médicament 1" />
                </div>
                <div className={`${s.pillule2} hidden lg:block`}>
                    <img src="./assets/image/medicaments/7.png" alt="Médicament 2" />
                </div>
                <div className={`${s.pillule3} hidden lg:block`}>
                    <img src="./assets/image/medicaments/2.png" alt="Médicament 3" />
                </div>
                <div className={`${s.pillule4} hidden lg:block`}>
                    <img src="./assets/image/medicaments/5.png" alt="Médicament 4" />
                </div>

                {/* Décorations côté droit */}
                <div className={`${s.pillule5} hidden lg:block md:block`}>
                    <img src="./assets/image/medicaments/5.png" alt="Médicament 4" />
                </div>
                <div className={`${s.pillule6} hidden lg:block`}>
                    <img src="./assets/image/medicaments/12.png" alt="Médicament 5" />
                </div>
                <div className={`${s.pillule7} hidden lg:block`}>
                    <img src="./assets/image/medicaments/6.png" alt="Médicament 6" />
                </div>
                <div className={`${s.pillule8} hidden lg:block`}>
                    <img src="./assets/image/medicaments/13.png" alt="Médicament 7" />
                </div>

                {/* titre kely */}

                {!showResults ? (
                    <div className="text-center mb-8">
                        <h1
                            className="text-4xl hidden lg:block md:block flex-none font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#34D399] to-[#22C55E] mb-4 drop-shadow-lg"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Un Soin pour Chacun, Une Santé pour Tous
                        </h1>

                        <p
                            className="text-lg lg:text-xl text-gray-600 mb-2 hidden lg:block"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Répondez à quelques questions pour un diagnostic rapide et adapté à vos besoins, où que vous soyez.
                        </p>
                        <p
                            className="text-sm lg:text-base text-gray-700 hidden lg:block"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Prenez soin de vous en consultant un professionnel si nécessaire.
                        </p>
                    </div>
                ) : (
                    <div className="text-center   mb-6 ">
                        <h1 className="text-3xl font-bold text-[#22C55E]  drop-shadow-md mb-2">
                            Résultats de votre évaluation de symptômes
                        </h1>
                        <p
                            className="text-lg lg:text-xl text-gray-600 mb-2 hidden lg:block"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Votre santé, notre priorité.
                        </p>
                    </div>

                )}

                {/* Bouton de retour  */}
                <button
                    onClick={handleHomeClick}
                    className="z-50 absolute top-2 left-2 flex items-center justify-center bg-[#ffbb33] text-white py-3 px-6 rounded-full hover:bg-[#ff8c00] focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 shadow-md"
                >
                    <FaHome className="mr-2" />
                    Accueil
                </button>

                {/* Composant de questions */}

                {!showResults ? (
                    isLoading ? (
                        <div className={`${s.chargement} flex justify-center m-36 items-center`}>
                        <RiseLoader color="#22C55E" size={35} />
                        </div>
                    ) : (
                        <div className="lg:bg-white md:bg-white z-40 lg:shadow-lg md:shadow-lg rounded-lg lg:p-8  md:p-8 w-full max-w-2xl">
                            <Questiontest onFinish={handleFinish} />
                        </div>
                    )
                ) : (
                    <div className="lg:bg-white md:bg-white z-40 lg:shadow-lg md:shadow-lg rounded-lg lg:p-8  md:p-8 w-full max-w-2xl">
                        <Resultattest />
                    </div>
                )}


                {/* Décorations blob */}
                <img className={`${s.deco} hidden lg:block md:block z-0`} src="./assets/image/deco/15.png" alt="15" width={250} />
                <img className={`${s.deco2} hidden lg:block md:block z-0`} src="./assets/image/deco/14.png" width={275} alt="14" />
                <img className={`${s.deco3} hidden lg:block md:block z-0`} src="./assets/image/deco/10.png" width={225} alt="" />
                <img className={`${s.deco4} hidden lg:block md:block z-0`} src="./assets/image/deco/11.png" width={500} alt="11" />
            </div>

        </Fragment>
    );
};

export default Testes;
