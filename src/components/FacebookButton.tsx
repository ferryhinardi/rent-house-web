import React from 'react';
import FacebookLogin, { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import { Token } from 'core';

const responseFacebook = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
  console.log(response);
};

function FacebookButton() {
  return (
    <FacebookLogin
      appId="xxx"
      autoLoad
      callback={responseFacebook}
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
      textButton="Facebook"
    />
  );
}

export default FacebookButton;
