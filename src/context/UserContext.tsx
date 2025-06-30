'use client';

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';

interface UserContextType {
  profileUrl: string;
  setProfileUrl: (url: string) => void;
  username: string;
  setUsername: (name: string) => void;
}

const defaultProfileUrl = '/photos.png';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profileUrl, setProfileUrlState] = useState<string>(defaultProfileUrl);
  const [username, setUsernameState] = useState<string>('');

  useEffect(() => {
    // Jalankan hanya di client
    if (typeof window !== 'undefined') {
      const storedUrl = localStorage.getItem('profileUrl');
      const storedName = localStorage.getItem('username');

      if (storedUrl) setProfileUrlState(storedUrl);
      if (storedName) setUsernameState(storedName);
    }
  }, []);

  const setProfileUrl = useCallback((url: string) => {
    setProfileUrlState(url);
    if (typeof window !== 'undefined') {
      localStorage.setItem('profileUrl', url);
    }
  }, []);

  const setUsername = useCallback((name: string) => {
    setUsernameState(name);
    if (typeof window !== 'undefined') {
      localStorage.setItem('username', name);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        profileUrl,
        setProfileUrl,
        username,
        setUsername,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
