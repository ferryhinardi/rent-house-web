import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { ReactFacebookLoginInfo, ReactFacebookFailureResponse, ReactFacebookLoginState } from 'react-facebook-login';
import { useTranslation } from 'react-i18next';
import config from 'config';
import { Token, fetcher } from 'core';
import { Text } from 'core/base';
import { login } from 'utils/auth';
import { Login } from 'types';

type RenderProps = ReactFacebookLoginState & {
  onClick: () => void;
  isDisabled: boolean;
};

const responseFacebook =
  (callback: () => void) => (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    const { accessToken } = response as ReactFacebookLoginInfo;

    fetcher<Login>({
      method: 'POST',
      url: '/login/facebook',
      data: {
        provider_token: accessToken,
      },
    })
      .then(login)
      .then(callback);
  };
const onFailure = (response: ReactFacebookFailureResponse) => {
  console.error(JSON.stringify(response));
};

type Props = {
  onSuccessLogin: () => void;
};

function FacebookButton(props: Props) {
  const { t } = useTranslation();
  return (
    <FacebookLogin
      appId={`${config.fbAppId}`}
      callback={responseFacebook(props.onSuccessLogin)}
      onFailure={onFailure}
      containerStyle={{
        width: '100%',
        marginTop: Token.spacing.m,
      }}
      buttonStyle={{
        width: '100%',
        borderRadius: Token.border.radius.extra,
        backgroundColor: Token.colors.white,
        color: Token.colors.black,
        boxShadow: '7px 9px 44px rgba(0, 0, 0, 0.08)',
      }}
      fields="name,email,picture"
      icon="fa-facebook"
      size="medium"
      render={({ onClick, isDisabled, isProcessing }: RenderProps) => {
        return (
          <Pressable style={styles.button} onPress={onClick} disabled={isDisabled || isProcessing}>
            <Icon name="facebook-f" size={20} color={Token.colors.fb} />
            <Text variant="body" style={styles.text}>{t('signInFacebook')}</Text>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginTop: Token.spacing.ml,
    paddingLeft: Token.spacing.l,
    paddingVertical: Token.spacing.m,
    borderRadius: Token.border.radius.extra,
    backgroundColor: Token.colors.white,
    boxShadow: '7px 9px 44px rgba(0, 0, 0, 0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  text: {
    marginLeft: Token.spacing.s,
  },
});

export default FacebookButton;
