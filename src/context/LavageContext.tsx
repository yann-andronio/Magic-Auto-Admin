// src/context/LavageContext.tsx
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useCallback,
} from "react";
import API from "../api/Api"; // Assure-toi que ce chemin d'accès est correct

// Définir les types des données du formulaire de lavage
export interface LavageData {
  id: string; // L'API pourrait assigner un ID après la création
  nomClient: string;
  telephone: string;
  plaque: string;
  typeVehicule: string;
  typeLavage: string;
  // Ajoute d'autres champs si nécessaire (ex: date, prix, etc.)
}

// Définir le type du contexte
interface LavageContextType {
  lavages: LavageData[];
  createLavage: (data: Omit<LavageData, "id">) => Promise<void>;
  updateLavage: (id: string, data: Omit<LavageData, "id">) => Promise<void>; // Ajout de la fonction de mise à jour
  fetchLavages: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

// Créer le contexte avec des valeurs par défaut
export const LavageContext = createContext<LavageContextType>({
  lavages: [],
  createLavage: () => Promise.resolve(),
  updateLavage: () => Promise.resolve(), // Ajout de la fonction de mise à jour par défaut
  fetchLavages: () => Promise.resolve(),
  loading: false,
  error: null,
});

// Créer le fournisseur de contexte
export const LavageProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [lavages, setLavages] = useState<LavageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour créer un nouveau lavage
  const createLavage = async (data: Omit<LavageData, "id">) => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.post("/lavages", data);
      setLavages((prevLavages) => [...prevLavages, response.data]);
      alert("Lavage enregistré avec succès !");
    } catch (err: any) {
      setError("Échec de l'enregistrement du lavage. Veuillez réessayer.");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour mettre à jour un lavage existant
  const updateLavage = async (id: string, data: Omit<LavageData, "id">) => {
    setLoading(true);
    setError(null);
    try {
      // JSON Server utilise la méthode PUT pour la mise à jour complète
      const response = await API.put(`/lavages/${id}`, data);
      setLavages((prevLavages) =>
        prevLavages.map((lavage) => (lavage.id === id ? response.data : lavage))
      );
      alert("Lavage mis à jour avec succès !");
    } catch (err: any) {
      setError("Échec de la mise à jour du lavage. Veuillez réessayer.");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour récupérer la liste des lavages
  const fetchLavages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get("/lavages");
      setLavages(response.data);
    } catch (err: any) {
      setError("Échec de la récupération des lavages.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <LavageContext.Provider
      value={{
        lavages,
        createLavage,
        updateLavage, // Ajout de la fonction de mise à jour au contexte
        fetchLavages,
        loading,
        error,
      }}
    >
      {children}
    </LavageContext.Provider>
  );
};

// Hook personnalisé pour un accès facile au contexte
export const useLavage = () => {
  const context = useContext(LavageContext);
  if (context === undefined) {
    throw new Error(
      "useLavage doit être utilisé à l'intérieur d'un LavageProvider"
    );
  }
  return context;
};
    