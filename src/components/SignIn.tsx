import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { Token, fetcher } from 'core';
import Input from 'core/base/Input';
import LoadingIndicator from 'core/base/LoadingIndicator';
import ErrorMessage from 'core/base/ErrorMessage';
import FacebookButton from 'components/FacebookButton';
import GoogleButton from 'components/GoogleButton';
import { Response, ErrorHandling } from 'types';

type Payload = { email: string, password: string };

function SignIn() {
  const { t } = useTranslation();
  const { isLoading, isError, error, mutate } = useMutation<Response, ErrorHandling, Payload>(
    async (payload) => {
      const res = await fetcher<Response>({
        method: 'POST',
        url: '/login',
        data: payload,
      });
      return res;
    },
    {
      onSuccess: ({ token }) => {
        typeof window !== "undefined" && localStorage.setItem("token", token);
      },
    }
  );
  const { control, handleSubmit } = useForm();
  const onSubmit = (data: Payload) => {
    mutate(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleForm}>{t('signIn')}</Text>
      <Controller
        name="email"
        control={control}
        rules={{
          required: t('email.required') as string,
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: t('email.pattern')
          }
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
            message: t('password.minLength', { length: 5 })
          }
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
      <Pressable style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
        {isLoading ? (
          <LoadingIndicator color={Token.colors.white} />
        ) : (
          <Text style={styles.submitText}>{t('signIn')}</Text>
        )}
      </Pressable>

      <FacebookButton />
      <GoogleButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 768,
    margin: 'auto',
  },
  titleForm: {
    ...Token.typography.Baseline,
    fontSize: Token.fontSize.large,
  },
  input: {
    marginTop: Token.spacing.m,
  },
  submitButton: {
    marginTop: Token.spacing.xl,
    paddingVertical: Token.spacing.m,
    borderTopLeftRadius: Token.spacing.xs,
    borderBottomRightRadius: Token.spacing.xs,
    backgroundColor: Token.colors.blue,
    alignItems: 'center',
  },
  submitText: {
    color: Token.colors.white,
    fontSize: Token.fontSize.large,
  },
});

export default SignIn;
