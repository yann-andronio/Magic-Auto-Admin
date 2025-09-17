import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { FaCar, FaMotorcycle, FaTruck } from "react-icons/fa";

import { IoClose } from "react-icons/io5";

interface ParkingEndModalProps {
  closemodal: () => void;
  confirmEnd: () => void;
  sessionDetails: {
    clientName: string;
    plateNumber: string;
    vehicleType: string;
    startTime: Date;
    duration: string;
    totalCost: string;
  };
}

const getVehicleIcon = (type: string) => {
  switch (type) {
    case "Voiture":
      return <FaCar className="text-blue-500" />;
    case "Moto":
      return <FaMotorcycle className="text-gray-500" />;
    case "Camion":
      return <FaTruck className="text-red-500" />;
    default:
      return <FaCar className="text-blue-500" />;
  }
};

export default function ParkingEndModal({
  closemodal,
  confirmEnd,
  sessionDetails,
}: ParkingEndModalProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-75 flex justify-center items-center p-4">
      <div className="relative bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl transform transition-all duration-300 scale-95 md:scale-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#1c273a]">
            Fin de session de parking
          </h2>
          <button
            onClick={closemodal}
            className="text-gray-400 hover:text-gray-600"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4 text-gray-700 mb-6">
          <p className="flex items-center gap-3">
            <span className="font-semibold text-[#4c5a72]">Client :</span>
            <span>{sessionDetails.clientName}</span>
          </p>
          <p className="flex items-center gap-3">
            <span className="font-semibold text-[#4c5a72]">Plaque :</span>
            <span>{sessionDetails.plateNumber}</span>
          </p>
          <p className="flex items-center gap-3">
            <span className="font-semibold text-[#4c5a72]">Véhicule :</span>
            <span className="flex items-center gap-2">
              {getVehicleIcon(sessionDetails.vehicleType)}
              {sessionDetails.vehicleType}
            </span>
          </p>
          <p className="flex items-center gap-3">
            <span className="font-semibold text-[#4c5a72]">
              Heure d'entrée :
            </span>
            <span>{format(sessionDetails.startTime, "p", { locale: fr })}</span>
          </p>
          <p className="flex items-center gap-3">
            <span className="font-semibold text-[#4c5a72]">Durée totale :</span>
            <span>{sessionDetails.duration}</span>
          </p>
          <div className="text-3xl font-bold text-center mt-6 p-4 bg-gray-100 rounded-lg">
            <span className="text-lg font-semibold text-gray-500">
              Montant dû :
            </span>{" "}
            <span className="text-[#fdb73d]">
              {sessionDetails.totalCost} Ar
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={confirmEnd}
            className="flex-1 py-3 rounded-xl shadow-md font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
          >
            Confirmer la fin
          </button>
          <button
            onClick={closemodal}
            className="flex-1 py-3 rounded-xl shadow-md font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
