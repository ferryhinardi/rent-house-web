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
