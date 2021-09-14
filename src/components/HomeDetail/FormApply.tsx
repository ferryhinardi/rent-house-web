import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useForm, useController } from 'react-hook-form';
import { Text, Button, Input, CalendarInput, ErrorMessage } from 'core/base';
import { Token } from 'core';
import avatar from 'assets/avatar-sample.svg';

type Props = {
  onSubmit?: () => void;
};

export default function FormApply({ onSubmit }: Props) {
  const { t } = useTranslation();
  const { control } = useForm();
  const { field: fullNameField, fieldState: fullNameFieldState } =
    useController({
      name: 'fullName',
      control,
      rules: {
        required: t('fullName.required') as string,
      },
    });
  const { field: dobField, fieldState: dobFieldState } = useController({
    name: 'dob',
    control,
    rules: {
      required: t('dob.required') as string,
    },
  });
  const { field: occupationField, fieldState: occupationFieldState } =
    useController({
      name: 'occupation',
      control,
      rules: {
        required: t('occupation.required') as string,
      },
    });
  const { field: movingDateField, fieldState: movingDateFieldState } =
    useController({
      name: 'movingDate',
      control,
      rules: {
        required: t('movingDate.required') as string,
      },
    });
  const onContinue = () => {
    // TODO: this should be continue action

    onSubmit?.();
  };

  return (
    <View style={styles.form}>
      <View>
        <View style={{ borderRadius: Token.border.radius.default }}>
          <Image src={avatar} width={240} height={240} alt="avatar" />
        </View>
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
            {t('dob')}
          </Text>
          <CalendarInput
            {...dobField}
            placeholder={t('dob')}
            error={Boolean(dobFieldState.error)}
            errorMessageId={dobFieldState.error?.message}
          />
          {Boolean(dobFieldState.error) && (
            <ErrorMessage
              text={dobFieldState.error?.message!}
              errorMessageId={dobFieldState.error?.message}
            />
          )}
        </View>
        <View style={styles.formGroup}>
          <Text variant="tiny" style={styles.label}>
            {t('occupation')}
          </Text>
          <Input
            {...occupationField}
            placeholder={t('occupation')}
            error={Boolean(occupationFieldState.error)}
            errorMessageId={occupationFieldState.error?.message}
          />
          {Boolean(occupationFieldState.error) && (
            <ErrorMessage
              text={occupationFieldState.error?.message!}
              errorMessageId={occupationFieldState.error?.message}
            />
          )}
        </View>
        <View style={styles.formGroup}>
          <Text variant="tiny" style={styles.label}>
            {t('movingDate')}
          </Text>
          <CalendarInput
            {...movingDateField}
            placeholder={t('movingDate')}
            error={Boolean(movingDateFieldState.error)}
            errorMessageId={movingDateFieldState.error?.message}
          />
          {Boolean(movingDateFieldState.error) && (
            <ErrorMessage
              text={movingDateFieldState.error?.message!}
              errorMessageId={movingDateFieldState.error?.message}
            />
          )}
        </View>
        <View style={styles.actions}>
          <Button variant="secondary" text={t('edit')} />
          <Button text={t('continueApply')} onPress={onContinue} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginVertical: Token.spacing.xxl,
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
  actions: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: Token.spacing.ml,
  },
});
