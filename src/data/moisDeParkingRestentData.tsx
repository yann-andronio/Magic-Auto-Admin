export interface moisrestentI {
  mois: string;
  vehiculeLibre: number;
  motoLibre: number;
}

export interface ParkingData {
  [key: string]: moisrestentI[];
}

export const parkingData: ParkingData = {
  Ambohipo: [
    { mois: "Janvier", vehiculeLibre: 120, motoLibre: 40 },
    { mois: "Février", vehiculeLibre: 85, motoLibre: 25 },
    { mois: "Mars", vehiculeLibre: 0, motoLibre: 10 },
    { mois: "Avril", vehiculeLibre: 30, motoLibre: 5 },
    { mois: "Mai", vehiculeLibre: 15, motoLibre: 0 },
  ],
  Analamahitsy: [
    { mois: "Juin", vehiculeLibre: 220, motoLibre: 60 },
    { mois: "Juillet", vehiculeLibre: 75, motoLibre: 20 },
    { mois: "Août", vehiculeLibre: 10, motoLibre: 0 },
    { mois: "Septembre", vehiculeLibre: 0, motoLibre: 30 },
  ],
  Analakely: [
    { mois: "Octobre", vehiculeLibre: 45, motoLibre: 15 },
    { mois: "Novembre", vehiculeLibre: 180, motoLibre: 50 },
    { mois: "Décembre", vehiculeLibre: 5, motoLibre: 2 },
  ],
};
