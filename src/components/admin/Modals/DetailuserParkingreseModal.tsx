import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaCar,
  FaStickyNote,
} from "react-icons/fa";

// Typage des props
type Reservation = {
  name: string;
  email: string;
  phone: string;
  address: string;
  lieuDeParking: string;
  typevehicule: string;
  modelvoiture: string;
  matriculationvehicule: string;
  startDate: string;
  endDate: string;
  time: string;
  notes?: string;
};

type DetailuserParkingreseModalProps = {
  reservations: Reservation[]; // tableau
  closeModal: () => void;
};

const DetailuserParkingreseModal: React.FC<DetailuserParkingreseModalProps> = ({
  reservations,
  closeModal,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={closeModal}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto m-4 lg:m-0 relative"
          onClick={(e) => e.stopPropagation()}
        >
       
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <FaTimes size={24} />
          </button>

          <h2 className="text-2xl font-bold text-[#33476c] mb-6">
            Détails des réservations ({reservations.length})
          </h2>

       
          {reservations.map((reservation, index) => (
            <div key={index} className="mb-10 border-b pb-6 last:border-none">
              <p className="text-gray-500 text-sm mb-4 font-semibold">
                Réservation {index + 1} – {reservation.name}
              </p>

          
              <div className="bg-[#f8f9fc] p-6 rounded-xl shadow-lg border-t-4 border-[#759eee] mb-6">
                <h3 className="flex items-center gap-3 text-lg font-semibold text-[#4c5a72] mb-4">
                  <FaUser className="text-[#759eee]" />
                  Informations du client
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-center gap-3">
                    <FaEnvelope className="text-gray-400" />
                    <span className="font-medium">Email:</span>
                    <span className="text-gray-600">{reservation.email}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaPhone className="text-gray-400" />
                    <span className="font-medium">Téléphone:</span>
                    <span className="text-gray-600">{reservation.phone}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-gray-400 mt-1" />
                    <span className="font-medium">Adresse:</span>
                    <p className="text-gray-600 leading-snug">
                      {reservation.address}
                    </p>
                  </li>
                </ul>
              </div>

          
              <div className="bg-[#f8f9fc] p-6 rounded-xl shadow-lg border-t-4 border-[#f8c53b] mb-6">
                <h3 className="flex items-center gap-3 text-lg font-semibold text-[#4c5a72] mb-4">
                  <FaCar className="text-[#f8c53b]" />
                  Détails du véhicule
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li>
                    <span className="font-medium">Type:</span>{" "}
                    {reservation.typevehicule}
                  </li>
                  <li>
                    <span className="font-medium">Modèle:</span>{" "}
                    {reservation.modelvoiture}
                  </li>
                  <li>
                    <span className="font-medium">Plaque:</span>{" "}
                    {reservation.matriculationvehicule}
                  </li>
                </ul>
              </div>

        
              <div className="bg-[#f8f9fc] p-6 rounded-xl shadow-lg border-t-4 border-[#33476c] mb-6">
                <h3 className="flex items-center gap-3 text-lg font-semibold text-[#4c5a72] mb-4">
                  <FaCalendarAlt className="text-[#33476c]" />
                  Informations de la réservation
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li>
                    <span className="font-medium">Lieu:</span>{" "}
                    {reservation.lieuDeParking}
                  </li>
                  <li>
                    <span className="font-medium">Dates:</span> Du{" "}
                    {format(new Date(reservation.startDate), "dd MMMM yyyy", {
                      locale: fr,
                    })}{" "}
                    au{" "}
                    {format(new Date(reservation.endDate), "dd MMMM yyyy", {
                      locale: fr,
                    })}
                  </li>
                  <li>
                    <span className="font-medium">Heure:</span>{" "}
                    {reservation.time}
                  </li>
                </ul>
              </div>

              {reservation.notes && (
                <div className="bg-[#f8f9fc] p-6 rounded-xl shadow-lg border-t-4 border-gray-400">
                  <h3 className="flex items-center gap-3 text-lg font-semibold text-[#4c5a72] mb-4">
                    <FaStickyNote className="text-gray-400" />
                    Notes
                  </h3>
                  <p className="text-sm text-gray-600">{reservation.notes}</p>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DetailuserParkingreseModal;
