import ProgressBar from 'components/Progress/Bar';
import { Token } from 'core';
import { Badge, Button, Text } from 'core/base';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Element } from 'react-scroll';
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
            <SettingCard key={setting} title={t(`${setting}`)} subtitle={t(`${setting}Description`)} href={setting} />
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
      <Text variant="header-2" style={styles.cardTitle}>
        {title}
      </Text>
      <Text>{subtitle}</Text>
      <ProgressBar
        progress={0}
        color={Token.colors.rynaBlue}
        unfilledColor={'rgba(28,43,79,0.24)'} // Token.colors.rynaBlue with opacity
        style={styles.progressBar}
      />
      <View style={{ alignItems: 'flex-start' }}>
        <Button
          text={t('completeNow')}
          onPress={() => router.push(`${routePaths.account}/${href}`)}
          style={styles.btnCompleted}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  progressBar: {
    flex: 1,
    alignSelf: 'center',
    marginVertical: Token.spacing.l,
  },
  btnCompleted: {
    marginVertical: Token.spacing.m,
    alignSelf: 'flex-start',
  },
});
