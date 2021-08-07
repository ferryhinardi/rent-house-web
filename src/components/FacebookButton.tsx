import React from 'react';
import FacebookLogin, { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';

const responseFacebook = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
  const { accessToken } = response as ReactFacebookLoginInfo;
  fetch(
    `${process.env.NEXT_PUBLIC_API_HOST + "/provider/facebook"}`,
    {
      body: JSON.stringify({
        provider_token: accessToken,
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
      })
  });
};
const onFailure = (response: ReactFacebookFailureResponse) => {
  console.error(JSON.stringify(response));
};

function FacebookButton() {
  const { t } = useTranslation();
  return (
    <FacebookLogin
      appId={`${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}`}
      autoLoad
      callback={responseFacebook}
      onFailure={onFailure}
      containerStyle={{
        marginTop: Token.spacing.m
      }}
      buttonStyle={{
        width: '100%',
        borderTopLeftRadius: Token.border.radius.default,
        borderBottomRightRadius: Token.border.radius.default,
      }}
      fields="name,email,picture"
      icon="fa-facebook"
      size="medium"
      textButton={t('facebook')}
    />
  );
}

export default FacebookButton;
