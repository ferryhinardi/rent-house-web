import React from 'react';
import Router from 'next/router';
import Image from 'next/image';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { Token, fetcher } from 'core';
import { login } from 'utils/auth';
import { Input, Text, LoadingIndicator, ErrorMessage } from 'core/base';
import { FacebookButton, GoogleButton } from 'components';
import { Login, ErrorHandling, UserAnswers } from 'types';
import loginCoverImg from 'assets/login-cover.svg';
import { HeroState } from 'components/SectionLandingPage/Hero';

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
  const { isLoading, isError, error, mutate } = useMutation<
    Login,
    ErrorHandling,
    Payload
  >(
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

  const { mutate: mutateAnswer } = useMutation<
    Login,
    ErrorHandling,
    UserAnswers
  >(
    async (payload) =>
      fetcher<Login>({
        method: 'POST',
        url: '/answers',
        data: payload,
      }),
    {
      onSuccess: () => {
        Router.reload();
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
          value: item.value as string,
        });
      });

      mutateAnswer(answers);
    } else {
      Router.reload();
    }
  };
  const onSubmit = (data: Payload) => {
    mutate(data);
  };

  return (
    <View style={styles.container}>
      <Image src={loginCoverImg} alt="login-cover" layout="responsive" />
      <View style={styles.formContainer}>
        <Text variant="header-2" style={styles.title}>
          {t('titleSignInForm')}
        </Text>
        <Text variant="caption" style={styles.title}>
          {t('subtitleSignInForm')}
        </Text>
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
                <ErrorMessage
                  text={fieldState.error?.message!}
                  errorMessageId={fieldState.error?.message}
                />
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
                <ErrorMessage
                  text={fieldState.error?.message!}
                  errorMessageId={fieldState.error?.message}
                />
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
                <ErrorMessage
                  text={fieldState.error?.message!}
                  errorMessageId={fieldState.error?.message}
                />
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
                <ErrorMessage
                  text={fieldState.error?.message!}
                  errorMessageId={fieldState.error?.message}
                />
              )}
            </>
          )}
        />
        {isError && <ErrorMessage text={error?.message as string} />}
      </View>
      <Pressable style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
        {isLoading ? (
          <LoadingIndicator color={Token.colors.white} />
        ) : (
          <Text variant="large" ink="light">
            {t('submitSignUpForm')}
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 600,
    margin: 'auto',
  },
  title: { textAlign: 'center' },
  separator: {
    marginVertical: Token.spacing.ml,
  },
  formContainer: {
    padding: Token.spacing.m,
    alignItems: 'center',
  },
  input: {
    marginBottom: Token.spacing.m,
    width: '100%',
    borderRadius: Token.border.radius.extra,
  },
  submitButton: {
    marginTop: Token.spacing.m,
    paddingVertical: Token.spacing.m,
    backgroundColor: Token.colors.blue,
    alignItems: 'center',
  },
});

export default SignUpForm;
