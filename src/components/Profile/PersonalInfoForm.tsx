import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useController, useFormContext, useWatch } from 'react-hook-form';
import { Token } from 'core';
import { genderOptions, proofIncomeOptions } from 'core/constants';
import { Text, Input, CalendarInput, SelectInput, ErrorMessage, FileUploader } from 'core/base';

export default function PersonalInfoForm() {
  const { register, control, setValue, formState } = useFormContext();
  const { t } = useTranslation();
  const handleUpload = (field: string) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setValue(field, e.target.files);
  };
  const { field: legalNameField, fieldState: legalNameFieldState } = useController({
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
  const { field: phoneNumberField, fieldState: phoneNumberFieldState } = useController({
    name: 'phone',
    control,
    rules: {
      required: t('phoneNumber.required') as string,
    },
  });
  const { field: annualIncomeField, fieldState: annualIncomeFieldState } = useController({
    name: 'annual_income',
    control,
    rules: {
      required: t('annualIncome.required') as string,
    },
  });
  const { field: creditScoreField, fieldState: creditScoreFieldState } = useController({
    name: 'credit_score',
    control,
    rules: {
      required: t('creditScore.required') as string,
    },
  });
  const { field: socialMediaField, fieldState: socialMediaFieldState } = useController({
    name: 'social_media_url',
    control,
    rules: {
      required: t('socialMedia.required') as string,
    },
  });
  const { field: proofIncomeField, fieldState: proofIncomeFieldState } = useController({
    name: 'proof_of_income_type',
    control,
    rules: {
      required: t('proofIncome.required') as string,
    },
  });
  const { field: addressField, fieldState: addressFieldState } = useController({
    name: 'address',
    control,
    rules: {
      required: t('address.required') as string,
    },
  });
  let proofOfIncomeValue = useWatch({ name: 'proof_of_income_type', control });

  if (typeof proofOfIncomeValue === 'object' && 'value' in proofOfIncomeValue) {
    proofOfIncomeValue = proofOfIncomeValue.value;
  }

  function renderGuarantor(optionId: number) {
    switch (optionId) {
      case 0: // Paystub Section
        return (
          <View style={styles.formGroup}>
            <View style={styles.wrapperImageUploader}>
              <Text variant="tiny" style={styles.label}>
                {t('guarantorPaystubs')}
              </Text>
              {Boolean(formState.errors['guarantor_paystubs']) && (
                <ErrorMessage
                  text={formState.errors['guarantor_paystubs']?.message}
                  errorMessageId={formState.errors['guarantor_paystubs']?.message}
                />
              )}
            </View>
            <FileUploader
              {...register('guarantor_paystubs')}
              variant="input"
              actionLabel={t('guarantorPaystubs')}
              onChange={handleUpload('guarantor_paystubs')}
            />
          </View>
        );
      case 1: // Guarantor Section
        return (
          <React.Fragment>
            <View style={styles.formGroup}>
              <View style={styles.wrapperImageUploader}>
                <Text variant="tiny" style={styles.label}>
                  {t('guarantorGovermentId')}
                </Text>
                {Boolean(formState.errors['guarantor_government_id']) && (
                  <ErrorMessage
                    text={formState.errors['guarantor_government_id']?.message}
                    errorMessageId={formState.errors['guarantor_government_id']?.message}
                  />
                )}
              </View>
              <FileUploader
                {...register('guarantor_government_id')}
                variant="input"
                actionLabel={t('guarantorGovermentId')}
                onChange={handleUpload('guarantor_government_id')}
              />
            </View>

            <View style={styles.formGroup}>
              <View style={styles.wrapperImageUploader}>
                <Text variant="tiny" style={styles.label}>
                  {t('guarantorCreditReport')}
                </Text>
                {Boolean(formState.errors['guarantor_credit_report']) && (
                  <ErrorMessage
                    text={formState.errors['guarantor_credit_report']?.message}
                    errorMessageId={formState.errors['guarantor_credit_report']?.message}
                  />
                )}
              </View>
              <FileUploader
                {...register('guarantor_credit_report')}
                variant="input"
                actionLabel={t('guarantorCreditReport')}
                onChange={handleUpload('guarantor_credit_report')}
              />
            </View>
          </React.Fragment>
        );
      default:
        return null;
    }
  }

  return (
    <React.Fragment>
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
            <ErrorMessage text={genderFieldState.error?.message!} errorMessageId={genderFieldState.error?.message} />
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
            <ErrorMessage text={dobFieldState.error?.message!} errorMessageId={dobFieldState.error?.message} />
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
            <Text variant="tiny" style={styles.label}>
              {t('govermentId')}
            </Text>
            {Boolean(formState.errors['government_id']) && (
              <ErrorMessage
                text={formState.errors['government_id']?.message}
                errorMessageId={formState.errors['government_id']?.message}
              />
            )}
          </View>
          <FileUploader
            {...register('government_id')}
            variant="input"
            actionLabel={t('govermentId')}
            onChange={handleUpload('government_id')}
          />
        </View>
        <View style={styles.formGroup}>
          <View style={styles.wrapperImageUploader}>
            <Text variant="tiny" style={styles.label}>
              {t('creditReport')}
            </Text>
            {Boolean(formState.errors['credit_report']) && (
              <ErrorMessage
                text={formState.errors['credit_report']?.message}
                errorMessageId={formState.errors['credit_report']?.message}
              />
            )}
          </View>
          <FileUploader
            {...register('credit_report')}
            variant="input"
            actionLabel={t('creditReport')}
            onChange={handleUpload('credit_report')}
          />
        </View>
        <View style={styles.formGroup}>
          <Text variant="tiny" style={styles.label}>
            {t('socialMedia')}
          </Text>
          <Input
            {...socialMediaField}
            placeholder={t('socialMedia')}
            textContentType="name"
            error={Boolean(socialMediaFieldState.error)}
            errorMessageId={socialMediaFieldState.error?.message}
          />
          {Boolean(socialMediaFieldState.error) && (
            <ErrorMessage
              text={socialMediaFieldState.error?.message!}
              errorMessageId={socialMediaFieldState.error?.message}
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
            <ErrorMessage text={addressFieldState.error?.message!} errorMessageId={addressFieldState.error?.message} />
          )}
        </View>
      </View>
      <View style={[styles.formGroup, { zIndex: 1 }]}>
        <Text variant="tiny" style={styles.label}>
          {t('proofIncome')}
        </Text>
        <SelectInput
          {...proofIncomeField}
          value={proofIncomeOptions.find((x) => x.value === proofIncomeField.value)}
          instanceId="proofIncome"
          variant="primary"
          placeholder={t('proofIncome')}
          error={Boolean(proofIncomeFieldState.error)}
          errorMessageId={proofIncomeFieldState.error?.message}
          options={proofIncomeOptions}
        />
        {Boolean(proofIncomeFieldState.error) && (
          <ErrorMessage
            text={proofIncomeFieldState.error?.message!}
            errorMessageId={proofIncomeFieldState.error?.message}
          />
        )}
      </View>

      {Boolean(renderGuarantor(proofOfIncomeValue)) ? (
        <React.Fragment>
          <View style={styles.separator} />
          <Text variant="header-3">{t('Guarantor')}</Text>
          <View style={styles.formContainer}>{renderGuarantor(proofOfIncomeValue)}</View>
        </React.Fragment>
      ) : null}
    </React.Fragment>
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
    flexGrow: 0,
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
  separator: {
    marginVertical: Token.spacing.xxl,
    borderBottomWidth: 4,
    borderBottomColor: Token.colors.rynaGray,
  },
});
