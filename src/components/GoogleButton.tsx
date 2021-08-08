import React from 'react';
import Image from 'next/image';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useGoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { Token, fetcher } from 'core';
import GoogleLogo from 'assets/G__Logo.svg';

const onSuccess = (data: GoogleLoginResponse | GoogleLoginResponseOffline) => {
  const { tokenId } = data as GoogleLoginResponse;

  fetcher<{ token: string }>({
    method: 'POST',
    url: '/provider/google',
    data: {
      provider_token: tokenId,
    }
  }).then(({ token }) => {
    typeof window !== "undefined" && localStorage.setItem("token", token);
  });
};

const onFailure = (error: any) => {
  console.error(JSON.stringify(error));
};

function GoogleButton() {
  const { t } = useTranslation();
  const { signIn, loaded } = useGoogleLogin({
    clientId: `${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}`,
    onSuccess,
    onFailure,
    cookiePolicy: 'single_host_origin',
    isSignedIn: false,
  });
  return (
    <Pressable style={styles.button} onPress={signIn} disabled={!loaded}>
      <Image src={GoogleLogo} alt="Google"/>
      <Text style={styles.text}>{t('google')}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: Token.spacing.m,
    paddingVertical: Token.spacing.m,
    borderTopLeftRadius: Token.spacing.xs,
    borderBottomRightRadius: Token.spacing.xs,
    backgroundColor: Token.colors.google,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: Token.spacing.s,
    ...Token.typography.Baseline,
    fontSize: Token.fontSize.big,
  },
})

export default GoogleButton;
