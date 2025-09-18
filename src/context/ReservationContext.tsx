import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useCallback,
} from "react";
import API from "../api/Api";
import { UserContext } from "./UserContext";

// Définir les types pour plus de clarté
 export interface ReservationDataI {
  id: string;
  fullname: string;
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
  prixTotal: number | null;
}

interface ReservationContextType {
  reservations: ReservationDataI[];
  createReservation: (data: ReservationDataI) => Promise<void>;
  fetchReservations: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const ReservationContext = createContext<ReservationContextType>({
  reservations: [],
  createReservation: () => Promise.resolve(),
  fetchReservations: () => Promise.resolve(),
  loading: false,
  error: null,
});

export const ReservationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [reservations, setReservations] = useState<ReservationDataI[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createReservation = async (data: ReservationDataI) => {
    setLoading(true);
    setError(null);
    try {
      await API.post("reservations", data);
    } catch (err: any) {
      setError("Échec de la création de la réservation. Veuillez réessayer.");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // **SOLUTION : Utiliser useCallback pour stabiliser la fonction**
  const fetchReservations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get("reservations");
      setReservations(response.data);
    } catch (err: any) {
      setError("Échec de la récupération des réservations.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []); // Le tableau de dépendances vide [] garantit que la fonction n'est créée qu'une seule fois.

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        createReservation,
        fetchReservations,
        loading,
        error,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
