import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NextPageContext, NextApiRequest, NextApiResponse } from 'next';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
  Head,
  HeaderMenu,
  HeaderNavigation,
  SideBar,
  AccountSettings,
  AccountRecommendation,
  PreferenceBanner,
  Footer,
} from 'components';
import { Token, fetchServer } from 'core';
import { ContainerDesktop, Text } from 'core/base';
import { QueryClient } from 'react-query';
import { QUERY_KEYS } from 'core/constants';
import { User } from 'types';

type Props = {
  user: User;
};

export default function Account({ user }: Props) {
  const { t } = useTranslation();

  const onPressMenu = async (menuId: string) => {
    const { scroller } = await import('react-scroll');
    scroller.scrollTo(menuId, {
      duration: 500,
      delay: 100,
      smooth: true,
      offset: -50,
    });
  };

  return (
    <div>
      <Head />
      <HeaderMenu />
      <ContainerDesktop>
        <HeaderNavigation title={t('account')} />
        <View style={styles.separator} />
        <View style={styles.contentWrapper}>
          <SideBar
            menus={[
              {
                name: 'recommendation',
                label: t('recommendation'),
              },
              {
                name: 'account-settings',
                label: t('accountSettings'),
                IconRight: (
                  <Icon
                    name="exclamation-triangle"
                    size={20}
                    color={Token.colors.red}
                  />
                ),
              },
            ]}
            onPress={onPressMenu}
            style={styles.sidebar}
          />
          <View style={styles.content}>
            <Text variant="header-3" ink="primary">
              {t('welcomeMessage', { name: user.name })}
            </Text>
            <Text variant="caption">{t('welcomeDescription')}</Text>
            <View style={styles.separator} />
            <AccountRecommendation />
            <View style={styles.separator} />
            <AccountSettings />
          </View>
        </View>
      </ContainerDesktop>
      <PreferenceBanner />
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ res, req }: NextPageContext) {
  // This value is considered fresh for ten seconds (s-maxage=10).
  // If a request is repeated within the next 10 seconds, the previously
  // cached value will still be fresh. If the request is repeated before 59 seconds,
  // the cached value will be stale but still render (stale-while-revalidate=59).
  //
  // In the background, a revalidation request will be made to populate the cache
  // with a fresh value. If you refresh the page, you will see the new value.
  // https://nextjs.org/docs/going-to-production#caching
  res?.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  const queryClient = new QueryClient();
  const user = await queryClient.fetchQuery(QUERY_KEYS.CURRENT_USER, () =>
    fetchServer<User>(req as NextApiRequest, res as NextApiResponse, {
      url: '/current-user/',
    })
  );
  return {
    props: { user },
  };
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: Token.spacing.xxl,
    borderBottomWidth: 4,
    borderBottomColor: Token.colors.rynaGray,
  },
  contentWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xxl,
    alignItems: 'flex-start',
  },
  sidebar: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '18%',
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '78%',
    marginBottom: Token.spacing.xxxxxl,
  },
});
