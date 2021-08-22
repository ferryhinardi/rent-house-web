import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import { Element } from 'react-scroll';
import { Text, Button, Input, ErrorMessage } from 'core/base';
import { Token } from 'core';
import avatar from 'assets/avatar-sample.svg';

export default function BasicProfile() {
  const { t } = useTranslation();
  const { control } = useFormContext();
  return (
    <Element name="basic-profile">
      <View style={styles.container}>
        <Text variant="header-title" ink="primary">
          {t('welcomeMessage', { name: 'username' })}
        </Text>
        <Text variant="medium-large">{t('welcomeDescription')}</Text>
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
            <Controller
              name="name"
              control={control}
              rules={{
                required: t('fullName.required') as string,
              }}
              render={({ field, fieldState }) => (
                <View style={[styles.formGroup, { width: '50%' }]}>
                  <Text variant="tiny" style={styles.label}>
                    {t('fullName')}
                  </Text>
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
                </View>
              )}
            />
            <Controller
              name="job"
              control={control}
              render={({ field, fieldState }) => (
                <View style={[styles.formGroup, { width: '50%' }]}>
                  <Text variant="tiny" style={styles.label}>
                    {t('jobTitle')}
                  </Text>
                  <Input
                    {...field}
                    placeholder={t('jobTitle')}
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
                </View>
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
                <View style={[styles.formGroup, { width: '50%' }]}>
                  <Text variant="tiny" style={styles.label}>
                    {t('emailAddress')}
                  </Text>
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
                </View>
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
                <View style={[styles.formGroup, { width: '50%' }]}>
                  <Text variant="tiny" style={styles.label}>
                    {t('password')}
                  </Text>
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
                </View>
              )}
            />
            <Controller
              name="bio"
              control={control}
              render={({ field, fieldState }) => (
                <View style={[styles.formGroup, { width: '100%' }]}>
                  <Text variant="tiny" style={styles.label}>
                    {t('biodata')}
                  </Text>
                  <Input
                    {...field}
                    variant="text-area"
                    multiline
                    placeholder={t('biodata')}
                    textContentType="name"
                    error={Boolean(fieldState.error)}
                    errorMessageId={fieldState.error?.message}
                    containerStyle={styles.textArea}
                  />
                  {Boolean(fieldState.error) && (
                    <ErrorMessage
                      text={fieldState.error?.message!}
                      errorMessageId={fieldState.error?.message}
                    />
                  )}
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </Element>
  );
}

const styles = StyleSheet.create({
  container: {},
  form: { marginTop: Token.spacing.xxl, flexDirection: 'row' },
  formContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  formGroup: {
    paddingHorizontal: Token.spacing.ml,
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
