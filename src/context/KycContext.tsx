import React, { createContext, useContext, useState, ReactNode } from 'react';

interface KycContextProps {
  isKintoKycEnabled: boolean;
  setIsKintoKycEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const KycContext = createContext<KycContextProps | undefined>(undefined);

export const KycProvider = ({ children }: { children: ReactNode }) => {
  const [isKintoKycEnabled, setIsKintoKycEnabled] = useState(false);

  return (
    <KycContext.Provider value={{ isKintoKycEnabled, setIsKintoKycEnabled }}>
      {children}
    </KycContext.Provider>
  );
};

export const useKyc = () => {
  const context = useContext(KycContext);
  if (!context) {
    throw new Error('useKyc must be used within a KycProvider');
  }
  return context;
};