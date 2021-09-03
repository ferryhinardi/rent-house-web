import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'core/base';
import { Token } from 'core';

export default function DepositModalContent() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text variant="header-2" ink="primary" style={styles.title}>
        {t('paydeposit')}
      </Text>
      <Text variant="caption" ink="primary" style={styles.subtitle}>
        {t('modalDepositSubtitle')}
      </Text>
      <Button
        variant="empty"
        elevation
        text={t('payWithCredit')}
        IconStart="credit-card"
        style={styles.button}
      />
      <Button
        variant="empty"
        elevation
        text={t('payWithBank')}
        IconStart="credit-card"
        style={styles.button}
      />
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
});
