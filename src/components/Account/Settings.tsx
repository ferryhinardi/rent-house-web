import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Element } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { Text, Badge } from 'core/base';
import { Token } from 'core';

const settings = ['profile', 'preference', 'application'];

export default function AccountSettings() {
  const { t } = useTranslation();
  return (
    <Element name="account-settings">
      <>
        <View style={styles.titleWrapper}>
          <Text variant="header-3" ink="primary" style={styles.title}>
            {t('accountSettingsTitle')}
          </Text>
          <Badge text="Need Action" variant="alert" />
        </View>
        <Text variant="caption" style={styles.description}>
          {t('accountSettingsDescription')}
        </Text>
        <View style={styles.cardContainer}>
          {settings.map((setting) => (
            <SettingCard
              key={setting}
              title={t(`${setting}`)}
              subtitle={t(`${setting}Description`)}
              href={setting}
            />
          ))}
        </View>
      </>
    </Element>
  );
}

type SettingCardProps = {
  title: string;
  subtitle: string;
  href: string;
};

function SettingCard({ title, subtitle, href }: SettingCardProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.card}>
      <Text variant="title-2" style={styles.cardTitle}>
        {title}
      </Text>
      <Text>{subtitle}</Text>
      <Text
        ink="primary"
        accessibilityRole="link"
        // @ts-ignore
        href={`/account/${href}`}
        style={styles.cardCompleted}
      >
        {t('completeNow')}
      </Text>
    </View>
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
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Token.spacing.xxl,
  },
  card: {
    flex: 0.3,
    padding: Token.spacing.l,
    shadowColor: Token.colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 20, height: 14 },
    shadowRadius: 84,
    borderRadius: 8,
  },
  cardTitle: {
    paddingVertical: Token.spacing.m,
  },
  cardCompleted: {
    paddingVertical: Token.spacing.m,
  },
});
