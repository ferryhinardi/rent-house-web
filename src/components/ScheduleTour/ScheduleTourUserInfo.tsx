import React from 'react';
import { View, StyleSheet } from 'react-native';
import Image from 'next/image';

import { useTranslation } from 'react-i18next';
import NoSSR from 'react-no-ssr';
import { useFormContext, useController } from 'react-hook-form';
import { Text, Input, ErrorMessage, SelectInput, Button } from 'core/base';
import { Token } from 'core';
import useTailwind from 'hooks/useTailwind';
import { approximateIncomeOptions, genderOptions, vaccineStatusOptions } from 'core/constants';
import Swiper from 'components/Swiper';
import { House } from 'types';
import config from 'config';
import Link from 'next/link';

type Props = {
  onSubmit?: () => void;
  house?: House;
};

export default function ScheduleTourDetail(props: Props) {
  const { t } = useTranslation();
  const { tailwindResponsive, md } = useTailwind();
  const { control } = useFormContext();

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
  const { field: genderField, fieldState: genderFieldState } = useController({
    name: 'gender',
    control,
    rules: {
      required: t('gender.required') as string,
    },
  });
  const { field: phoneNumberField, fieldState: phoneNumberFieldState } = useController({
    name: 'phone',
    control,
    rules: {
      required: t('phoneNumber.required') as string,
    },
  });
  const { field: approximateIncomeInputField, fieldState: approximateIncomeInputFieldState } = useController({
    name: 'approximate_income',
    control,
    rules: {
      required: t('approximateIncome.required') as string,
    },
  });

  const { field: creditScoreField, fieldState: creditScoreFieldState } = useController({
    name: 'credit_score',
    control,
    rules: {
      required: t('creditScore.required') as string,
    },
  });

  const { field: vaccineStatusInputField, fieldState: vaccineStatusInputFieldState } = useController({
    name: 'vaccine_status',
    control,
    rules: {
      required: t('vaccineStatus.required') as string,
    },
  });

  return (
    <NoSSR>
      <View style={tailwindResponsive('flex-row flex-wrap flex-gap-10 mt-10', { md: 'flex-col' }, { md })}>
        <View>
          <Swiper
            innerContainerStyle={[tailwindResponsive('w-1/4-screen', { md: 'w-full' }, { md }), { minHeight: '300px' }]}
            minDistanceForAction={0.1}
            controlsProps={{
              dotsTouchable: true,
              prevPos: 'left',
              nextPos: 'right',
              // eslint-disable-next-line
              NextComponent: ({ onPress }) => (
                <Button
                  IconStart="chevron-right"
                  onPress={onPress}
                  variant="outline"
                  elevation
                  borderColor={Token.colors.white}
                  style={{
                    minWidth: 0,
                    width: 16,
                    height: 16,
                    paddingHorizontal: Token.spacing.m,
                  }}
                />
              ),
              // eslint-disable-next-line
              PrevComponent: ({ onPress }) => (
                <Button
                  IconStart="chevron-left"
                  onPress={onPress}
                  variant="outline"
                  elevation
                  borderColor={Token.colors.white}
                  style={{
                    minWidth: 0,
                    width: 16,
                    height: 16,
                    paddingHorizontal: Token.spacing.m,
                  }}
                />
              ),
            }}>
            {props.house?.galleries.map((galery, idx) => (
              <Image
                key={`${galery}-${idx}`}
                src={`${config.imageHost}/${galery}`}
                blurDataURL={`${config.imageHost}/${galery}`}
                className="image-galery"
                placeholder="blur"
                loading="lazy"
                width={360}
                height={360}
                layout="responsive"
                objectFit="cover"
                alt="home-recommendation"
              />
            ))}
          </Swiper>
          <View style={tailwindResponsive('flex-row flex-wrap flex-gap-5 ', { md: 'flex-col' }, { md })}>
            <Text style={styles.formGroupHalfWidth}>
              {props.house?.name}, {props.house?.city}
            </Text>
            <Link href={'/account/home-recommendation/' + props.house?.id.toString()} passHref>
              <Text accessibilityRole="link" ink="primary">
                View listing
              </Text>
            </Link>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.formGroupHalfWidth}>
            <Text variant="small" style={styles.label}>
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
          <View style={[styles.formGroupHalfWidth, { zIndex: 3 }]}>
            <Text variant="small" style={styles.label}>
              {t('gender')}
            </Text>
            <SelectInput
              {...genderField}
              value={genderField.value}
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

          <View style={styles.formGroupHalfWidth}>
            <Text variant="small" style={styles.label}>
              {t('jobTitle')}
            </Text>
            <Input
              {...jobField}
              placeholder={t('jobTitle')}
              error={Boolean(jobFieldState.error)}
              errorMessageId={jobFieldState.error?.message}
              containerStyle={styles.input}
            />
            {Boolean(jobFieldState.error) && (
              <ErrorMessage text={jobFieldState.error?.message!} errorMessageId={jobFieldState.error?.message} />
            )}
          </View>
          <View style={styles.formGroupHalfWidth}>
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
          <View style={[styles.formGroupHalfWidth, { zIndex: 4 }]}>
            <Text variant="small" style={styles.label}>
              {t('approximateIncome')}
            </Text>
            <SelectInput
              {...approximateIncomeInputField}
              value={approximateIncomeInputField.value}
              instanceId="approximateIncome"
              variant="primary"
              error={Boolean(approximateIncomeInputFieldState.error)}
              errorMessageId={approximateIncomeInputFieldState.error?.message}
              options={approximateIncomeOptions}
            />
            {Boolean(approximateIncomeInputFieldState.error) && (
              <ErrorMessage
                text={approximateIncomeInputFieldState.error?.message!}
                errorMessageId={approximateIncomeInputFieldState.error?.message}
              />
            )}
          </View>
          <View style={styles.formGroupHalfWidth}>
            <Text variant="small" style={styles.label}>
              {t('creditScoreTitle')}
            </Text>
            <Input
              {...creditScoreField}
              keyboardType="numeric"
              placeholder={t('creditScoreTitle')}
              error={Boolean(creditScoreFieldState.error)}
              errorMessageId={creditScoreFieldState.error?.message}
              containerStyle={styles.input}
            />
            {Boolean(creditScoreFieldState.error) && (
              <ErrorMessage
                text={creditScoreFieldState.error?.message!}
                errorMessageId={creditScoreFieldState.error?.message}
              />
            )}
          </View>
          <View style={styles.formGroupHalfWidth}>
            <Text variant="small" style={styles.label}>
              {t('vaccineStatusTitle')}
            </Text>
            <SelectInput
              {...vaccineStatusInputField}
              value={vaccineStatusInputField.value}
              instanceId="vaccineStatus"
              variant="primary"
              error={Boolean(vaccineStatusInputFieldState.error)}
              errorMessageId={vaccineStatusInputFieldState.error?.message}
              options={vaccineStatusOptions}
            />
            {Boolean(vaccineStatusInputFieldState.error) && (
              <ErrorMessage
                text={vaccineStatusInputFieldState.error?.message!}
                errorMessageId={vaccineStatusInputFieldState.error?.message}
              />
            )}
          </View>
          <View style={[styles.formGroupFullWidth, { zIndex: -1 }]}>
            <View style={styles.submitButton}>
              <Button
                variant="secondary"
                text={t('scheduleTourDetailButton')}
                // @ts-ignore
                onPress={props.onSubmit}
              />
            </View>
          </View>
        </View>
      </View>
    </NoSSR>
  );
}

const styles = StyleSheet.create({
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
  submitButton: {
    marginVertical: Token.spacing.xxxl,
    alignSelf: 'flex-start',
  },
});
