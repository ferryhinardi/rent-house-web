import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { Token } from 'core';
import { Text, Button, Input, ErrorMessage } from 'core/base';

export default function PersonalInfoForm() {
  const { t } = useTranslation();
  const { control } = useForm();

  return (
    <View style={styles.formContainer}>
      <Controller
        name="name"
        control={control}
        rules={{
          required: t('legalName.required') as string,
        }}
        render={({ field, fieldState }) => (
          <View style={styles.formGroup}>
            <Text variant="tiny" style={styles.label}>
              {t('legalName')}
            </Text>
            <Input
              {...field}
              placeholder={t('legalName')}
              textContentType="name"
              error={Boolean(fieldState.error)}
              errorMessageId={fieldState.error?.message}
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
        name="gender"
        control={control}
        rules={{
          required: t('gender.required') as string,
        }}
        render={({ field, fieldState }) => (
          <View style={styles.formGroup}>
            <Text variant="tiny" style={styles.label}>
              {t('gender')}
            </Text>
            <Input
              {...field}
              placeholder={t('gender')}
              textContentType="name"
              error={Boolean(fieldState.error)}
              errorMessageId={fieldState.error?.message}
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
        name="dob"
        control={control}
        rules={{
          required: t('dob.required') as string,
        }}
        render={({ field, fieldState }) => (
          <View style={styles.formGroup}>
            <Text variant="tiny" style={styles.label}>
              {t('dob')}
            </Text>
            <Input
              {...field}
              placeholder={t('dob')}
              textContentType="name"
              error={Boolean(fieldState.error)}
              errorMessageId={fieldState.error?.message}
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
        name="phoneNumber"
        control={control}
        rules={{
          required: t('phoneNumber.required') as string,
        }}
        render={({ field, fieldState }) => (
          <View style={styles.formGroup}>
            <Text variant="tiny" style={styles.label}>
              {t('phoneNumber')}
            </Text>
            <Input
              {...field}
              placeholder={t('phoneNumber')}
              textContentType="name"
              error={Boolean(fieldState.error)}
              errorMessageId={fieldState.error?.message}
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
        name="annualIncome"
        control={control}
        rules={{
          required: t('annualIncome.required') as string,
        }}
        render={({ field, fieldState }) => (
          <View style={styles.formGroup}>
            <Text variant="tiny" style={styles.label}>
              {t('annualIncome')}
            </Text>
            <Input
              {...field}
              placeholder={t('annualIncome')}
              textContentType="name"
              error={Boolean(fieldState.error)}
              errorMessageId={fieldState.error?.message}
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
        name="creditScore"
        control={control}
        rules={{
          required: t('creditScore.required') as string,
        }}
        render={({ field, fieldState }) => (
          <View style={styles.formGroup}>
            <Text variant="tiny" style={styles.label}>
              {t('creditScore')}
            </Text>
            <Input
              {...field}
              placeholder={t('creditScore')}
              textContentType="name"
              error={Boolean(fieldState.error)}
              errorMessageId={fieldState.error?.message}
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
        name="govermentId"
        control={control}
        rules={{
          required: t('govermentId.required') as string,
        }}
        render={({ field, fieldState }) => (
          <View style={styles.formGroup}>
            <Text variant="tiny" style={styles.label}>
              {t('govermentId')}
            </Text>
            <Input
              {...field}
              placeholder={t('govermentId')}
              textContentType="name"
              error={Boolean(fieldState.error)}
              errorMessageId={fieldState.error?.message}
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
        name="otherDocument"
        control={control}
        rules={{
          required: t('otherDocument.required') as string,
        }}
        render={({ field, fieldState }) => (
          <View style={styles.formGroup}>
            <Text variant="tiny" style={styles.label}>
              {t('otherDocument')}
            </Text>
            <Input
              {...field}
              placeholder={t('otherDocument')}
              textContentType="name"
              error={Boolean(fieldState.error)}
              errorMessageId={fieldState.error?.message}
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
        name="address"
        control={control}
        rules={{
          required: t('address.required') as string,
        }}
        render={({ field, fieldState }) => (
          <View style={styles.formGroup}>
            <Text variant="tiny" style={styles.label}>
              {t('address')}
            </Text>
            <Input
              {...field}
              variant="text-area"
              multiline
              placeholder={t('address')}
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
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xxl,
    marginTop: Token.spacing.xxl,
  },
  formGroup: {
    width: '48%',
  },
  label: {
    marginBottom: Token.spacing.xs,
  },
  textArea: {
    borderRadius: Token.border.radius.default,
    minHeight: 170,
    alignItems: 'flex-start',
  },
});
