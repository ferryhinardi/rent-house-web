import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Element } from 'react-scroll';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Text, Button, Badge } from 'core/base';
import { Token } from 'core';

export default function LinkedAccounts() {
  const { t } = useTranslation();
  return (
    <Element name="linked-accounts">
      <>
        <View style={styles.titleWrapper}>
          <Text variant="header-3" ink="primary" style={styles.title}>
            {t('linkedAccountsTitle')}
          </Text>
          <Badge text="Need Action" variant="alert" />
        </View>
        <Text variant="caption" style={styles.description}>
          {t('linkedAccountsDescription')}
        </Text>
        {linkedAccounts.map((account) => (
          <View key={account.name} style={styles.linkWrapper}>
            <View style={styles.linkButton}>
              <Icon name={account.name} size={28} />
              <Text style={styles.linkButtonText}>
                {t(`${account.name}Connect`)}
              </Text>
            </View>
            {account.status === 'connected' ? (
              <Button variant="outline" text={t('connected')} />
            ) : (
              <Button variant="secondary" text={t('unConnected')} />
            )}
          </View>
        ))}
      </>
    </Element>
  );
}

const linkedAccounts = [
  { name: 'instagram', status: 'connected' },
  { name: 'spotify', status: 'not-connected' },
  { name: 'google', status: 'not-connected' },
];

const styles = StyleSheet.create({
  titleWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  title: {
    marginRight: Token.spacing.s,
  },
  description: {
    marginTop: Token.spacing.xs,
  },
  linkWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Token.spacing.s,
    paddingHorizontal: Token.spacing.xs,
    marginVertical: Token.spacing.l,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkButtonText: {
    marginLeft: Token.spacing.m,
  },
});
