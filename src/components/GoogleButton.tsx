import React from 'react';
import Image from 'next/image';
import { Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  useGoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import config from 'config';
import { Token, fetcher } from 'core';
import { Text } from 'core/base';
import { login } from 'utils/auth';
import { Login } from 'types';
import assets from 'assets';

const onSuccess =
  (callback: () => void) =>
  (data: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const { tokenId } = data as GoogleLoginResponse;

    fetcher<Login>({
      method: 'POST',
      url: '/login/google',
      data: {
        provider_token: tokenId,
      },
    })
      .then(login)
      .then(callback);
  };

const onFailure = (error: unknown) => {
  console.error(JSON.stringify(error));
};

type Props = {
  onSuccessLogin: () => void;
};

function GoogleButton(props: Props) {
  const { t } = useTranslation();
  const { signIn, loaded } = useGoogleLogin({
    clientId: `${config.googleAuthKey}`,
    onSuccess: onSuccess(props.onSuccessLogin),
    onFailure,
    cookiePolicy: 'single_host_origin',
    isSignedIn: false,
  });
  return (
    <Pressable style={styles.button} onPress={signIn} disabled={!loaded}>
      <Image {...assets.GoogleLogo} alt="Google" width={20} height={20} />
      <Text style={styles.text}>{t('google')}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginTop: Token.spacing.m,
    paddingLeft: Token.spacing.l,
    paddingVertical: Token.spacing.m,
    borderRadius: Token.border.radius.extra,
    backgroundColor: Token.colors.white,
    boxShadow: '7px 9px 44px rgba(0, 0, 0, 0.08)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: Token.spacing.s,
    ...Token.typography.Baseline,
    fontSize: Token.fontSize.big,
  },
});

export default GoogleButton;
