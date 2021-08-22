import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from 'core/base';
import { Token } from 'core';

export default function LinkedAccounts() {
  const { t } = useTranslation();
  return (
    <View>
      <Text variant="header-title" ink="primary">
        {t('linkedAccountsTitle')}
      </Text>
      <Text variant="medium-large" style={styles.description}>
        {t('linkedAccountsDescription')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    marginTop: Token.spacing.xs,
  },
});
