import React from 'react';
import { NextPageContext } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { Head, HeaderMenu, RoommateProfile, Footer } from 'components';
import { QUERY_KEYS } from 'core/constants';
import { redirectIfUnauthenticated } from 'utils/auth';

export default function ProfileDetail() {
  return (
    <div>
      <Head />
      <HeaderMenu />
      <RoommateProfile />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const queryClient = new QueryClient();
  const user = await queryClient.fetchQuery([QUERY_KEYS.CURRENT_USER, context.query.userId], () => redirectIfUnauthenticated(context));

  if (user === null) {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
