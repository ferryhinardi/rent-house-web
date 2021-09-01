import React from 'react';
import { useRouter } from 'next/router';
import { View, StyleSheet } from 'react-native';
import { Element } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { Text, Badge } from 'core/base';
import { Token } from 'core';
import { routePaths } from 'routePaths';

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
  const router = useRouter();
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
        onPress={() => router.push(`${routePaths.account}/${href}`)}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Token.spacing.xxl,
    marginTop: Token.spacing.xxl,
  },
  card: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '30%',
    padding: Token.spacing.l,
    shadowColor: Token.colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 20, height: 14 },
    shadowRadius: 84,
    borderRadius: 8,
  },
  cardTitle: {
    marginVertical: Token.spacing.m,
  },
  cardCompleted: {
    marginVertical: Token.spacing.m,
  },
});
