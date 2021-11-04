import React from 'react';
import { NextPageContext, NextApiRequest, NextApiResponse } from 'next';
import { useTranslation } from 'react-i18next';
import { QueryClient } from 'react-query';
import { Head, HeaderMenu, HeaderNavigation, PreferenceContent, Footer } from 'components';
import { fetchServer } from 'core';
import { ContainerDesktop } from 'core/base';
import { dehydrate } from 'react-query/hydration';
import { QUERY_KEYS } from 'core/constants';
import { Answer, Question, ResponseItem } from 'types';
import { redirectIfUnauthenticated } from 'utils/auth';

type Props = {
  answers?: Answer[];
};

export default function Preference({ answers }: Props) {
  const { t } = useTranslation();
  return (
    <div>
      <Head />
      <HeaderMenu />
      <ContainerDesktop>
        <HeaderNavigation title={t('preference')} />
        <PreferenceContent answers={answers} />
      </ContainerDesktop>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const queryClient = new QueryClient();
  const user = await queryClient.fetchQuery(QUERY_KEYS.CURRENT_USER, () => redirectIfUnauthenticated(context));

  if (user === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  await queryClient.fetchQuery(QUERY_KEYS.QUESTION_ALL, () =>
    fetchServer<ResponseItem<Question>>(context.req as NextApiRequest, context.res as NextApiResponse, {
      url: '/question/all',
    })
  );

  const answersRes = await queryClient.fetchQuery([QUERY_KEYS.ANSWER, user?.id], () =>
    fetchServer<ResponseItem<Answer>>(context.req as NextApiRequest, context.res as NextApiResponse, {
      method: 'GET',
      url: `/answers/${user?.id}`,
    })
  );

  return {
    props: {
      answers: answersRes.data,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
