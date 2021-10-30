import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NextPageContext, NextApiRequest, NextApiResponse } from 'next';
import { useTranslation } from 'react-i18next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import {
  Head,
  HeaderMenu,
  HeaderNavigation,
  SideBar,
  AccountSettings,
  AccountRecommendation,
  AccountRoommates,
  PreferenceBanner,
  Footer,
} from 'components';
import { Token, fetchServer } from 'core';
import { ContainerDesktop, Text } from 'core/base';
import { QUERY_KEYS } from 'core/constants';
import { User, House, Roomate, ResponseItem } from 'types';
import { redirectIfUnauthenticated } from 'utils/auth';

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
                // IconRight: <Icon name="exclamation-triangle" size={20} color={Token.colors.red} />,
              },
              {
                name: 'roommates',
                label: t('roommates'),
                // IconRight: <Icon name="exclamation-triangle" size={20} color={Token.colors.red} />,
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
            <View style={styles.separator} />
            <AccountRoommates userId={user.id} />
          </View>
        </View>
      </ContainerDesktop>
      <PreferenceBanner />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const queryClient = new QueryClient();
  const user = await queryClient.fetchQuery(QUERY_KEYS.CURRENT_USER, () => 
    redirectIfUnauthenticated(context)
  );

  if (user === null) {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  }

  await queryClient.fetchQuery([QUERY_KEYS.HOUSE_MATCH, user?.id], () =>
    fetchServer<ResponseItem<House>>(
      context.req as NextApiRequest,
      context.res as NextApiResponse,
      { url: `/match-property/preferences/${user?.id}` }
      // Testing
      // { url: `/match-property/preferences/11` }
    )
  );

  await queryClient.fetchQuery([QUERY_KEYS.ROOMMATES, user?.id], async () =>
    fetchServer<Roomate>(
      context.req as NextApiRequest,
      context.res as NextApiResponse,
      { url: `/user/${user?.id}` })
  );

  return {
    props: {
      user,
      dehydratedState: dehydrate(queryClient),
    },
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
