'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type PermissionsType = {
  allowEdit: boolean;
  allowView: boolean;
} | null;

const PermissionsContext = createContext<PermissionsType>(null);

export const PermissionsProvider = ({ children }: { children: ReactNode }) => {
  const [permissions, setPermissions] = useState<PermissionsType>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('permissions');
      if (saved) {
        setPermissions(JSON.parse(saved));
      }
    }
  }, []);

  return (
    <PermissionsContext.Provider value={permissions}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => useContext(PermissionsContext);
