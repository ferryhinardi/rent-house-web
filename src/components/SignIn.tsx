import React from 'react';
import Router from 'next/router';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { Token, fetcher } from 'core';
import { login } from 'utils/auth';
import { Input, Text, Button, ErrorMessage, Modal } from 'core/base';
import { FacebookButton, GoogleButton } from 'components';
import { Login, ErrorHandling } from 'types';
import assets from 'assets';

type Payload = { email: string; password: string };

function SignInForm() {
  const { t } = useTranslation();
  const { isLoading, isError, error, mutate } = useMutation<Login, ErrorHandling, Payload>(
    async (payload) =>
      fetcher<Login>({
        method: 'POST',
        url: '/login/email',
        data: payload,
      }),
    {
      onSuccess: (response: Login) => {
        login(response);
        onSuccessLogin();
      },
    }
  );
  const { control, handleSubmit } = useForm();
  const onSuccessLogin = () => {
    Router.reload();
  };
  const onSubmit = (data: Payload) => {
    mutate(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image {...assets.loginCover} alt="login-cover" objectFit="cover" />
      </View>
      <View style={styles.formContainer}>
        <Text variant="header-2" style={styles.title}>
          {t('titleSignInForm')}
        </Text>
        <Text variant="caption" style={styles.title}>
          {t('subtitleSignInForm')}
        </Text>
        <View style={styles.fieldSectionContainer}>
          <GoogleButton onSuccessLogin={onSuccessLogin} />
          <FacebookButton onSuccessLogin={onSuccessLogin} />
          <Text style={styles.separator}>{t('separator')}</Text>
          <Controller
            name="email"
            control={control}
            rules={{
              required: t('email.required') as string,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: t('email.pattern'),
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  placeholder={t('emailAddress')}
                  textContentType="emailAddress"
                  error={Boolean(fieldState.error)}
                  errorMessageId={fieldState.error?.message}
                  containerStyle={styles.input}
                />
                {Boolean(fieldState.error) && (
                  <ErrorMessage text={fieldState.error?.message!} errorMessageId={fieldState.error?.message} />
                )}
              </>
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: t('password.required') as string,
              minLength: {
                value: 5,
                message: t('password.minLength', { length: 5 }),
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  placeholder={t('password')}
                  textContentType="password"
                  secureTextEntry
                  error={Boolean(fieldState.error)}
                  errorMessageId={fieldState.error?.message}
                  containerStyle={styles.input}
                />
                {Boolean(fieldState.error) && (
                  <ErrorMessage text={fieldState.error?.message!} errorMessageId={fieldState.error?.message} />
                )}
              </>
            )}
          />
          {isError && <ErrorMessage text={error?.message as string} />}
        </View>
      </View>
      <Button
        loading={isLoading}
        text={t('submitSignInForm')}
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}
      />
      <DevTool control={control} />
    </View>
  );
}

export function SignInButton() {
  const [isVisible, onVisible] = React.useState(false);
  const { t } = useTranslation();
  return (
    <>
      <Button
        textStyle={{ fontWeight: '500' }}
        variant="secondary"
        text={t('signIn')}
        onPress={() => onVisible(true)}
        style={styles.signInButton}
      />
      <Modal
        animationType="fade"
        visible={isVisible}
        onRequestClose={() => onVisible(false)}
        onDismiss={() => onVisible(false)}
        modalContentStyle={styles.modalContentStyle}
        noPadding>
        <SignInForm />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 570,
    margin: 'auto',
  },
  title: { textAlign: 'center' },
  separator: {
    marginVertical: Token.spacing.ml,
    maxWidth: '60%',
  },
  formContainer: {
    alignItems: 'center',
    paddingHorizontal: Token.spacing.m,
    paddingVertical: Token.spacing.xl,
  },
  input: {
    marginBottom: Token.spacing.m,
    width: '100%',
    borderRadius: Token.border.radius.extra,
  },
  submitButton: {
    marginTop: Token.spacing.m,
    paddingVertical: Token.spacing.m,
    borderRadius: 0,
    alignItems: 'center',
    height: 77,
  },
  signInButton: {
    height: 50,
  },
  imageContainer: {
    borderTopLeftRadius: Token.border.radius.default,
    borderTopRightRadius: Token.border.radius.default,
    overflow: 'hidden',
    maxHeight: 200,
  },
  fieldSectionContainer: {
    paddingHorizontal: Token.spacing.l,
    alignItems: 'center',
    width: '100%',
  },
  modalContentStyle: {
    marginVertical: 100,
  },
});

export default SignInButton;
