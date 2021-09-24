import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useFormContext, useController } from 'react-hook-form';
import { Element } from 'react-scroll';
import { Text, Button, Input, ErrorMessage } from 'core/base';
import { fetcher, Token } from 'core';
import { User, ErrorHandling } from 'types';
import avatar from 'assets/avatar-sample.svg';
import { useMutation } from 'react-query';
import config from 'config';

type Props = User;
type Payload = {
  name: string;
  bio: string;
  job: string;
  annual_income: number;
  credit_score: number;
  profile_picture: FileList;
};

export default function BasicProfile(props: Props) {
  const { t } = useTranslation();
  const { register, control, setValue, handleSubmit } = useFormContext();
  const { isLoading, isError, error, mutate } = useMutation<
    User,
    ErrorHandling,
    Payload
  >(
    async (payload) => {
      const bodyFormData = new FormData();
      bodyFormData.set('name', payload.name);
      bodyFormData.set('address', props.address);
      bodyFormData.set('bio', payload.bio);
      bodyFormData.set('job', payload.job);
      bodyFormData.set('annual_income', props.annual_income.toString());
      bodyFormData.set('credit_score', props.credit_score.toString());
      console.log(payload.profile_picture);
      if (payload.profile_picture.length > 0) {
        bodyFormData.set('profile_picture', payload.profile_picture[0]);
      }

      return fetcher<User>({
        method: 'PUT',
        url: `/user/update?id=${props.id}`,
        data: bodyFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    {
      onSuccess: (response: User) => {
        console.log(response);
      },
    }
  );

  const handleProfilePicture = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    setValue('profile_picture', e.target.files);
  };

  const onSubmit = (formData: Payload) => {
    mutate(formData);
  };

  const { field: nameField, fieldState: nameFieldState } = useController({
    name: 'name',
    defaultValue: props.name,
    control,
    rules: {
      required: t('name.required') as string,
    },
  });
  const { field: jobField, fieldState: jobFieldState } = useController({
    name: 'job',
    defaultValue: props.job,
    control,
  });
  const { field: emailField, fieldState: emailFieldState } = useController({
    name: 'email',
    defaultValue: props.email,
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
    defaultValue: props.bio,
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
              <Image
                src={
                  props.profile_picture
                    ? `${config.imageHost}/${props.profile_picture}}`
                    : avatar
                }
                width={240}
                height={240}
                alt="avatar"
              />
            </View>
            <input
              {...register('profile_picture')}
              type="file"
              name="profile_picture"
              placeholder={t('reuploadButton')}
              onChange={handleProfilePicture}
            />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
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
                <ErrorMessage
                  text={nameFieldState.error?.message!}
                  errorMessageId={nameFieldState.error?.message}
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
                disabled={true} // should not be able to update email from this form
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
              <Button
                loading={isLoading}
                text={t('saveForm')}
                style={styles.submitButton}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
            {isError && <ErrorMessage text={error?.message as string} />}
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
  submitButton: {
    marginTop: Token.spacing.m,
    paddingVertical: Token.spacing.m,
    borderRadius: 0,
    alignItems: 'center',
  },
});
