import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useFormContext, useController } from 'react-hook-form';
import { Element } from 'react-scroll';
import { Text, Button, Input, ErrorMessage } from 'core/base';
import { Token } from 'core';
import avatar from 'assets/avatar-sample.svg';

export default function BasicProfile() {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const { field: fullNameField, fieldState: fullNameFieldState } =
    useController({
      name: 'name',
      control,
      rules: {
        required: t('fullName.required') as string,
      },
    });
  const { field: jobField, fieldState: jobFieldState } = useController({
    name: 'job',
    control,
  });
  const { field: emailField, fieldState: emailFieldState } = useController({
    name: 'email',
    control,
    rules: {
      required: t('email.required') as string,
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: t('email.pattern'),
      },
    },
  });
  const { field: passwordField, fieldState: passwordFieldState } =
    useController({
      name: 'password',
      control,
      rules: {
        required: t('password.required') as string,
        minLength: {
          value: 5,
          message: t('password.minLength', { length: 5 }),
        },
      },
    });
  const { field: bioField, fieldState: bioFieldState } = useController({
    name: 'bio',
    control,
  });
  return (
    <Element name="basic-profile">
      <View style={styles.container}>
        <Text variant="header-3" ink="primary">
          {t('welcomeMessage', { name: 'username' })}
        </Text>
        <Text variant="caption">{t('welcomeDescription')}</Text>
        <View style={styles.form}>
          <View>
            <View style={{ borderRadius: Token.border.radius.default }}>
              <Image src={avatar} width={240} height={240} alt="avatar" />
            </View>
            <Button
              variant="secondary"
              text={t('reuploadButton')}
              style={styles.uploadButton}
            />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text variant="tiny" style={styles.label}>
                {t('fullName')}
              </Text>
              <Input
                {...fullNameField}
                placeholder={t('fullName')}
                textContentType="name"
                error={Boolean(fullNameFieldState.error)}
                errorMessageId={fullNameFieldState.error?.message}
                containerStyle={styles.input}
              />
              {Boolean(fullNameFieldState.error) && (
                <ErrorMessage
                  text={fullNameFieldState.error?.message!}
                  errorMessageId={fullNameFieldState.error?.message}
                />
              )}
            </View>
            <View style={styles.formGroup}>
              <Text variant="tiny" style={styles.label}>
                {t('jobTitle')}
              </Text>
              <Input
                {...jobField}
                placeholder={t('jobTitle')}
                textContentType="jobTitle"
                error={Boolean(jobFieldState.error)}
                errorMessageId={jobFieldState.error?.message}
                containerStyle={styles.input}
              />
              {Boolean(jobFieldState.error) && (
                <ErrorMessage
                  text={jobFieldState.error?.message!}
                  errorMessageId={jobFieldState.error?.message}
                />
              )}
            </View>
            <View style={styles.formGroup}>
              <Text variant="tiny" style={styles.label}>
                {t('emailAddress')}
              </Text>
              <Input
                {...emailField}
                placeholder={t('emailAddress')}
                textContentType="emailAddress"
                error={Boolean(emailFieldState.error)}
                errorMessageId={emailFieldState.error?.message}
                containerStyle={styles.input}
              />
              {Boolean(emailFieldState.error) && (
                <ErrorMessage
                  text={emailFieldState.error?.message!}
                  errorMessageId={emailFieldState.error?.message}
                />
              )}
            </View>
            <View style={styles.formGroup}>
              <Text variant="tiny" style={styles.label}>
                {t('password')}
              </Text>
              <Input
                {...passwordField}
                placeholder={t('password')}
                textContentType="password"
                secureTextEntry
                error={Boolean(passwordFieldState.error)}
                errorMessageId={passwordFieldState.error?.message}
                containerStyle={styles.input}
              />
              {Boolean(passwordFieldState.error) && (
                <ErrorMessage
                  text={passwordFieldState.error?.message!}
                  errorMessageId={passwordFieldState.error?.message}
                />
              )}
            </View>
            <View style={styles.formGroup}>
              <Text variant="tiny" style={styles.label}>
                {t('biodata')}
              </Text>
              <Input
                {...bioField}
                variant="text-area"
                multiline
                placeholder={t('biodata')}
                textContentType="none"
                error={Boolean(bioFieldState.error)}
                errorMessageId={bioFieldState.error?.message}
                containerStyle={styles.textArea}
              />
              {Boolean(bioFieldState.error) && (
                <ErrorMessage
                  text={bioFieldState.error?.message!}
                  errorMessageId={bioFieldState.error?.message}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </Element>
  );
}

const styles = StyleSheet.create({
  container: {},
  form: {
    marginTop: Token.spacing.xxl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xxl,
  },
  formContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.ml,
  },
  formGroup: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '49%',
  },
  label: {
    marginBottom: Token.spacing.xs,
  },
  uploadButton: {
    marginTop: Token.spacing.l,
  },
  input: {
    marginBottom: Token.spacing.m,
  },
  textArea: {
    borderRadius: Token.border.radius.default,
    minHeight: 170,
    alignItems: 'flex-start',
  },
});
