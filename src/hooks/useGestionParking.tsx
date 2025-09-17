import { useState, useEffect } from "react";
import API from "../api/Api";

// Définition des types pour les données de l'API
interface SessionParking {
  id: number;
  nomClient: string;
  numeroPlaque: string;
  typeVehicule: string;
  heureDebut: string;
  idPlace: number;
}

// Définition du type pour le véhicule à enregistrer
interface NouvelVehicule {
  nomClient: string;
  numeroPlaque: string;
  idPlace: number;
  typeVehicule: string;
}

const typesVehicules = [
  { nom: "Voiture", prixParMinute: 83, icone: null },
  { nom: "Moto", prixParMinute: 42, icone: null },
  { nom: "Camion", prixParMinute: 167, icone: null },
];

// Fonctions de calcul
const calculerDuree = (heureDebut: string): string => {
  const maintenant = new Date();
  const dureeEnMinutes = Math.floor(
    (maintenant.getTime() - new Date(heureDebut).getTime()) / 60000
  );
  const heures = Math.floor(dureeEnMinutes / 60);
  const minutes = dureeEnMinutes % 60;

  if (dureeEnMinutes === 0) {
    return "0m";
  }

  return `${heures > 0 ? `${heures}h ` : ""}${minutes}m`;
};

const calculerCout = (heureDebut: string, typeVehicule: string): string => {
  const maintenant = new Date();
  const dureeEnMinutes = Math.floor(
    (maintenant.getTime() - new Date(heureDebut).getTime()) / 60000
  );

  const prix =
    typesVehicules.find((type) => type.nom === typeVehicule)?.prixParMinute ||
    0;
  const coutTotal = dureeEnMinutes * prix;

  return coutTotal.toLocaleString("fr-MG");
};

const useGestionParking = () => {
  const [placesParking, setPlacesParking] = useState<any[]>([]);
  const [nouvelVehicule, setNouvelVehicule] = useState<NouvelVehicule>({
    nomClient: "",
    numeroPlaque: "",
    idPlace: 0,
    typeVehicule: "Voiture",
  });
  const [sessionACloturer, setSessionACloturer] =
    useState<SessionParking | null>(null);

  const recupererSessionsParking = async () => {
    try {
      const reponse = await API.get<SessionParking[]>(`/parkingSessions`);
      const sessionsOccupees = reponse.data;
      const toutesLesPlaces = Array.from({ length: 15 }, (_, i) => {
        const placeOccupee = sessionsOccupees.find((s) => s.idPlace === i + 1);
        return {
          id: i + 1,
          estOccupee: !!placeOccupee,
          occupant: placeOccupee,
        };
      });
      setPlacesParking(toutesLesPlaces);
    } catch (erreur) {
      console.error("Erreur lors de la récupération des sessions:", erreur);
    }
  };

  const gererDebutParking = async () => {
    if (
      !nouvelVehicule.nomClient ||
      !nouvelVehicule.numeroPlaque ||
      nouvelVehicule.idPlace === 0
    ) {
      alert("Veuillez remplir tous les champs et sélectionner une place.");
      return;
    }

    const donneesNouvelleSession = {
      ...nouvelVehicule,
      heureDebut: new Date().toISOString(),
    };

    try {
      await API.post<SessionParking>(
        `/parkingSessions`,
        donneesNouvelleSession
      );
      recupererSessionsParking();
      setNouvelVehicule({
        nomClient: "",
        numeroPlaque: "",
        idPlace: 0,
        typeVehicule: "Voiture",
      });
    } catch (erreur) {
      console.error("Erreur lors de la création de la session:", erreur);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  const confirmerFinSession = async () => {
    if (!sessionACloturer) return;

    try {
      await API.delete(`/parkingSessions/${sessionACloturer.id}`);
      recupererSessionsParking();
      setSessionACloturer(null);
    } catch (erreur) {
      console.error("Erreur lors de la fin de session:", erreur);
      alert("Une erreur s'est produite lors de la fin de session.");
    }
  };

  useEffect(() => {
    recupererSessionsParking();
    const minuteur = setInterval(recupererSessionsParking, 60000);
    return () => clearInterval(minuteur);
  }, []);

  return {
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
    recupererSessionsParking,
  };
};

export default useGestionParking;
