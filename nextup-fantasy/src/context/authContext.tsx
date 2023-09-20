import { createContext, useEffect, useState } from 'react';

export type Props = {
  children: React.ReactNode;
};

export type AuthContextType = {
  currentUser: object | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export type UserType = {
  email: string;
  familyName: string;
  givenName: string;
  googleId: string;
  imageUrl: string;
  name: string;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(
    JSON.parse(localStorage.getItem('user') as string)
  );

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
