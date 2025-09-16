
import { motion } from "framer-motion";
import { FaCar, FaMotorcycle } from "react-icons/fa";
import { parkingData, moisrestentI } from "../../data/moisDeParkingRestentData";
import { getStylerestent } from "../../utils/getStylerestent";


interface ParkingRestantProps {
  lieuDeParking: string | undefined;
}

export default function ParkingRestant({ lieuDeParking }: ParkingRestantProps) {
  const moisData = lieuDeParking ? parkingData[lieuDeParking] : [];

  return (
    <div className="p-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {moisData.length > 0 ? (
          moisData.map((data: moisrestentI, index: number) => {
            const vehiculeStyle = getStylerestent(data.vehiculeLibre);
            const motoStyle = getStylerestent(data.motoLibre);

            return (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.05 * index, duration: 0.4 }}
                className="relative overflow-hidden rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300 bg-white p-4"
              >
                <h5 className="text-md font-bold mb-2 text-[#33476c]">
                  {data.mois}
                </h5>

                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <FaCar className={`text-lg ${vehiculeStyle.color}`} />
                    <span className={`font-semibold ${vehiculeStyle.color}`}>
                      {data.vehiculeLibre} places
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaMotorcycle className={`text-lg ${motoStyle.color}`} />
                    <span className={`font-semibold ${motoStyle.color}`}>
                      {data.motoLibre} places
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            Veuillez choisir un lieu de parking.
          </p>
        )}
      </motion.div>
    </div>
  );
}
