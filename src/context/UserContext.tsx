'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface UserContextType {
  profileUrl: string;
  setProfileUrl: (url: string) => void;
  username: string;
  setUsername: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profileUrl, setProfileUrlState] = useState('http://localhost:3000/photos.png');
  const [username, setUsernameState] = useState('');

  useEffect(() => {
    const storedUrl = localStorage.getItem('profileUrl');
    const storedName = localStorage.getItem('username');
    if (storedUrl) setProfileUrlState(storedUrl);
    if (storedName) setUsernameState(storedName);
  }, []);

  const setProfileUrl = (url: string) => {
    setProfileUrlState(url);
    localStorage.setItem('profileUrl', url);
  };

  const setUsername = (name: string) => {
    setUsernameState(name);
    localStorage.setItem('username', name);
  };

  return (
    <UserContext.Provider value={{ profileUrl, setProfileUrl, username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserContext must be used within a UserProvider');
  return context;
};
