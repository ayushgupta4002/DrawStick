
import { createContext, useContext, useEffect, useState } from "react";
import { FileType } from "../(routes)/dashboard/_components/FlatList";

interface AuthContextType {
  File: any; // Adjust the type according to your needs
  setFiles: React.Dispatch<React.SetStateAction<any>> | undefined;
}

const AuthContext = createContext<AuthContextType>({File: null, setFiles: undefined});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [File, setFiles] = useState<FileType>();

  const value = {
    File,
    setFiles
  };



  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
