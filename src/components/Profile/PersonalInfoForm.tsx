import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useForm, useController } from 'react-hook-form';
import { Token } from 'core';
import {
  Text,
  Input,
  CalendarInput,
  SelectInput,
  FileInput,
  ErrorMessage,
} from 'core/base';

export default function PersonalInfoForm() {
  const { t } = useTranslation();
  const { control } = useForm();
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
    rules: {
      required: t('dob.required') as string,
    },
  });
  const { field: phoneNumberField, fieldState: phoneNumberFieldState } =
    useController({
      name: 'phoneNumber',
      control,
      rules: {
        required: t('phoneNumber.required') as string,
      },
    });
  const { field: annualIncomeField, fieldState: annualIncomeFieldState } =
    useController({
      name: 'annualIncome',
      control,
      rules: {
        required: t('annualIncome.required') as string,
      },
    });
  const { field: creditScoreField, fieldState: creditScoreFieldState } =
    useController({
      name: 'creditScore',
      control,
      rules: {
        required: t('creditScore.required') as string,
      },
    });
  const { field: govermentIdField, fieldState: govermentIdFieldState } =
    useController({
      name: 'govermentId',
      control,
      rules: {
        required: t('govermentId.required') as string,
      },
    });
  const { field: otherDocumentField, fieldState: otherDocumentFieldState } =
    useController({
      name: 'otherDocument',
      control,
      rules: {
        required: t('otherDocument.required') as string,
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
          variant="primary"
          placeholder={t('gender')}
          error={Boolean(genderFieldState.error)}
          errorMessageId={genderFieldState.error?.message}
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
        <Text variant="tiny" style={styles.label}>
          {t('govermentId')}
        </Text>
        <FileInput
          {...govermentIdField}
          placeholder={t('govermentId')}
          error={Boolean(govermentIdFieldState.error)}
          errorMessageId={govermentIdFieldState.error?.message}
        />
        {Boolean(govermentIdFieldState.error) && (
          <ErrorMessage
            text={govermentIdFieldState.error?.message!}
            errorMessageId={govermentIdFieldState.error?.message}
          />
        )}
      </View>
      <View style={styles.formGroup}>
        <Text variant="tiny" style={styles.label}>
          {t('otherDocument')}
        </Text>
        <Input
          {...otherDocumentField}
          placeholder={t('otherDocument')}
          error={Boolean(otherDocumentFieldState.error)}
          errorMessageId={otherDocumentFieldState.error?.message}
        />
        {Boolean(otherDocumentFieldState.error) && (
          <ErrorMessage
            text={otherDocumentFieldState.error?.message!}
            errorMessageId={otherDocumentFieldState.error?.message}
          />
        )}
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
  textArea: {
    borderRadius: Token.border.radius.default,
    minHeight: 170,
    alignItems: 'flex-start',
  },
});
