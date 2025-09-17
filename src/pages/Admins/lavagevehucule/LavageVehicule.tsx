import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/Store";
import useMultiModals from "../../../hooks/useMultiModals";
import AddLavageModals from "../../../components/admin/Modals/AddLavageModals";
import Searchbar from "../../../components/admin/searchbar/Searchbar";
import {
  FaPlus,
  FaCar,
  FaMotorcycle,
  FaTruck,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import CardClientDetailsLavage from "../../../components/admin/cards/CardClientDetailsLavage";

// Données statiques pour simuler le backend
const lavageData = [
  {
    nomClient: "Jean Dupont",
    telephone: "032 12 345 67",
    vehicules: [
      {
        plaque: "1234 AB 56",
        typeVehicule: "Voiture",
        totalLavages: 3,
        lavages: [
          {
            typeLavage: "Lavage complet",
            dateEnregistrement: "2025-09-15T10:00:00Z",
          },
          {
            typeLavage: "Lavage Express",
            dateEnregistrement: "2025-08-20T14:30:00Z",
          },
          {
            typeLavage: "Lavage complet",
            dateEnregistrement: "2025-07-10T09:15:00Z",
          },
        ],
      },
      {
        plaque: "7890 CD 12",
        typeVehicule: "Moto",
        totalLavages: 1,
        lavages: [
          {
            typeLavage: "Lavage Express",
            dateEnregistrement: "2025-09-01T11:00:00Z",
          },
        ],
      },
    ],
  },
  {
    nomClient: "Marie Lebrun",
    telephone: "034 98 765 43",
    vehicules: [
      {
        plaque: "1111 EF 22",
        typeVehicule: "Camionnette",
        totalLavages: 1,
        lavages: [
          {
            typeLavage: "Graffitage et dégraissage moteur",
            dateEnregistrement: "2025-09-12T16:45:00Z",
          },
        ],
      },
    ],
  },
  {
    nomClient: "Pierre Martin",
    telephone: "033 45 678 90",
    vehicules: [
      {
        plaque: "5555 GH 33",
        typeVehicule: "Voiture",
        totalLavages: 2,
        lavages: [
          {
            typeLavage: "Lavage Premium",
            dateEnregistrement: "2025-09-16T08:00:00Z",
          },
          {
            typeLavage: "Lavage Express",
            dateEnregistrement: "2025-09-05T12:00:00Z",
          },
        ],
      },
    ],
  },
];

// Helper pour afficher l'icône du véhicule
const getIconeVehicule = (type: string) => {
  switch (type) {
    case "Voiture":
      return <FaCar className="text-gray-500" />;
    case "Moto":
      return <FaMotorcycle className="text-gray-500" />;
    case "Camionnette":
    case "Camion":
      return <FaTruck className="text-gray-500" />;
    default:
      return <FaCar className="text-gray-500" />;
  }
};

export default function LavageVehicule() {
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar);
  const { modal, openModal, closModal } = useMultiModals();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<any | null>(null);

  // Filtrer les données en fonction du terme de recherche
  const filteredData = lavageData.filter(
    (client) =>
      client.nomClient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.telephone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.vehicules.some((v) =>
        v.plaque.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Effet pour présélectionner le premier client au chargement ou à la mise à jour
  useEffect(() => {
    if (filteredData.length > 0 && !selectedClient) {
      setSelectedClient(filteredData[0]);
    } else if (filteredData.length === 0) {
      setSelectedClient(null);
    }
  }, [filteredData, selectedClient]);

  const handleSearchChange = (searchString: string) => {
    setSearchTerm(searchString);
  };

  const handleCardClick = (client: any) => {
    setSelectedClient(client);
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
        {/* En-tête de la page */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-extrabold text-[#4c5a72] mb-4 md:mb-0">
            Historique des Lavages
          </h1>
          <button
            onClick={() => openModal("AddLavageModals")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#fdb73d] text-white font-semibold shadow-lg hover:bg-[#e0a233] transition-colors duration-200"
          >
            <FaPlus />
            Nouveau Lavage
          </button>
        </div>

        {/* Espace de recherche et compteur */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <Searchbar onSearch={handleSearchChange} />
          <div className="mt-4 md:mt-0 bg-white text-gray-700 shadow-md px-4 py-2 rounded-lg text-sm font-medium">
            Total clients:{" "}
            <span className="font-bold">{filteredData.length}</span>
          </div>
        </div>

        {/* Contenu principal: Grille de cartes + Détails */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Grille de cartes des clients */}
          <div className="flex-1 max-h-[600px] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.length > 0 ? (
                filteredData.map((client, index) => (
                  <div
                    key={client.nomClient}
                    onClick={() => handleCardClick(client)}
                    className={`bg-white rounded-xl p-6 shadow-md cursor-pointer transition-transform duration-200 transform hover:scale-[1.02]
                      ${
                        selectedClient?.nomClient === client.nomClient
                          ? ""
                          : "hover:shadow-lg"
                      }`}
                  >
                    <h3 className="text-lg font-bold text-[#4c5a72] mb-2">
                      <FaUser className="inline mr-2 text-gray-600" />
                      {client.nomClient}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      <FaPhone className="inline mr-2" />
                      {client.telephone}
                    </p>

                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">
                        Véhicules
                      </h4>
                      <div className="space-y-2">
                        {client.vehicules.map(
                          (vehicule: any, vehiculeIndex: number) => (
                            <div
                              key={vehiculeIndex}
                              className="flex items-center gap-2 text-sm"
                            >
                              {getIconeVehicule(vehicule.typeVehicule)}
                              <span className="font-semibold text-gray-700">
                                {vehicule.plaque}
                              </span>
                              <span className="text-xs text-gray-500">
                                ({vehicule.totalLavages} lavages)
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  Aucun client ne correspond à cette recherche.
                </div>
              )}
            </div>
          </div>

          {/* Panneau de détails */}
          <div className="w-full lg:w-[35%]">
            {selectedClient ? (
              <CardClientDetailsLavage clientLavage={selectedClient} />
            ) : (
              <div className="bg-white shadow-xl rounded-2xl p-6 h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                  Sélectionnez un client pour voir les détails.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {modal.AddLavageModals && (
        <AddLavageModals closemodal={() => closModal("AddLavageModals")} />
      )}
    </div>
  );
}
