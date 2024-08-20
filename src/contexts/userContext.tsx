import React, { createContext, useState, useContext, useEffect } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useRouter } from 'next/router';

interface UserContextType {
  userName: string | undefined;
  userID: number | undefined;
  userToken: string | undefined;
  setUserName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setUserID: React.Dispatch<React.SetStateAction<number | undefined>>;
  setUserToken: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: ({ children }: any) => React.JSX.Element = ({ children }: any) => {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [userID, setUserID] = useState<number | undefined>(undefined);
  const [userToken, setUserToken] = useState<string | undefined>(undefined);
  const { localReadingData } = useLocalStorage();
  const router = useRouter();

  useEffect(() => {
    const localUserToken = localReadingData("userToken");
    const localUserName = localReadingData("userName");
    localUserToken != null && localUserToken != undefined && setUserToken(localUserToken);
    localUserName != null && localUserName != undefined && setUserName(localUserName);
  }, [localReadingData]);

  return (
    <UserContext.Provider value={{ userName, userToken, userID, setUserName, setUserToken, setUserID}}>
      {children}
    </UserContext.Provider>
  );
};