import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/Store";
import Searchbar from "../../../components/admin/searchbar/Searchbar";
import { FaPhone, FaInfoCircle } from "react-icons/fa";
import { ReservationContext } from "../../../context/ReservationContext";
import useMultiModals from "../../../hooks/useMultiModals";
import DetailuserParkingreseModal from "../../../components/admin/Modals/DetailuserParkingreseModal";

export default function ParkingReservations() {
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar);
  const [searchTerm, setSearchTerm] = useState("");
  const { reservations, loading, error, fetchReservations } =
    useContext(ReservationContext);
  const { modal, openModal, closModal } = useMultiModals();
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const handleSearchChange = (searchString: string) => {
    setSearchTerm(searchString);
  };

  const handleOpenDetailsModal = (reservation:any) => {
    setSelectedReservation(reservation);
    openModal("detailsModal");
  };

  const filteredReservations = reservations.filter(
    (reservation) =>
      reservation.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.lieuDeParking.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-[#33476c] text-xl font-bold">
        Chargement des réservations...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-xl font-bold">
        Erreur : {error}
      </div>
    );
  }

  return (
    <div
      className={`Rigth bg-[#E6E6FA] w-full ${
        closeBar ? '"ml-16"' : ""
      } transition-all duration-[600ms] ease-in-out`}
    >
      <div className="px-20 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-extrabold text-[#33476c] mb-4 md:mb-0">
            Toutes les Réservations
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
                <th className="py-3 px-4 hidden md:table-cell">Lieu</th>
                <th className="py-3 px-4 hidden lg:table-cell">Véhicule</th>
                <th className="py-3 px-4">Période</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.length > 0 ? (
                filteredReservations.map((reservation) => (
                  <tr
                    key={reservation.id}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <p className="font-semibold text-[#4c5a72]">
                        {reservation.fullname}
                      </p>
                      <p className="text-xs text-gray-400">
                        {reservation.email}
                      </p>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <FaPhone className="text-gray-400 text-sm" />
                        <span className="text-sm font-medium text-gray-700">
                          {reservation.phone}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <span className="text-sm font-medium text-gray-700">
                        {reservation.lieuDeParking}
                      </span>
                    </td>
                    <td className="py-4 px-4 hidden lg:table-cell">
                      <span className="text-sm font-medium text-gray-700">
                        {reservation.modelvoiture}
                      </span>
                      <p className="text-xs text-gray-400">
                        {reservation.matriculationvehicule}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm font-medium text-gray-700">
                        Du:{" "}
                        {new Date(reservation.startDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm font-medium text-gray-700">
                        Au: {new Date(reservation.endDate).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleOpenDetailsModal(reservation)}
                        className="text-[#759eee] hover:text-[#33476c] transition-colors flex items-center gap-2"
                      >
                        <FaInfoCircle /> Détails
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    Aucune réservation trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Affichage conditionnel de la modale */}
      {modal.detailsModal && selectedReservation && (
        <DetailuserParkingreseModal
          reservations={[selectedReservation]}
          closeModal={() => closModal("detailsModal")}
        />
      )}
    </div>
  );
}
