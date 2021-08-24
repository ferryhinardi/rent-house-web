import { NextPageContext, NextApiRequest, NextApiResponse } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import {
  Head,
  HeaderMenu,
  Hero,
  PartnersSection,
  ExploreHomesSection,
  VideoSection,
  Perks,
  EasyProcessSection,
  TestimonialSection,
  PreferenceBanner,
  Footer,
} from 'components';
import { fetchServer } from 'core';
import { ResponseItem, Question, User } from 'types';
import { QUERY_KEYS } from 'core/constants';

export default function Home() {
  return (
    <div>
      <Head />
      <HeaderMenu />
      <Hero />
      <PartnersSection />
      <ExploreHomesSection />
      <VideoSection />
      <Perks />
      <EasyProcessSection />
      <TestimonialSection />
      <PreferenceBanner />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(QUERY_KEYS.CURRENT_USER, () =>
    fetchServer<User>(
      context.req as NextApiRequest,
      context.res as NextApiResponse,
      { url: '/current-user' }
    )
  );
  await queryClient.prefetchQuery(QUERY_KEYS.QUESTION, () =>
    fetchServer<ResponseItem<Question>>(
      context.req as NextApiRequest,
      context.res as NextApiResponse,
      { url: '/question/question', params: { section: 'landing_page' } }
    )
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
