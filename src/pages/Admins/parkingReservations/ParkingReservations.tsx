import React, { useState, useMemo } from "react";
import useMultiModals from "../../../hooks/useMultiModals";
import { RootState } from "../../../stores/Store";
import { useSelector } from "react-redux";
import Searchbar from "../../../components/admin/searchbar/Searchbar";
import { FaPhone, FaPlus } from "react-icons/fa";
import DetailuserParkingreseModal from "../../../components/admin/Modals/DetailuserParkingreseModal"; // Nouvelle modale pour lister les réservations d'un client

// Modèle de données de réservation
type Reservation = {
  name: string;
  email: string;
  phone: string;
  address: string;
  lieuDeParking: string;
  typevehicule: "Voiture" | "Moto" | "Vélo";
  modelvoiture: string;
  matriculationvehicule: string;
  startDate: string;
  endDate: string;
  time: string;
  notes: string;
};

// Données statiques qui simulent une réponse du backend
const reservationsData: Reservation[] = [
  {
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    phone: "032 12 345 67",
    address: "123 Rue de la Liberté",
    lieuDeParking: "Ambohipo",
    typevehicule: "Voiture",
    modelvoiture: "Renault Clio",
    matriculationvehicule: "1234 CD 56",
    startDate: "2025-09-17T08:00:00Z",
    endDate: "2025-09-18T18:00:00Z",
    time: "08:00",
    notes: "Prise en charge anticipée si possible.",
  },
  {
    name: "Marie Lebrun",
    email: "marie.lebrun@email.com",
    phone: "034 98 765 43",
    address: "456 Avenue de la Paix",
    lieuDeParking: "Analamahitsy",
    typevehicule: "Moto",
    modelvoiture: "Yamaha MT-07",
    matriculationvehicule: "7890 EF 12",
    startDate: "2025-09-20T10:00:00Z",
    endDate: "2025-09-21T12:00:00Z",
    time: "10:00",
    notes: "",
  },
  {
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    phone: "032 12 345 67",
    address: "123 Rue de la Liberté",
    lieuDeParking: "Analakely",
    typevehicule: "Vélo",
    modelvoiture: "VTT",
    matriculationvehicule: "N/A",
    startDate: "2025-09-19T14:00:00Z",
    endDate: "2025-09-19T16:00:00Z",
    time: "14:00",
    notes: "Place sécurisée demandée.",
  },
  {
    name: "Sophie Dubois",
    email: "sophie.dubois@email.com",
    phone: "032 54 321 09",
    address: "321 Rue de la Fontaine",
    lieuDeParking: "Ambohipo",
    typevehicule: "Voiture",
    modelvoiture: "Tesla Model 3",
    matriculationvehicule: "4567 GH 89",
    startDate: "2025-09-22T09:00:00Z",
    endDate: "2025-09-25T17:00:00Z",
    time: "09:00",
    notes: "",
  },
];

export default function ParkingReservations() {
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar);
  const { modal, openModal, closModal } = useMultiModals();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClientReservations, setSelectedClientReservations] = useState<
    Reservation[] | null
  >(null);

  const groupedReservations = useMemo(() => {
    const groups: { [email: string]: Reservation[] } = {};
    reservationsData.forEach((res) => {
      if (!groups[res.email]) {
        groups[res.email] = [];
      }
      groups[res.email].push(res);
    });
    return groups;
  }, []);

  const clients = useMemo(
    () => Object.values(groupedReservations),
    [groupedReservations]
  );

  const handleSearchChange = (searchString: string) => {
    setSearchTerm(searchString);
  };

  const openUserReservationsListModal = (reservations: Reservation[]) => {
    setSelectedClientReservations(reservations);
    openModal("DetailuserParkingreseModal");
  };

  const filteredClients = clients.filter(
    (clientReservations) =>
      clientReservations[0].name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      clientReservations[0].email
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-3xl font-extrabold text-[#33476c] mb-4 md:mb-0">
            Réservations de Parking
          </h1>
        </div>

        <div className="flex justify-end md:justify-start gap-4 mb-6">
          <Searchbar onSearch={handleSearchChange} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="border-b border-gray-200 text-sm font-semibold uppercase text-gray-500 tracking-wider">
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4 hidden md:table-cell">Contact</th>
                <th className="py-3 px-4 text-center">Réservations</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length > 0 ? (
                filteredClients.map((clientReservations, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <p className="font-semibold text-[#4c5a72]">
                        {clientReservations[0].name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {clientReservations[0].email}
                      </p>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <FaPhone className="text-gray-400 text-sm" />
                        <span className="text-sm font-medium text-gray-700">
                          {clientReservations[0].phone}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() =>
                          openUserReservationsListModal(clientReservations)
                        }
                        className="text-[#759eee] hover:text-[#33476c] transition-colors text-sm font-semibold"
                      >
                        Voir {clientReservations.length} réservation(s)
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-8 text-gray-500">
                    Aucun client trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {modal.DetailuserParkingreseModal && selectedClientReservations && (
        <DetailuserParkingreseModal
          reservations={selectedClientReservations}
          closeModal={() => closModal("DetailuserParkingreseModal")}
        />
      )}
    </div>
  );
}
