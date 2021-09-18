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
  SupportingMediaSection,
  PreferenceBanner,
  Footer,
} from 'components';
import { fetchServer } from 'core';
import { ResponseItem, Question, House, Testimony, User } from 'types';
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
      <SupportingMediaSection />
      <PreferenceBanner />
      <Footer />
    </div>
  );
}

// SSR get data
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
      { url: '/question/all', params: { section: 'landing_page' } }
    )
  );
  await queryClient.prefetchQuery(QUERY_KEYS.HOUSE, () =>
    fetchServer<ResponseItem<House>>(
      context.req as NextApiRequest,
      context.res as NextApiResponse,
      { url: '/house?size=4' }
    )
  );
  await queryClient.prefetchQuery(QUERY_KEYS.TESTIMONY, () =>
    fetchServer<ResponseItem<Testimony>>(
      context.req as NextApiRequest,
      context.res as NextApiResponse,
      { url: '/testimony' }
    )
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
