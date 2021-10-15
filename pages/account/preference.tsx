import React from 'react';
import { NextPageContext, NextApiRequest, NextApiResponse } from 'next';
import { useTranslation } from 'react-i18next';
import { QueryClient } from 'react-query';
import { Head, HeaderMenu, HeaderNavigation, PreferenceContent, Footer } from 'components';
import { fetchServer } from 'core';
import { ContainerDesktop } from 'core/base';
import { dehydrate } from 'react-query/hydration';
import { QUERY_KEYS } from 'core/constants';
import { Question, ResponseItem } from 'types';

export default function Preference() {
  const { t } = useTranslation();
  return (
    <div>
      <Head />
      <HeaderMenu />
      <ContainerDesktop>
        <HeaderNavigation title={t('preference')} />
        <PreferenceContent />
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
  res?.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  const queryClient = new QueryClient();
  await queryClient.fetchQuery(QUERY_KEYS.QUESTION_USER_PREFERENCES, () =>
    fetchServer<ResponseItem<Question>>(req as NextApiRequest, res as NextApiResponse, {
      url: '/question/all',
      params: { section: 'user_preferences' },
    })
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
