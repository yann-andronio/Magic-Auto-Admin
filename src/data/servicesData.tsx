import { BsStars } from "react-icons/bs";
import { FaBroom, FaCarSide, FaRegCheckCircle, FaShieldAlt } from "react-icons/fa";
import { MdCarRepair, MdCleanHands, MdLocalCarWash, MdLocalParking, MdWaterDrop } from "react-icons/md";

export const servicesData = [
  {
    icon: <MdWaterDrop className="text-indigo-600 w-8 h-8" />,
    title: "Services de Lavage",
    image:"lavage",
    description: "Offrez à votre véhicule un nettoyage complet et en profondeur pour un éclat incomparable. Nos forfaits sont conçus pour répondre à tous vos besoins.",
    prices: [
      { label: "Formule Éclat", value: "À partir de 15 000 Ar" },
      { label: "Formule Pro", value: "À partir de 25 000 Ar" },
    ],
    gradient: "from-blue-700 to-indigo-900",
    details: [
      { label: "Lavage intérieur & extérieur", icon: <FaCarSide className="text-white" /> },
      { label: "Graffitage et dégraissage moteur", icon: <MdCleanHands className="text-white" /> },
      { label: "Nettoyage du châssis", icon: <MdCarRepair className="text-white" /> },
      { label: "Produits de qualité supérieure", icon: <MdLocalCarWash className="text-white" />,
      },
    ],
  },
  {
    icon: <MdLocalParking className="text-yellow-500 w-8 h-8" />,
    title: "Parking Sécurisé",
     image:"parking",
    description: "Profitez de notre stationnement sécurisé et flexible. Réservez votre place en toute simplicité pour une tranquillité d'esprit garantie avec sécurité garentie.",
    prices: [
      { label: "Réservation à la journée", value: "3 000 Ar/jour" },
      { label: "Abonnement mensuel", value: "À partir de 60 000 Ar" },
    ],
    gradient: "bg-yellow-700",
    details: [
      { label: "Sécurité 24h/24", icon: <FaShieldAlt className="text-white" /> },
      { label: "Accès facile et sécurisé", icon: <FaRegCheckCircle className="text-white" /> },
      { label: "Espaces couverts et surveillés", icon: <FaCarSide className="text-white" /> },
      { label: "Paiement à l'heure sur place", icon: <BsStars className="text-white" /> },
    ],
  },
];