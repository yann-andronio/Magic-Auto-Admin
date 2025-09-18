// src/pages/admin/LavageVehicule.tsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/Store";
import useMultiModals from "../../../hooks/useMultiModals";
import AddLavageModals from "../../../components/admin/Modals/AddLavageModals";
import UpdateLavageModals from "../../../components/admin/Modals/UpdateLavageModals"; // Import du nouveau composant
import Searchbar from "../../../components/admin/searchbar/Searchbar";
import {
  FaPlus,
  FaCar,
  FaMotorcycle,
  FaTruck,
  FaPhone,
  FaUser,
  FaEdit, // Ajout de l'icône de modification
} from "react-icons/fa";
import CardClientDetailsLavage from "../../../components/admin/cards/CardClientDetailsLavage";
import { useLavage, LavageData } from "../../../context/LavageContext";

// Interface pour regrouper les données pour l'affichage
interface ClientFormattedData {
  nomClient: string;
  telephone: string;
  vehicules: {
    plaque: string;
    typeVehicule: string;
    totalLavages: number;
    lavages: {
      typeLavage: string;
      dateEnregistrement: string;
    }[];
  }[];
}

// Fonction utilitaire pour regrouper les lavages par client et véhicule
const groupLavagesByClient = (lavages: LavageData[]): ClientFormattedData[] => {
  const clientsMap = new Map<string, ClientFormattedData>();

  lavages.forEach((lavage) => {
    const clientKey = `${lavage.nomClient}-${lavage.telephone}`;
    if (!clientsMap.has(clientKey)) {
      clientsMap.set(clientKey, {
        nomClient: lavage.nomClient,
        telephone: lavage.telephone,
        vehicules: [],
      });
    }
    const client = clientsMap.get(clientKey)!;
    let vehicule = client.vehicules.find((v) => v.plaque === lavage.plaque);
    if (!vehicule) {
      vehicule = {
        plaque: lavage.plaque,
        typeVehicule: lavage.typeVehicule,
        totalLavages: 0,
        lavages: [],
      };
      client.vehicules.push(vehicule);
    }
    vehicule.lavages.push({
      typeLavage: lavage.typeLavage,
      dateEnregistrement: "2025-09-18T10:00:00Z", // Utilise la date si ton API la fournit
    });
    vehicule.totalLavages = vehicule.lavages.length;
  });

  return Array.from(clientsMap.values());
};

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
  const { lavages, fetchLavages, loading, error } = useLavage();
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar);
  const { modal, openModal, closModal } = useMultiModals();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] =
    useState<ClientFormattedData | null>(null);
  const [selectedLavageToUpdate, setSelectedLavageToUpdate] =
    useState<LavageData | null>(null); // Nouvel état pour le lavage à modifier

  useEffect(() => {
    fetchLavages();
  }, [fetchLavages]);

  const groupedData = groupLavagesByClient(lavages);

  const filteredData = groupedData.filter(
    (client) =>
      client.nomClient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.telephone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.vehicules.some((v) =>
        v.plaque.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

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

  const handleCardClick = (client: ClientFormattedData) => {
    setSelectedClient(client);
  };

  const handleUpdateClick = (
    clientName: string,
    vehiculePlaque: string,
    lavageType: string
  ) => {
    // On trouve le lavage d'origine dans le tableau `lavages` en utilisant les données
    // de la carte. Cette approche est moins performante mais évite de modifier la fonction de regroupement.
    const lavageToUpdate = lavages.find(
      (lavage) =>
        lavage.nomClient === clientName &&
        lavage.plaque === vehiculePlaque &&
        lavage.typeLavage === lavageType
    );

    if (lavageToUpdate) {
      setSelectedLavageToUpdate(lavageToUpdate);
      openModal("UpdateLavageModals");
    } else {
      alert("Lavage non trouvé pour la modification.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Chargement des données...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Erreur: {error}
      </div>
    );
  }

  return (
    <div
      className={`Rigth bg-[#E6E6FA] w-full ${
        closeBar ? '"ml-16"' : ""
      } transition-all duration-[600ms] ease-in-out ${
        Object.values(modal).some((isOpen) => isOpen) ? "overflow-hidden" : ""
      }`}
    >
      <div className="px-20 py-8">
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

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <Searchbar onSearch={handleSearchChange} />
          <div className="mt-4 md:mt-0 bg-white text-gray-700 shadow-md px-4 py-2 rounded-lg text-sm font-medium">
            Total clients:{" "}
            <span className="font-bold">{filteredData.length}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 max-h-[600px] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredData.length > 0 ? (
                filteredData.map((client, index) => (
                  <div
                    key={client.nomClient + index}
                    onClick={() => handleCardClick(client)}
                    className={`bg-white rounded-xl p-6 shadow-md cursor-pointer transition-transform duration-200 transform hover:scale-[1.02]
                      ${
                        selectedClient?.nomClient === client.nomClient &&
                        selectedClient?.telephone === client.telephone
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
                        {client.vehicules.map((vehicule) => (
                          <div key={vehicule.plaque}>
                            {vehicule.lavages.map((lavage, lavageIndex) => (
                              <div
                                key={lavageIndex}
                                className="flex items-center justify-between gap-2 text-sm p-2 rounded hover:bg-gray-100 transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  {getIconeVehicule(vehicule.typeVehicule)}
                                  <span className="font-semibold text-gray-700">
                                    {vehicule.plaque}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    - {lavage.typeLavage}
                                  </span>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateClick(
                                      client.nomClient,
                                      vehicule.plaque,
                                      lavage.typeLavage
                                    );
                                  }}
                                  className="text-blue-500 hover:text-blue-700"
                                >
                                  <FaEdit size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        ))}
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
      {modal.UpdateLavageModals && selectedLavageToUpdate && (
        <UpdateLavageModals
          closemodal={() => closModal("UpdateLavageModals")}
          initialData={selectedLavageToUpdate}
        />
      )}
    </div>
  );
}
