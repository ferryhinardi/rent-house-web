import { NextPageContext, NextApiRequest, NextApiResponse } from 'next';
import { QueryClient } from 'react-query';
 import { dehydrate } from 'react-query/hydration';
import {
  Head,
  HeaderMenu,
  Hero,
  Perks,
  Footer,
} from 'components';
import { fetchServer } from 'core';
import { User } from 'types';
import { QUERY_KEYS } from 'core/constants';

export default function Home() {
  return (
    <div>
      <Head />
      <HeaderMenu />
      <Hero />
      <Perks />
      <Footer />
    </div>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(QUERY_KEYS.CURRENT_USER, () =>
    fetchServer<User>(
      context.req as NextApiRequest,
      context.res as NextApiResponse,
      {
        url: '/current-user'
      }
    )
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    }
  };
}
