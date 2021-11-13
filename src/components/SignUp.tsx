import React from 'react';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import { Token, fetcher } from 'core';
import { login } from 'utils/auth';
import { Input, Text, LoadingIndicator, ErrorMessage } from 'core/base';
import { FacebookButton, GoogleButton } from 'components';
import { Login, ErrorHandling, UserAnswers } from 'types';
import assets from 'assets';
import { HeroState } from 'components/SectionLandingPage/Hero';
import { routePaths } from 'routePaths';

type Payload = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

type Props = {
  landingPageAnswers?: HeroState[];
};

function SignUpForm(props: Props) {
  const { t } = useTranslation();
  const router = useRouter();

  const { isLoading, isError, error, mutate } = useMutation<Login, ErrorHandling, Payload>(
    async (payload) =>
      fetcher<Login>({
        method: 'POST',
        url: '/user/register',
        data: payload,
      }),
    {
      onSuccess: (response: Login) => {
        login(response);
        onSuccessLogin();
      },
    }
  );

  const { mutate: mutateAnswer } = useMutation<Login, ErrorHandling, UserAnswers>(
    async (payload) =>
      fetcher<Login>({
        method: 'POST',
        url: '/answers',
        data: payload,
      }),
    {
      onSuccess: () => {
        router.push(routePaths.account);
      },
      onError: () => {
        Router.reload();
      },
    }
  );

  const { control, handleSubmit } = useForm();
  const onSuccessLogin = () => {
    if (props.landingPageAnswers && props.landingPageAnswers?.length > 0) {
      var answers: UserAnswers = [];
      props.landingPageAnswers.map((item) => {
        answers.push({
          question_id: item.questionID as number,
          tag: item.tag as string,
          value: item.value as string,
        });
      });

      mutateAnswer(answers);
    } else {
      router.push(routePaths.account);
    }
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
        <Text variant="header-2" font="playfair" style={styles.title}>
          {t('titleSignInForm')}
        </Text>
        <Text variant="caption" style={[styles.title, styles.subtitle]}>
          {t('subtitleSignInForm')}
        </Text>
        <View style={styles.fieldSectionContainer}>
          <GoogleButton onSuccessLogin={onSuccessLogin} />
          <FacebookButton onSuccessLogin={onSuccessLogin} />
          <Text style={styles.separator}>{t('separator')}</Text>
          <Controller
            name="name"
            control={control}
            rules={{
              required: t('fullName.required') as string,
            }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  placeholder={t('fullName')}
                  textContentType="name"
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
            name="phone"
            control={control}
            rules={{
              required: t('phoneNumber.required') as string,
            }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  keyboardType="numeric"
                  placeholder={t('phoneNumber')}
                  textContentType="telephoneNumber"
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
          <DevTool control={control} />
        </View>
      </View>
      <Pressable style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
        {isLoading ? (
          <LoadingIndicator color={Token.colors.white} />
        ) : (
          <Text variant="button" ink="light">
            {t('submitSignUpForm')}
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 570,
    margin: 'auto',
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    maxWidth: '60%',
    marginVertical: Token.spacing.m,
  },
  separator: {
    marginVertical: Token.spacing.ml,
  },
  formContainer: {
    alignItems: 'center',
    paddingHorizontal: Token.spacing.xxl,
    paddingVertical: Token.spacing.xl,
  },
  input: {
    marginBottom: Token.spacing.m,
    width: '100%',
    borderRadius: Token.border.radius.extra,
    height: 56,
  },
  submitButton: {
    marginTop: Token.spacing.m,
    paddingVertical: Token.spacing.m,
    backgroundColor: Token.colors.blue,
    alignItems: 'center',
    height: 77,
    justifyContent: 'center',
  },
  fieldSectionContainer: {
    paddingHorizontal: Token.spacing.l,
    alignItems: 'center',
    width: '100%',
  },
  imageContainer: {
    borderTopLeftRadius: Token.border.radius.default,
    borderTopRightRadius: Token.border.radius.default,
    overflow: 'hidden',
    maxHeight: 200,
  },
});

export default SignUpForm;
