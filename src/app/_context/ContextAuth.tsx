import { createContext, useContext, useEffect, useState } from "react";
import { FileType } from "../(routes)/dashboard/_components/FlatList";
import { truncate } from "fs";

interface AuthContextType {
  File: any; // Adjust the type according to your needs
  setFiles: React.Dispatch<React.SetStateAction<any>> | undefined;
  Loading: any; // Adjust the type according to your needs
  setLoading: React.Dispatch<React.SetStateAction<any>> | undefined;
 
}

const AuthContext = createContext<AuthContextType>({
  File: null,
  setFiles: undefined,
  Loading: null,
  setLoading:undefined
  
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [File, setFiles] = useState<FileType>();
  const [Loading, setLoading] = useState();

  
  

  const value = {
    File,
    setFiles,
    Loading,
    setLoading
  
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
