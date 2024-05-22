/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';

import { useAlkaysanOAuth } from './AlkaysanOauthProvider';
import {
  IdConfiguration,
  AlkaysanButtonConfiguration,
  AlkaysanCredentialResponse,
} from './types';
import { View, ViewProps } from 'react-native';

const containerHeightMap = { large: 40, medium: 32, small: 20 };

export type AlkaysanLoginProps = {
  onSuccess?: (credentialResponse: AlkaysanCredentialResponse) => void;
  onError?: () => void;
  onLoad?: () => void;
  containerProps?: ViewProps;
} & Omit<
  IdConfiguration,
  'client_id' | 'client_secret' | 'redirect_uri' | 'callback'
> &
  AlkaysanButtonConfiguration;

export default function AlkaysanLogin({
  onSuccess = () => {},
  onError,
  onLoad,
  mode = 'popup',
  type = 'button',
  theme = 'filled_light',
  size = 'large',
  text = 'signin_with',
  shape = 'pill',
  locale,
  containerProps,
  ...props
}: AlkaysanLoginProps) {
  const btnContainerRef = React.useRef<any>(null);
  const { clientId, clientSecret, redirectURI, responseType, scriptLoadedSuccessfully } = useAlkaysanOAuth();

  const onSuccessRef = React.useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  const onErrorRef = React.useRef(onError);
  onErrorRef.current = onError;

  React.useEffect(() => {
    if (!scriptLoadedSuccessfully) return;

    window?.alkaysan?.account?.id?.initialize({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectURI,
      response_type: responseType,
      callback: (credentialResponse: AlkaysanCredentialResponse) => {
        if (!credentialResponse?.credential) {
          return onErrorRef.current?.();
        }

        const { credential } = credentialResponse;
        onSuccessRef.current({
          credential
        });
      },
      ...props,
    });

    window?.alkaysan?.account?.id?.renderButton(btnContainerRef.current!, {
      mode,
      type,
      theme,
      size,
      text,
      shape,
      locale
    });
  }, [scriptLoadedSuccessfully]);

  const combinedStyle = {
    height: containerHeightMap[size],
    ...(containerProps?.style ? [containerProps?.style] : null)
  }

  return (
    <View
      {...containerProps}
      ref={btnContainerRef}
      style={[combinedStyle]}
    />
  );
}

