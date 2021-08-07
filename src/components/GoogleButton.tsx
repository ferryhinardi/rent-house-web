import React from 'react';
import Image from 'next/image';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useGoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { Token } from 'core';
import GoogleLogo from 'assets/G__Logo.svg';

const onSuccess = (data: GoogleLoginResponse | GoogleLoginResponseOffline) => {
  const { tokenId } = data as GoogleLoginResponse;

  fetch(
    `${process.env.NEXT_PUBLIC_API_HOST + '/provider/google'}`,
    {
      body: JSON.stringify({
        provider_token: tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  ).then((res) => {
    res
      .json()
      .then(({ token }) => {
        typeof window !== "undefined" &&
          localStorage.setItem("token", token);
      });
  })

};

const onFailure = (error: any) => {
  console.error(JSON.stringify(error));
};

function GoogleButton() {
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
      <Text style={styles.text}>{'Google'}</Text>
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
