import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import NoSSR from 'react-no-ssr';
import { StyleSheet, View } from 'react-native';
import { Element } from 'react-scroll';
import { routePaths } from 'routePaths';
import { Token } from 'core';
import { Button, Text } from 'core/base';
import useTailwind from 'hooks/useTailwind';

const settings = ['profile', 'preference'];

export default function AccountSettings() {
  const { t } = useTranslation();
  const { tailwindResponsive, md } = useTailwind();
  return (
    <Element name="account-settings">
      <NoSSR>
        <View style={styles.titleWrapper}>
          <Text variant="header-3" ink="primary" style={styles.title}>
            {t('accountSettingsTitle')}
          </Text>
          {/* <Badge text="Need Action" variant="alert" /> */}
        </View>
        <View
          style={tailwindResponsive(
            'flex-row flex-wrap justify-between flex-gap-10 mt-10',
            { md: 'flex-col' },
            { md }
          )}>
          {settings.map((setting) => (
            <SettingCard key={setting} title={t(`${setting}`)} subtitle={t(`${setting}Description`)} href={setting} />
          ))}
        </View>
      </NoSSR>
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
      <Text variant="header-4" style={styles.cardTitle}>
        {title}
      </Text>
      <Text>{subtitle}</Text>
      {/* <ProgressBar
        progress={0}
        color={Token.colors.rynaBlue}
        unfilledColor={'rgba(28,43,79,0.24)'} // Token.colors.rynaBlue with opacity
        style={styles.progressBar}
      /> */}
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
  btnCompleted: {
    marginVertical: Token.spacing.m,
    alignSelf: 'flex-start',
  },
});
