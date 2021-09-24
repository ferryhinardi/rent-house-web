import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useForm, useController } from 'react-hook-form';
import { Token, fetcher } from 'core';
import { User, UserDocument, ErrorHandling } from 'types';
import { genderOptions } from 'core/constants';
import { useMutation } from 'react-query';
import {
  Text,
  Input,
  CalendarInput,
  SelectInput,
  ErrorMessage,
  Button,
  ImageUploader,
} from 'core/base';
import { OnSelectedDateCallback } from 'core/base/Calendar';

type Gender = { label: string; value: number };
type Payload = {
  name: string;
  phone: string;
  address: string;
  job: string;
  annual_income: number;
  credit_score: number;
  dob: string;
  government_id: FileList;
  gender: Gender;
};
type Props = User & {
  government_id?: FileList;
  dob?: string;
};

export default function PersonalInfoForm(props: Props) {
  const { t } = useTranslation();
  const { control, register, setValue, handleSubmit } = useForm({
    defaultValues: props,
  });
  const { isLoading, isError, error, mutate } = useMutation<
    User,
    ErrorHandling,
    Payload
  >(
    async (payload) => {
      const userDocData = new FormData();
      userDocData.set('document_type', '0');
      userDocData.set('document_files', payload.government_id[0]);
      await fetcher<UserDocument>({
        method: 'POST',
        url: `/user/user-document/`,
        data: userDocData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const bodyFormData = new FormData();
      bodyFormData.set('name', payload.name);
      bodyFormData.set('phone', payload.phone);
      bodyFormData.set('dob', payload.dob);
      bodyFormData.set('address', payload.address);
      bodyFormData.set('bio', props.bio ?? '');
      bodyFormData.set('gender', payload.gender.value.toString());
      bodyFormData.set('job', payload.job);
      bodyFormData.set('annual_income', payload.annual_income.toString());
      bodyFormData.set('credit_score', payload.credit_score.toString());
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

  const handleGovUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setValue('government_id', e.target.files);
  };

  const onSelectedDateCallback: OnSelectedDateCallback = (value: string) => {
    setValue('dob', value);
  };

  const onSubmit = (formData: Payload) => {
    mutate(formData);
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
          onSelectedDateCallback={onSelectedDateCallback}
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
        <Text variant="tiny" style={styles.label}>
          {t('govermentId')}
        </Text>
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
      <Button
        loading={isLoading}
        text={t('saveForm')}
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}
      />
      {isError && <ErrorMessage text={error?.message as string} />}
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
  submitButton: {
    marginTop: Token.spacing.m,
    paddingVertical: Token.spacing.m,
    borderRadius: 0,
    alignItems: 'center',
  },
});
