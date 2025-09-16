
import { differenceInDays } from "date-fns"; //fonction mi calcul difference entre 2 date 
export type VehicleType = "Voiture" | "Moto" | "Vélo";


export const tarifsParJour: Record<VehicleType, number> = {
  Voiture: 10000,
  Moto: 5000,
  Vélo: 2000,
};

export const calculPriceParking = (
  startDate: Date | null,
  endDate: Date | null,
  typeVehicule: string
): number | null => {
  if (!startDate || !endDate || !typeVehicule) {
    return null;
  }

  // Vérifier si le type de véhicule est une clé valide
  if (!(typeVehicule in tarifsParJour)) {
    console.error("Type de véhicule inconnu:", typeVehicule);
    return null;
  }

  // Calculer le nombre de jours entre les deux dates (en incluant le premier et dernier jour)
  let nbJours = differenceInDays(endDate, startDate) + 1;
  if (nbJours < 1) {
    nbJours = 1;
  }

  const tarifJournalier = tarifsParJour[typeVehicule as VehicleType];
  const prixTotal = nbJours * tarifJournalier;
  return prixTotal;
};
