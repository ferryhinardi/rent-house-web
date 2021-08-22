import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Element } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { Text, Badge } from 'core/base';
import { Token } from 'core';

export default function AccountSettings() {
  const { t } = useTranslation();
  return (
    <Element name="account-settings">
      <View>
        <View style={styles.titleWrapper}>
          <Text variant="header-title" ink="primary" style={styles.title}>
            {t('accountSettingsTitle')}
          </Text>
          <Badge text="Need Action" variant="alert" />
        </View>
        <Text variant="medium-large" style={styles.description}>
          {t('accountSettingsDescription')}
        </Text>
      </View>
    </Element>
  );
}

const styles = StyleSheet.create({
  titleWrapper: {
    flexDirection: 'row',
  },
  title: {
    marginRight: Token.spacing.s,
  },
  description: {
    marginTop: Token.spacing.xs,
  },
});
