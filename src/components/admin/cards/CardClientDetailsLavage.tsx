import React from "react";
import { FaCar, FaMotorcycle, FaTruck } from "react-icons/fa";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type clientLavageDetailsProps = {
  clientLavage: any;
};


const getIconeVehicule = (type: string) => {
  switch (type) {
    case "Voiture":
      return <FaCar className="text-[#8787a7]" />;
    case "Moto":
      return <FaMotorcycle className="text-[#8787a7]" />;
    case "Camionnette":
    case "Camion":
      return <FaTruck className="text-[#8787a7]" />;
    default:
      return <FaCar className="text-[#8787a7]" />;
  }
};

export default function CardclientLavageDetailsLavage({
  clientLavage,
}: clientLavageDetailsProps) {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 h-full flex flex-col">
      <div className="mb-6 border-b pb-4 border-gray-100">
        <h2 className="text-2xl font-bold text-[#4c5a72] mb-1">
          {clientLavage.nomClient}
        </h2>
        <p className="text-sm text-gray-500">
          Téléphone :{" "}
          <span className="font-semibold text-[#895256]">
            {clientLavage.telephone}
          </span>
        </p>
        <p className="mt-2 text-base font-semibold text-gray-700">
          Total de lavages :{" "}
          <span className="font-bold text-[#1c273a]">
            {clientLavage.vehicules.reduce(
              (total: number, v: any) => total + v.totalLavages,
              0
            )}
          </span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6">
        {clientLavage.vehicules.map((vehicule: any, idx: number) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base font-bold text-gray-800">
                {vehicule.plaque}
              </span>
              <div className="text-lg text-gray-600">
                {getIconeVehicule(vehicule.typeVehicule)}
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Type : {vehicule.typeVehicule} —{" "}
              <span className="font-semibold text-gray-700">
                {vehicule.totalLavages} lavages
              </span>
            </p>

            <div className="space-y-2 mt-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">
                Historique :
              </h4>
              {vehicule.lavages.map((lavage: any, lavageIdx: number) => (
                <div
                  key={lavageIdx}
                  className="flex justify-between items-center py-2 px-3 bg-white rounded-md shadow-sm border border-gray-100"
                >
                  <span className="text-sm text-gray-700">
                    {lavage.typeLavage}
                  </span>
                  <span className="text-xs text-gray-500">
                    {format(new Date(lavage.dateEnregistrement), "dd/MM/yyyy", {
                      locale: fr,
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
