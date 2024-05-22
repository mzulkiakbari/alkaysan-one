/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';

import useLoadAlkaysanSSOScript, {
  UseLoadAlkaysanSSOScriptOptions,
} from './hooks/useLoadAlkaysanSSOScript';

interface AlkaysanOAuthContextProps {
  clientId: string;
  clientSecret: string;
  redirectURI: string;
  responseType: "code" | "authorization_code";
  scriptLoadedSuccessfully: boolean;
  data?: any;
}

const AlkaysanOAuthContext = React.createContext<AlkaysanOAuthContextProps>(null!);

interface AlkaysanOAuthProviderProps extends UseLoadAlkaysanSSOScriptOptions {
  clientId: string;
  clientSecret: string;
  redirectURI: string;
  responseType: "code" | "authorization_code";
  children?: React.ReactNode;
  data?: any;
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
  data
}: AlkaysanOAuthProviderProps) {
  const scriptLoadedSuccessfully = useLoadAlkaysanSSOScript({
    nonce,
    onScriptLoadSuccess,
    onScriptLoadError,
  });

  const contextValue = React.useMemo(
    () => ({
      clientId,
      clientSecret,
      redirectURI,
      responseType,
      scriptLoadedSuccessfully,
      data
    }),
    [clientId, clientSecret, redirectURI, responseType, scriptLoadedSuccessfully, data],
  );

  return (
    <AlkaysanOAuthContext.Provider value={contextValue}>
      {children}
    </AlkaysanOAuthContext.Provider>
  );
}

export function useAlkaysanOAuth() {
  const context = React.useContext(AlkaysanOAuthContext);
  if (!context) {
    throw new Error(
      'Alkaysan OAuth components must be used within AlkaysanOAuthProvider',
    );
  }
  return context;
}
