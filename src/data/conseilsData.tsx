import {
  FaCar,
  FaOilCan,
  FaCarBattery,
  FaParking,
  FaTint,
  FaTools,
} from "react-icons/fa";
import { TbWashMachine, TbCarCrash } from "react-icons/tb";
import { MdCleaningServices, MdSecurity } from "react-icons/md";

interface ConseilI {
  titre: string;
  icone: JSX.Element;
  description: string;
  categorie: string;
  suggestion: string;
  color?: string;
}

const conseilsData: ConseilI[] = [
  {
    titre: "Lavez votre voiture régulièrement",
    icone: <TbCarCrash className="text-4xl text-[#759EEE]" />,
    description:
      "Un lavage régulier protège la peinture et l’extérieur de votre véhicule contre la saleté et les agressions extérieures.",
    categorie: "Lavage",
    suggestion:
      "Découvrez nos astuces pour un lavage parfait à la maison ou en station.",
    color: "#759EEE",
  },
  {
    titre: "Vérifiez le niveau d'huile",
    icone: <FaOilCan className="text-4xl text-[#F8C53B]" />,
    description:
      "Un niveau d’huile optimal assure la longévité du moteur et un fonctionnement fluide de votre voiture.",
    categorie: "Entretien",
    suggestion:
      "Consultez notre guide rapide pour vérifier et changer l'huile correctement.",
    color: "#F8C53B",
  },
  {
    titre: "Surveillez la batterie",
    icone: <FaCarBattery className="text-4xl text-[#759EEE]" />,
    description:
      "Une batterie en bon état évite les pannes et assure le démarrage fiable de votre véhicule.",
    categorie: "Sécurité",
    suggestion:
      "Apprenez comment entretenir votre batterie pour éviter les surprises.",
    color: "#759EEE",
  },
  {
    titre: "Stationnez en sécurité",
    icone: <FaParking className="text-4xl text-[#F8C53B]" />,
    description:
      "Choisir un parking sûr et bien éclairé protège votre véhicule contre le vol et les dommages.",
    categorie: "Parking",
    suggestion:
      "Découvrez nos conseils pour trouver le meilleur emplacement pour votre voiture.",
    color: "#F8C53B",
  },
  {
    titre: "Nettoyez les vitres et rétroviseurs",
    icone: <FaTint className="text-4xl text-[#759EEE]" />,
    description:
      "Des vitres propres améliorent la visibilité et la sécurité sur la route, surtout par mauvais temps.",
    categorie: "Lavage",
    suggestion:
      "Nos astuces pour un nettoyage efficace sans traces ni rayures.",
    color: "#759EEE",
  },
  {
    titre: "Entretenez vos pneus",
    icone: <FaTools className="text-4xl text-[#F8C53B]" />,
    description:
      "Vérifiez la pression et l’état des pneus pour garantir sécurité et économie de carburant.",
    categorie: "Entretien",
    suggestion:
      "Apprenez à contrôler la pression et détecter l’usure avant qu’il ne soit trop tard.",
    color: "#F8C53B",
  },
  {
    titre: "Utilisez des produits de qualité",
    icone: <MdCleaningServices className="text-4xl text-[#759EEE]" />,
    description:
      "Les produits de lavage et entretien de qualité préservent la peinture et les éléments de votre voiture.",
    categorie: "Lavage",
    suggestion:
      "Découvrez notre sélection de produits professionnels pour l’entretien auto.",
    color: "#759EEE",
  },
  {
    titre: "Sécurisez vos affaires",
    icone: <MdSecurity className="text-4xl text-[#F8C53B]" />,
    description:
      "Ne laissez jamais d’objets de valeur dans votre voiture, surtout en stationnement public.",
    categorie: "Sécurité",
    suggestion:
      "Consultez nos conseils pour protéger votre véhicule et vos effets personnels.",
    color: "#F8C53B",
  },
  {
    titre: "Lavez aussi l’intérieur",
    icone: <TbWashMachine className="text-4xl text-[#759EEE]" />,
    description:
      "Un habitacle propre améliore le confort, la santé et l’expérience de conduite.",
    categorie: "Lavage",
    suggestion:
      "Découvrez nos techniques rapides pour un intérieur impeccable.",
    color: "#759EEE",
  },
  {
    titre: "Planifiez votre entretien régulier",
    icone: <FaCar className="text-4xl text-[#F8C53B]" />,
    description:
      "Respecter les intervalles d’entretien recommandé assure une longue vie à votre véhicule.",
    categorie: "Entretien",
    suggestion:
      "Téléchargez notre calendrier d’entretien pour ne rien oublier.",
    color: "#F8C53B",
  },
];

export default conseilsData;
