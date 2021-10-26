import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useController, useFormContext } from 'react-hook-form';
import { Token } from 'core';
import { CalendarInput, ErrorMessage, FileUploader, Input, SelectInput, Text } from 'core/base';
import { genderOptions, MAX_FILE_SIZE, proofIncomeOptions, QUERY_KEYS } from 'core/constants';
import { getDocumentFile } from 'utils/getUserDocument';
import { Option, UserDocument } from 'types';

export default function PersonalInfoForm() {
  const { register, control, setValue, getValues, setError, clearErrors, formState } = useFormContext();
  const { data: userDocumentData } = useQuery<UserDocument[]>([QUERY_KEYS.DOCUMENT, getValues('id')]);
  const { t } = useTranslation();
  const handleUpload = (field: string) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setValue(field, e.target.files);
  };
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
  const validateFileSize = (fieldName: string) => (error: { status: string; message?: string }) => {
    if (error.status === 'LIMIT_SIZE') {
      setError(fieldName, {
        type: 'validate',
        message: t(`${fieldName}.maxFileSize`, { maxFileSize: `${(MAX_FILE_SIZE / 1048576).toFixed(2)} MB` }),
      });
    }
  };
  function onChangeProofOfIncome(proofOfIncome: Option) {
    if (proofOfIncome.value === 0) {
      setValue('guarantor_government_id', undefined);
      setValue('guarantor_credit_report', undefined);
      setValue('guarantor_paystubs', undefined);
    } else if (proofOfIncome.value === 1) {
      setValue('paystubs', undefined);
    }
    proofIncomeField.onChange(proofOfIncome.value);
  }

  function renderGuarantor(optionId: number) {
    switch (optionId) {
      case 0: // Paystub Section
        return (
          <View style={styles.formGroup}>
            <View style={styles.wrapperImageUploader}>
              <Text variant="small" style={styles.label}>
                {t('paystubs')}
              </Text>
              {Boolean(formState.errors['paystubs']) && (
                <ErrorMessage
                  text={formState.errors['paystubs']?.message}
                  errorMessageId={formState.errors['paystubs']?.message}
                  containerStyle={{ marginBottom: Token.spacing.xs }}
                />
              )}
            </View>
            <FileUploader
              {...register('paystubs', {
                required: t('paystubs.required') as string,
              })}
              value={getDocumentFile(5, userDocumentData)}
              variant="input"
              actionLabel={t('paystubs')}
              onChange={handleUpload('paystubs')}
              maxFileSize={MAX_FILE_SIZE}
              onFileChange={() => clearErrors('paystubs')}
              onError={validateFileSize('paystubs')}
            />
          </View>
        );
      case 1: // Guarantor Section
        return (
          <React.Fragment>
            <View style={styles.formGroup}>
              <View style={styles.wrapperImageUploader}>
                <Text variant="small" style={styles.label}>
                  {t('guarantorGovermentId')}
                </Text>
                {Boolean(formState.errors['guarantor_government_id']) && (
                  <ErrorMessage
                    text={formState.errors['guarantor_government_id']?.message}
                    errorMessageId={formState.errors['guarantor_government_id']?.message}
                    containerStyle={{ marginBottom: Token.spacing.xs }}
                  />
                )}
              </View>
              <FileUploader
                {...register('guarantor_government_id', {
                  required: t('guarantor_government_id.required') as string,
                })}
                value={getDocumentFile(0, userDocumentData)}
                variant="input"
                actionLabel={t('guarantorGovermentId')}
                onChange={handleUpload('guarantor_government_id')}
                maxFileSize={MAX_FILE_SIZE}
                onFileChange={() => clearErrors('guarantor_government_id')}
                onError={validateFileSize('guarantor_government_id')}
              />
            </View>

            <View style={styles.formGroup}>
              <View style={styles.wrapperImageUploader}>
                <Text variant="small" style={styles.label}>
                  {t('guarantorCreditReport')}
                </Text>
                {Boolean(formState.errors['guarantor_credit_report']) && (
                  <ErrorMessage
                    text={formState.errors['guarantor_credit_report']?.message}
                    errorMessageId={formState.errors['guarantor_credit_report']?.message}
                    containerStyle={{ marginBottom: Token.spacing.xs }}
                  />
                )}
              </View>
              <FileUploader
                {...register('guarantor_credit_report', {
                  required: t('guarantor_credit_report.required') as string,
                })}
                value={getDocumentFile(1, userDocumentData)}
                variant="input"
                actionLabel={t('guarantorCreditReport')}
                onChange={handleUpload('guarantor_credit_report')}
                maxFileSize={MAX_FILE_SIZE}
                onFileChange={() => clearErrors('guarantor_credit_report')}
                onError={validateFileSize('guarantor_credit_report')}
              />
            </View>
            <View style={styles.formGroup}>
              <View style={styles.wrapperImageUploader}>
                <Text variant="small" style={styles.label}>
                  {t('guarantorPaystubs')}
                </Text>
                {Boolean(formState.errors['guarantor_paystubs']) && (
                  <ErrorMessage
                    text={formState.errors['guarantor_paystubs']?.message}
                    errorMessageId={formState.errors['guarantor_paystubs']?.message}
                    containerStyle={{ marginBottom: Token.spacing.xs }}
                  />
                )}
              </View>
              <FileUploader
                {...register('guarantor_paystubs', {
                  required: t('guarantor_paystubs.required') as string,
                })}
                value={getDocumentFile(2, userDocumentData)}
                variant="input"
                actionLabel={t('guarantorPaystubs')}
                onChange={handleUpload('guarantor_paystubs')}
                maxFileSize={MAX_FILE_SIZE}
                onFileChange={() => clearErrors('guarantor_paystubs')}
                onError={validateFileSize('guarantor_paystubs')}
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
        <View style={[styles.formGroup, { zIndex: 1 }]}>
          <Text variant="small" style={styles.label}>
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
        <View style={styles.formGroup}>
          <Text variant="small" style={styles.label}>
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
        <View style={[styles.formGroup, { zIndex: 1 }]}>
          <Text variant="small" style={styles.label}>
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
          <Text variant="small" style={styles.label}>
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
          <Text variant="small" style={styles.label}>
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
          <View style={styles.wrapperImageUploader}>
            <Text variant="small" style={styles.label}>
              {t('govermentId')}
            </Text>
            {Boolean(formState.errors['government_id']) && (
              <ErrorMessage
                text={formState.errors['government_id']?.message}
                errorMessageId={formState.errors['government_id']?.message}
                containerStyle={{ marginBottom: Token.spacing.xs }}
              />
            )}
          </View>
          <FileUploader
            {...register('government_id', {
              required: t('government_id.required') as string,
            })}
            value={getDocumentFile(3, userDocumentData)}
            variant="input"
            actionLabel={t('govermentId')}
            onChange={handleUpload('government_id')}
            maxFileSize={MAX_FILE_SIZE}
            onFileChange={() => clearErrors('government_id')}
            onError={validateFileSize('government_id')}
          />
        </View>
        <View style={styles.formGroup}>
          <View style={styles.wrapperImageUploader}>
            <Text variant="small" style={styles.label}>
              {t('creditReport')}
            </Text>
            {Boolean(formState.errors['credit_report']) && (
              <ErrorMessage
                text={formState.errors['credit_report']?.message}
                errorMessageId={formState.errors['credit_report']?.message}
                containerStyle={{ marginBottom: Token.spacing.xs }}
              />
            )}
          </View>
          <FileUploader
            {...register('credit_report', {
              required: t('credit_report.required') as string,
            })}
            value={getDocumentFile(4, userDocumentData)}
            variant="input"
            actionLabel={t('creditReport')}
            onChange={handleUpload('credit_report')}
            maxFileSize={MAX_FILE_SIZE}
            onFileChange={() => clearErrors('credit_report')}
            onError={validateFileSize('credit_report')}
          />
        </View>
        <View style={styles.formGroup}>
          <Text variant="small" style={styles.label}>
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
        <View style={[styles.formGroup, { zIndex: 1 }]}>
          <Text variant="small" style={styles.label}>
            {t('proofIncome')}
          </Text>
          <SelectInput
            {...proofIncomeField}
            onChange={onChangeProofOfIncome as any}
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
      </View>

      {Boolean(renderGuarantor(proofIncomeField.value)) ? (
        <React.Fragment>
          <View style={styles.separator} />
          <Text variant="header-3">{proofIncomeField.value === 0 ? t('proofIncome') : t('Guarantor')}</Text>
          <View style={styles.formContainer}>{renderGuarantor(proofIncomeField.value)}</View>
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
  separator: {
    marginVertical: Token.spacing.xxl,
    borderBottomWidth: 4,
    borderBottomColor: Token.colors.rynaGray,
  },
});
