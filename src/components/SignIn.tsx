import React from 'react'
import Router from 'next/router'
import Image from 'next/image'
import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useForm, Controller } from 'react-hook-form'
import { Token, fetcher } from 'core'
import { login } from 'utils/auth'
import { Input, Text, Button, ErrorMessage, Modal } from 'core/base'
import { FacebookButton, GoogleButton } from 'components'
import { Login, ErrorHandling } from 'types'
import loginCoverImg from 'assets/login-cover.svg'

type Payload = { email: string; password: string }

function SignInForm() {
  const { t } = useTranslation()
  const { isLoading, isError, error, mutate } = useMutation<
    Login,
    ErrorHandling,
    Payload
  >(
    async (payload) =>
      fetcher<Login>({
        method: 'POST',
        url: '/login',
        data: payload,
      }),
    {
      onSuccess: (response: Login) => {
        login(response)
        onSuccessLogin()
      },
    }
  )
  const { control, handleSubmit } = useForm()
  const onSuccessLogin = () => {
    Router.reload()
  }
  const onSubmit = (data: Payload) => {
    mutate(data)
  }

  return (
    <View style={styles.container}>
      <Image src={loginCoverImg} alt="login-cover" layout="responsive" />
      <View style={styles.formContainer}>
        <Text variant="title-1" style={styles.title}>
          {t('titleSignInForm')}
        </Text>
        <Text variant="baseline" style={styles.title}>
          {t('subtitleSignInForm')}
        </Text>
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
      <Button
        loading={isLoading}
        text={t('submitSignInForm')}
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  )
}

export function SignInButton() {
  const [isVisible, onVisible] = React.useState(false)
  const { t } = useTranslation()
  return (
    <>
      <Button
        variant="secondary"
        text={t('signIn')}
        onPress={() => onVisible(true)}
      />
      <Modal
        animationType="fade"
        visible={isVisible}
        onRequestClose={() => onVisible(false)}
        onDismiss={() => onVisible(false)}
        noPadding
      >
        <SignInForm />
      </Modal>
    </>
  )
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
    borderRadius: 0,
    alignItems: 'center',
  },
})

export default SignInButton
