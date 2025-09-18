import React, { createContext, useState, useEffect } from "react";
import API from "../api/Api";
const storage = {
  getItem: (key: string) => localStorage.getItem(key),
  setItem: (key: string, value: string) => localStorage.setItem(key, value),
  removeItem: (key: string) => localStorage.removeItem(key),
};

export interface UserI {
  id: number;
  full_name: string;
  email: string;
  type: "USER" | "ADMIN";
  telnumber?: string;
}

interface RegisterData {
  full_name: string;
  email: string;
  password: string;
}

interface AuthContextProps {
  user: UserI | null;
  loading: boolean;
  loadingtoken: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (data: UserI) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: false,
  loadingtoken: false,
  login: async () => false,
  register: async () => false,
  logout: async () => {},
  updateUser: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserI | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingtoken, setloadingtoken] = useState(true);

  useEffect(() => {
    const loadUserFromStorageByToken = async () => {
      try {
        const token = storage.getItem("accessToken");
        const userData = storage.getItem("user");

        if (token && userData) {
          setUser(JSON.parse(userData));
        } else {
          await logout();
        }
      } catch (error) {
        console.error("Erreur de chargement des données utilisateur :", error);
      } finally {
        setloadingtoken(false);
      }
    };

    loadUserFromStorageByToken();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await API.post("/login", { email, password });
      const { token, member } = res.data;

      storage.setItem("accessToken", token);
      storage.setItem("user", JSON.stringify(member));
      setUser(member);

      console.log("Connexion réussie !", member);
      return true;
    } catch (error: any) {
      console.log("Erreur de connexion :", error || "Erreur réseau");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setLoading(true);
    try {
       await API.post("/register", {
         full_name: data.full_name,
         email: data.email,
         password: data.password,
         type: "USER",
       });
      console.log("Inscription réussie !");
      return true;
    } catch (error: any) {
      console.log("Erreur d'inscription :", error || "Erreur réseau");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    storage.removeItem("accessToken");
    // storage.removeItem("refreshToken"); 
    setUser(null);
  };

  const updateUser = (data: UserI) => {
    setUser(data);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loadingtoken,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
