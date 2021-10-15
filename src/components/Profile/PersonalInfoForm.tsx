import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useController, useFormContext } from 'react-hook-form';
import { Token } from 'core';
import { genderOptions } from 'core/constants';
import {
  Text,
  Input,
  CalendarInput,
  SelectInput,
  ErrorMessage,
  ImageUploader,
} from 'core/base';

export default function PersonalInfoForm() {
  const { register, control, setValue, formState } = useFormContext();
  const { t } = useTranslation();
  const handleGovUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setValue('government_id', e.target.files);
  };
  const { field: legalNameField, fieldState: legalNameFieldState } =
    useController({
      name: 'name',
      control,
      rules: {
        required: t('legalName.required') as string,
      },
    });
  const { field: genderField, fieldState: genderFieldState } = useController({
    name: 'gender',
    control,
    rules: {
      required: t('gender.required') as string,
    },
  });
  const { field: dobField, fieldState: dobFieldState } = useController({
    name: 'dob',
    control,
  });
  const { field: phoneNumberField, fieldState: phoneNumberFieldState } =
    useController({
      name: 'phone',
      control,
      rules: {
        required: t('phoneNumber.required') as string,
      },
    });
  const { field: annualIncomeField, fieldState: annualIncomeFieldState } =
    useController({
      name: 'annual_income',
      control,
      rules: {
        required: t('annualIncome.required') as string,
      },
    });
  const { field: creditScoreField, fieldState: creditScoreFieldState } =
    useController({
      name: 'credit_score',
      control,
      rules: {
        required: t('creditScore.required') as string,
      },
    });
  const { field: addressField, fieldState: addressFieldState } = useController({
    name: 'address',
    control,
    rules: {
      required: t('address.required') as string,
    },
  });

  return (
    <View style={styles.formContainer}>
      <View style={styles.formGroup}>
        <Text variant="tiny" style={styles.label}>
          {t('legalName')}
        </Text>
        <Input
          {...legalNameField}
          placeholder={t('legalName')}
          textContentType="name"
          error={Boolean(legalNameFieldState.error)}
          errorMessageId={legalNameFieldState.error?.message}
        />
        {Boolean(legalNameFieldState.error) && (
          <ErrorMessage
            text={legalNameFieldState.error?.message!}
            errorMessageId={legalNameFieldState.error?.message}
          />
        )}
      </View>
      <View style={[styles.formGroup, { zIndex: 1 }]}>
        <Text variant="tiny" style={styles.label}>
          {t('gender')}
        </Text>
        <SelectInput
          {...genderField}
          value={genderOptions.find((x) => x.value === genderField.value)}
          instanceId="gender"
          variant="primary"
          placeholder={t('gender')}
          error={Boolean(genderFieldState.error)}
          errorMessageId={genderFieldState.error?.message}
          options={genderOptions}
        />
        {Boolean(genderFieldState.error) && (
          <ErrorMessage
            text={genderFieldState.error?.message!}
            errorMessageId={genderFieldState.error?.message}
          />
        )}
      </View>
      <View style={[styles.formGroup, { zIndex: 1 }]}>
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
          {t('phoneNumber')}
        </Text>
        <Input
          {...phoneNumberField}
          keyboardType="numeric"
          textContentType="telephoneNumber"
          placeholder={t('phoneNumber')}
          error={Boolean(phoneNumberFieldState.error)}
          errorMessageId={phoneNumberFieldState.error?.message}
        />
        {Boolean(phoneNumberFieldState.error) && (
          <ErrorMessage
            text={phoneNumberFieldState.error?.message!}
            errorMessageId={phoneNumberFieldState.error?.message}
          />
        )}
      </View>
      <View style={styles.formGroup}>
        <Text variant="tiny" style={styles.label}>
          {t('annualIncome')}
        </Text>
        <Input
          {...annualIncomeField}
          value={annualIncomeField.value.toString()}
          placeholder={t('annualIncome')}
          keyboardType="numeric"
          error={Boolean(annualIncomeFieldState.error)}
          errorMessageId={annualIncomeFieldState.error?.message}
        />
        {Boolean(annualIncomeFieldState.error) && (
          <ErrorMessage
            text={annualIncomeFieldState.error?.message!}
            errorMessageId={annualIncomeFieldState.error?.message}
          />
        )}
      </View>
      <View style={styles.formGroup}>
        <Text variant="tiny" style={styles.label}>
          {t('creditScore')}
        </Text>
        <Input
          {...creditScoreField}
          value={creditScoreField.value.toString()}
          placeholder={t('creditScore')}
          error={Boolean(creditScoreFieldState.error)}
          errorMessageId={creditScoreFieldState.error?.message}
        />
        {Boolean(creditScoreFieldState.error) && (
          <ErrorMessage
            text={creditScoreFieldState.error?.message!}
            errorMessageId={creditScoreFieldState.error?.message}
          />
        )}
      </View>
      <View style={styles.formGroup}>
        <View style={styles.wrapperImageUploader}>
          <Text variant="tiny">{t('govermentId')}</Text>
          {Boolean(formState.errors['government_id']) && (
            <ErrorMessage
              text={formState.errors['government_id']?.message}
              errorMessageId={formState.errors['government_id']?.message}
            />
          )}
        </View>
        <ImageUploader
          {...register('government_id')}
          actionLabel={t('reuploadButton')}
          onChange={handleGovUpload}
        />
      </View>
      <View style={styles.formGroup}>
        <Text variant="tiny" style={styles.label}>
          {t('address')}
        </Text>
        <Input
          {...addressField}
          variant="text-area"
          multiline
          placeholder={t('address')}
          textContentType="addressState"
          error={Boolean(addressFieldState.error)}
          errorMessageId={addressFieldState.error?.message}
          containerStyle={styles.textArea}
        />
        {Boolean(addressFieldState.error) && (
          <ErrorMessage
            text={addressFieldState.error?.message!}
            errorMessageId={addressFieldState.error?.message}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xxl,
    marginTop: Token.spacing.xxl,
  },
  formGroup: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '48%',
  },
  label: {
    marginBottom: Token.spacing.xs,
  },
  wrapperImageUploader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Token.spacing.m,
  },
  textArea: {
    borderRadius: Token.border.radius.default,
    minHeight: 170,
    alignItems: 'flex-start',
  },
});
