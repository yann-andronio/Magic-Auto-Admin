import React, { createContext, useState, ReactNode } from 'react';


interface User {
  fullname: string;
  email: string;
}

interface UserContextType {
  user: User | null;
}


export const UserContext = createContext<UserContextType>({
  user: null,
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const [user, setUser] = useState<User | null>({
    fullname: "Nom de l'utilisateur connecté",
    email: "email@connecte.com",
  });

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};