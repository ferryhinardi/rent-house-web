import React from 'react';
import { NextPageContext, NextApiRequest, NextApiResponse } from 'next';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { dehydrate } from 'react-query/hydration';
import {
  Head,
  HeaderMenu,
  HeaderNavigation,
  PersonalInfoForm,
  EmergencyContact,
  Footer,
} from 'components';
import { Token, fetchServer } from 'core';
import { ContainerDesktop } from 'core/base';
import { QueryClient } from 'react-query';
import { QUERY_KEYS } from 'core/constants';
import { User } from 'types';

export default function Profile() {
  const { t } = useTranslation();
  return (
    <div>
      <Head />
      <HeaderMenu />
      <ContainerDesktop>
        <HeaderNavigation title={t('profile')} />
        <PersonalInfoForm />
        <View style={styles.separator} />
        <EmergencyContact />
      </ContainerDesktop>
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
  await queryClient.prefetchQuery(QUERY_KEYS.CURRENT_USER, () =>
    fetchServer<User>(req as NextApiRequest, res as NextApiResponse, {
      url: '/current-user',
    })
  );
  return {
    props: {
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
});
