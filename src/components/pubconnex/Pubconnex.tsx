import { Fragment } from "react/jsx-runtime";
import { motion } from "framer-motion"; // Assurez-vous d'installer framer-motion
import { Link } from "react-router-dom"; // Assurez-vous que React Router est installé
import s from "./pubconnex.module.css"; // N'oubliez pas d'utiliser ce fichier CSS si nécessaire

const Pubconnex: React.FC = () => {
    return (
        <Fragment>
            {/* Section d'appel à l'action */}
            <div className={`${s.ctaSection} bg-[#22C55E] py-16 mt-12 text-center text-white rounded-lg shadow-lg`}>
                <div className="container mx-auto">
                    {/* Section titre avec animation */}
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl font-extrabold mb-6"
                    >
                        Prêt à améliorer votre gestion des soins de santé ?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-lg mb-8 max-w-2xl mx-auto"
                    >
                        Inscrivez-vous aujourd'hui et bénéficiez de toutes nos fonctionnalités innovantes pour une gestion simplifiée et efficace.
                    </motion.p>

                    {/* Boutons d'action avec effets */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.2 }}
                        className="flex justify-center space-x-4"
                    >
                        <Link
                            to="/signup"
                            className="bg-white text-[#22C55E] py-4 px-10 rounded-full text-lg font-semibold shadow transition-transform transform hover:scale-105 duration-300"
                        >
                            Inscription Gratuite
                        </Link>
                        <Link
                            to="/learn-more"
                            className="bg-transparent border border-white py-4 px-10 rounded-full text-lg font-semibold shadow transition-transform transform hover:scale-105 duration-300 hover:bg-white hover:text-[#22C55E]"
                        >
                            En Savoir Plus
                        </Link>
                    </motion.div>
                </div>
            </div>
        </Fragment>
    );
};

export default Pubconnex;
