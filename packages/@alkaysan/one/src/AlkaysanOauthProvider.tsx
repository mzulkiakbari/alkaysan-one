/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useContext, createContext, useMemo, ReactNode } from 'react';

import useLoadAlkaysanSSOScript, {
  UseLoadAlkaysanSSOScriptOptions,
} from './hooks/useLoadAlkaysanSSOScript';

interface AlkaysanOAuthContextProps {
  clientId: number;
  clientSecret: string;
  redirectURI: string;
  responseType: "code" | "authorization_code";
  scriptLoadedSuccessfully: boolean;
}

const AlkaysanOAuthContext = createContext<AlkaysanOAuthContextProps>(null!);

interface AlkaysanOAuthProviderProps extends UseLoadAlkaysanSSOScriptOptions {
  clientId: number;
  clientSecret: string;
  redirectURI: string;
  responseType: "code" | "authorization_code";
  children: ReactNode;
}

export default function AlkaysanOAuthProvider({
  clientId,
  clientSecret,
  redirectURI,
  responseType,
  nonce,
  onScriptLoadSuccess,
  onScriptLoadError,
  children,
}: AlkaysanOAuthProviderProps) {
  const scriptLoadedSuccessfully = useLoadAlkaysanSSOScript({
    nonce,
    onScriptLoadSuccess,
    onScriptLoadError,
  });

  const contextValue = useMemo(
    () => ({
      clientId,
      clientSecret,
      redirectURI,
      responseType,
      scriptLoadedSuccessfully,
    }),
    [clientId, clientSecret, redirectURI, responseType, scriptLoadedSuccessfully],
  );

  return (
    <AlkaysanOAuthContext.Provider value={contextValue}>
      {children}
    </AlkaysanOAuthContext.Provider>
  );
}

export function useAlkaysanOAuth() {
  const context = useContext(AlkaysanOAuthContext);
  if (!context) {
    throw new Error(
      'Alkaysan OAuth components must be used within AlkaysanOAuthProvider',
    );
  }
  return context;
}
