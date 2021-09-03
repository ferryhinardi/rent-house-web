import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useForm, useController } from 'react-hook-form';
import { Button, Input, Text, ErrorMessage } from 'core/base';
import { Token } from 'core';

export default function DepositModalContent() {
  const { t } = useTranslation();
  const [state, setState] = React.useState<'CREDIT' | 'TRANSFER'>();
  return (
    <View style={styles.container}>
      <Text variant="header-2" ink="primary" style={styles.title}>
        {t('paydeposit')}
      </Text>
      <Text variant="caption" ink="primary" style={styles.subtitle}>
        {t('modalDepositSubtitle')}
      </Text>
      {state === 'CREDIT' && (
        <CreditCardForm onCancel={() => setState(undefined)} />
      )}
      {!state && (
        <>
          <Button
            variant="empty"
            elevation
            text={t('payWithCredit')}
            IconStart="credit-card"
            style={styles.button}
            onPress={() => setState('CREDIT')}
          />
          <Button
            variant="empty"
            elevation
            text={t('payWithBank')}
            IconStart="credit-card"
            style={styles.button}
            onPress={() => setState('TRANSFER')}
          />
        </>
      )}
    </View>
  );
}

type FormProps = Partial<{
  onCancel: () => void;
}>;

function CreditCardForm({ onCancel }: FormProps) {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm();
  const { field: fieldName, fieldState: fieldStateName } = useController({
    name: 'name',
    control,
  });
  const { field: fieldCardNumber, fieldState: fieldStateCardNumber } =
    useController({ name: 'cardNumber', control });
  const { field: fieldCardExpired, fieldState: fieldStateCardExpired } =
    useController({ name: 'cardExpired', control });
  const { field: fieldCardVcc, fieldState: fieldStateCardVcc } = useController({
    name: 'cardVcc',
    control,
  });
  const onSubmit = (data: {
    name: string;
    cardNumber: string;
    cardExpired: string;
    cardVcc: string;
  }) => {
    console.log('data', data);
  };

  return (
    <View style={styles.containerCreditCardForm}>
      <View style={styles.formGroupFullWidth}>
        <Text variant="tiny" ink="dark" style={styles.label}>
          {t('nameOfCreditCard')}
        </Text>
        <Input {...fieldName} placeholder="Joe" />
        {Boolean(fieldStateName.error) && (
          <ErrorMessage
            text={fieldStateName.error?.message!}
            errorMessageId={fieldStateName.error?.message}
          />
        )}
      </View>
      <View style={styles.formGroupFullWidth}>
        <Text variant="tiny" ink="dark" style={styles.label}>
          {t('numberOfCreditCard')}
        </Text>
        <Input
          {...fieldCardNumber}
          placeholder="xxxx-xxxx-xxxx-xxxx"
          keyboardType="numeric"
          maxLength={19}
        />
        {Boolean(fieldStateCardNumber.error) && (
          <ErrorMessage
            text={fieldStateCardNumber.error?.message!}
            errorMessageId={fieldStateCardNumber.error?.message}
          />
        )}
      </View>
      <View style={styles.formGroupHalfWidth}>
        <Text variant="tiny" ink="dark" style={styles.label}>
          {t('expiredOfCreditCard')}
        </Text>
        <Input
          {...fieldCardExpired}
          placeholder="mm/yyyy"
          keyboardType="numeric"
          maxLength={7}
        />
        {Boolean(fieldStateCardExpired.error) && (
          <ErrorMessage
            text={fieldStateCardExpired.error?.message!}
            errorMessageId={fieldStateCardExpired.error?.message}
          />
        )}
      </View>
      <View style={styles.formGroupHalfWidth}>
        <Text variant="tiny" ink="dark" style={styles.label}>
          {t('vccOfCreditCard')}
        </Text>
        <Input
          {...fieldCardVcc}
          placeholder="xxx"
          secureTextEntry
          keyboardType="numeric"
          maxLength={3}
        />
        {Boolean(fieldStateCardVcc.error) && (
          <ErrorMessage
            text={fieldStateCardVcc.error?.message!}
            errorMessageId={fieldStateCardVcc.error?.message}
          />
        )}
      </View>
      <View style={styles.formGroupHalfWidth}>
        <Button text={t('submitPay')} onPress={handleSubmit(onSubmit)} />
        <Button
          variant="empty"
          elevation
          text={t('cancelPay')}
          style={styles.button}
          onPress={onCancel}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 600,
    margin: 'auto',
    padding: Token.spacing.l,
  },
  title: { alignSelf: 'center' },
  subtitle: {
    alignSelf: 'center',
    marginTop: Token.spacing.xxs,
    marginBottom: Token.spacing.s,
  },
  button: {
    marginTop: Token.spacing.ml,
  },
  containerCreditCardForm: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xl,
  },
  formGroupFullWidth: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '100%',
  },
  formGroupHalfWidth: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '47%',
  },
  label: { marginBottom: Token.spacing.xs },
});
