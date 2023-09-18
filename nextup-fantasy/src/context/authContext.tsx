import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  GoogleLogin,
  GoogleLogout,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

type Props = {
  children: React.ReactNode;
};

export type AuthContextType = {
  currentUser: object;
  setCurrentUser: React.SetStateAction<object>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  {} as AuthContextType
);

export const AuthContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<AuthContextType>(
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
