import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/Store";
import { FaCar, FaMotorcycle, FaTruck, FaPlus } from "react-icons/fa";
import { MdOutlineAccessTime, MdOutlineLocalParking } from "react-icons/md";
import useMultiModals from "../../../hooks/useMultiModals";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import ParkingEndModal from "../../../components/admin/Modals/ParkingEndModal";
import useGestionParking from "../../../hooks/useGestionParking"; 


interface SessionParking {
  id: number;
  nomClient: string;
  numeroPlaque: string;
  typeVehicule: string;
  heureDebut: string;
  idPlace: number;
}

const getIconeVehicule = (type: string) => {
  switch (type) {
    case "Voiture":
      return <FaCar className="text-[#fdb73d]" />;
    case "Moto":
      return <FaMotorcycle className="text-[#fdb73d]" />;
    case "Camion":
      return <FaTruck className="text-[#fdb73d]" />;
    default:
      return <FaCar className="text-[#fdb73d]" />;
  }
};

export default function ParkingRealTime() {
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar);
  const { modal, openModal, closModal } = useMultiModals();
  const {
    placesParking,
    nouvelVehicule,
    setNouvelVehicule,
    sessionACloturer,
    setSessionACloturer,
    gererDebutParking,
    confirmerFinSession,
    calculerDuree,
    calculerCout,
    typesVehicules,
  } = useGestionParking();


  const ouvrirModaleFin = (session: SessionParking) => {
    setSessionACloturer(session);
    openModal("ParkingEndModal");
  };

  const gererConfirmationFin = () => {
    confirmerFinSession();
    closModal("ParkingEndModal");
  };

  return (
    <div
      className={`Rigth bg-[#E6E6FA] w-full ${
        closeBar ? '"ml-16"' : ""
      } transition-all duration-[600ms] ease-in-out ${
        Object.values(modal).some((isOpen) => isOpen) ? "overflow-hidden" : ""
      }`}
    >
      <div className="px-20 py-8">
        <h1 className="text-3xl font-extrabold text-[#4c5a72] mb-6">
          Parking en temps réel
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-xl rounded-2xl p-6 md:col-span-1">
            <h2 className="text-xl font-bold text-[#1c273a] mb-4">
              Enregistrer un nouveau véhicule
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom du client
                </label>
                <input
                  type="text"
                  placeholder="Ex: Jean Dupont"
                  value={nouvelVehicule.nomClient}
                  onChange={(e) =>
                    setNouvelVehicule({
                      ...nouvelVehicule,
                      nomClient: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Numéro de plaque
                </label>
                <input
                  type="text"
                  placeholder="Ex: AB-123-CD"
                  value={nouvelVehicule.numeroPlaque}
                  onChange={(e) =>
                    setNouvelVehicule({
                      ...nouvelVehicule,
                      numeroPlaque: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type de véhicule
                </label>
                <select
                  value={nouvelVehicule.typeVehicule}
                  onChange={(e) =>
                    setNouvelVehicule({
                      ...nouvelVehicule,
                      typeVehicule: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                >
                  {typesVehicules.map((type) => (
                    <option key={type.nom} value={type.nom}>
                      {type.nom}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Place de parking
                </label>
                <select
                  value={nouvelVehicule.idPlace}
                  onChange={(e) =>
                    setNouvelVehicule({
                      ...nouvelVehicule,
                      idPlace: parseInt(e.target.value),
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                >
                  <option value={0}>Sélectionner une place libre</option>
                  {placesParking
                    .filter((place) => !place.estOccupee)
                    .map((place) => (
                      <option key={place.id} value={place.id}>
                        Place {place.id}
                      </option>
                    ))}
                </select>
              </div>
              <button
                onClick={gererDebutParking}
                disabled={
                  !nouvelVehicule.nomClient ||
                  !nouvelVehicule.numeroPlaque ||
                  nouvelVehicule.idPlace === 0
                }
                className="w-full py-3 mt-4 rounded-xl shadow-md font-semibold text-white bg-[#fdb73d] hover:bg-[#e0a233] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPlus className="inline-block mr-2" />
                Démarrer la session
              </button>
            </div>
          </div>
          <div className="bg-white shadow-xl rounded-2xl p-6 md:col-span-2">
            <h2 className="text-xl font-bold text-[#1c273a] mb-4">
              Aperçu des places de parking
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {placesParking.map((place) => (
                <div
                  key={place.id}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg text-white shadow-sm transition-all duration-300 transform hover:scale-105 ${
                    place.estOccupee ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  <MdOutlineLocalParking size={28} className="mb-2" />
                  <span className="font-bold text-lg">Place {place.id}</span>
                  <span className="text-sm">
                    {place.estOccupee ? "Occupée" : "Libre"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-6 mt-6">
          <h2 className="text-xl font-bold text-[#1c273a] mb-4">
            Véhicules en cours de stationnement
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Place
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plaque
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Heure d'arrivée
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durée
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Coût estimé (Ar)
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {placesParking.filter((place) => place.estOccupee).length >
                0 ? (
                  placesParking
                    .filter((place) => place.estOccupee)
                    .map((place) => (
                      <tr key={place.occupant.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {place.occupant.idPlace}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {place.occupant.nomClient}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {place.occupant.numeroPlaque}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            {getIconeVehicule(place.occupant.typeVehicule)}
                            {place.occupant.typeVehicule}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(new Date(place.occupant.heureDebut), "p", {
                            locale: fr,
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <MdOutlineAccessTime className="mr-1 text-gray-400" />
                            {calculerDuree(place.occupant.heureDebut)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold">
                          {calculerCout(
                            place.occupant.heureDebut,
                            place.occupant.typeVehicule
                          )}{" "}
                          Ar
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => ouvrirModaleFin(place.occupant)}
                            className="text-red-600 hover:text-red-900 transition-colors duration-200 font-semibold"
                          >
                            Fin de session
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">
                      Aucun véhicule en stationnement pour le moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {modal.ParkingEndModal && sessionACloturer && (
        <ParkingEndModal
          closemodal={() => closModal("ParkingEndModal")}
          confirmEnd={gererConfirmationFin}
          sessionDetails={{
            clientName: sessionACloturer.nomClient,
            plateNumber: sessionACloturer.numeroPlaque,
            vehicleType: sessionACloturer.typeVehicule,
            startTime: new Date(sessionACloturer.heureDebut),
            duration: calculerDuree(sessionACloturer.heureDebut),
            totalCost: calculerCout(
              sessionACloturer.heureDebut,
              sessionACloturer.typeVehicule
            ),
          }}
        />
      )}
    </div>
  );
}
