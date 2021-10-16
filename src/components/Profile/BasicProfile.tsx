import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useFormContext, useController } from 'react-hook-form';
import { Element } from 'react-scroll';
import { Text, Input, ErrorMessage, FileUploader } from 'core/base';
import { Token } from 'core';

export default function BasicProfile() {
  const { t } = useTranslation();
  const { register, control, setValue } = useFormContext();
  const handleProfilePicture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setValue('profile_picture', e.target.files);
  };
  const { field: nameField, fieldState: nameFieldState } = useController({
    name: 'name',
    control,
    rules: {
      required: t('name.required') as string,
    },
  });
  const { field: jobField, fieldState: jobFieldState } = useController({
    name: 'job',
    control,
    rules: {
      required: t('job.required') as string,
    },
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
  const { field: bioField, fieldState: bioFieldState } = useController({
    name: 'bio',
    control,
  });
  return (
    <Element name="basic-profile">
      <View style={styles.container}>
        <View style={styles.form}>
          <FileUploader
            {...register('profile_picture')}
            actionLabel={t('reuploadButton')}
            onChange={handleProfilePicture}
          />
          <View style={styles.formContainer}>
            <View style={styles.formGroupHalfWidth}>
              <Text variant="tiny" style={styles.label}>
                {t('fullName')}
              </Text>
              <Input
                {...nameField}
                placeholder={t('name')}
                textContentType="name"
                error={Boolean(nameFieldState.error)}
                errorMessageId={nameFieldState.error?.message}
                containerStyle={styles.input}
              />
              {Boolean(nameFieldState.error) && (
                <ErrorMessage text={nameFieldState.error?.message!} errorMessageId={nameFieldState.error?.message} />
              )}
            </View>
            <View style={styles.formGroupHalfWidth}>
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
                <ErrorMessage text={jobFieldState.error?.message!} errorMessageId={jobFieldState.error?.message} />
              )}
            </View>
            <View style={styles.formGroupFullWidth}>
              <Text variant="tiny" style={styles.label}>
                {t('emailAddress')}
              </Text>
              <Input
                {...emailField}
                placeholder={t('emailAddress')}
                textContentType="emailAddress"
                disabled={true} // should not be able to update email from this form
                error={Boolean(emailFieldState.error)}
                errorMessageId={emailFieldState.error?.message}
                containerStyle={styles.input}
              />
              {Boolean(emailFieldState.error) && (
                <ErrorMessage text={emailFieldState.error?.message!} errorMessageId={emailFieldState.error?.message} />
              )}
            </View>
            <View style={styles.formGroupFullWidth}>
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
                <ErrorMessage text={bioFieldState.error?.message!} errorMessageId={bioFieldState.error?.message} />
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
  formGroupHalfWidth: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '49%',
  },
  formGroupFullWidth: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '100%',
  },
  label: {
    marginBottom: Token.spacing.xs,
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
