import React, { Fragment } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaClipboardList, FaUtensils } from "react-icons/fa";
import { motion } from "framer-motion";

const Resultattest: React.FC = () => {
    // Valeurs manuelles pour les résultats
    const result = "Vous avez une légère infection virale.";
    const treatment = "Reposez-vous et buvez beaucoup de liquides.";
    const medication = "Paracétamol 500 mg, 3 fois par jour.";
    const forbiddenFoods = "Évitez les aliments gras et épicés.";

    // Variants d'animation pour Framer Motion
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeInOut" }
        }
    };

    return (
        <Fragment>
            <div className="w-full py-4 px-4 lg:px-8 md:px-8 flex flex-col">
                <h1 className="text-xl font-bold text-center text-[#22C55E] mb-4">
                    Résultat de votre test
                </h1>

                {/* Section pour le résultat */}
                <motion.div 
                    className="mb-3 text-center border border-[#22C55E] p-3 rounded-lg bg-[#F0FFF4] shadow-sm"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <FaCheckCircle className="text-3xl text-[#22C55E] mx-auto mb-1" />
                    <h2 className="text-md font-semibold">{result}</h2>
                </motion.div>

                {/* Section pour le traitement */}
                <motion.div 
                    className="mb-3 text-center border border-orange-500 p-3 rounded-lg bg-[#FFFAF0] shadow-sm"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }} // Retard pour apparaitre après la première section
                >
                    <FaExclamationTriangle className="text-3xl text-orange-500 mx-auto mb-1" />
                    <h3 className="text-md font-semibold">Traitement recommandé</h3>
                    <p className="text-gray-600">{treatment}</p>
                </motion.div>

                {/* Section pour les médicaments */}
                <motion.div 
                    className="mb-3 text-center border border-blue-500 p-3 rounded-lg bg-[#F0F4FF] shadow-sm"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4 }} // Retard plus important pour un effet séquentiel
                >
                    <h3 className="text-md font-semibold">Médicaments à prendre</h3>
                    <p className="text-gray-600">{medication}</p>
                </motion.div>

                {/* Section pour les aliments interdits */}
                <motion.div 
                    className="mb-3 text-center border border-red-500 p-3 rounded-lg bg-[#FFF0F0] shadow-sm"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.6 }} // Retard pour apparaitre après les autres
                >
                    <FaUtensils className="text-3xl text-red-500 mx-auto mb-1" />
                    <h3 className="text-md font-semibold">Aliments interdits</h3>
                    <p className="text-gray-600">{forbiddenFoods}</p>
                </motion.div>
            </div>
        </Fragment>
    );
};

export default Resultattest;
