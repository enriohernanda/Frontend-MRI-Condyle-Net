'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const API_BASE = 'https://aecc-2a09-bac5-3a25-1d05-00-2e4-10.ngrok-free.app';
const DEFAULT_IMAGE = '/photos.png';

export const UserContext = createContext<any>({});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [profileUrl, setProfileUrlState] = useState<string>(DEFAULT_IMAGE);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const savedUrl = localStorage.getItem('profileUrl');
    const savedUsername = localStorage.getItem('username');
    if (savedUrl) setProfileUrlState(savedUrl);
    if (savedUsername) setUsername(savedUsername);
  }, []);

  const setProfileUrl = useCallback((url: string) => {
    const fullUrl = url.startsWith('http') ? url : `${API_BASE}/${url}`;
    setProfileUrlState(fullUrl);
    localStorage.setItem('profileUrl', fullUrl);
  }, []);

  const setUsernameSafe = useCallback((name: string) => {
    setUsername(name);
    localStorage.setItem('username', name);
  }, []);

  return (
    <UserContext.Provider value={{ profileUrl, setProfileUrl, username, setUsername: setUsernameSafe }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
