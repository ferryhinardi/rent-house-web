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
import { ResponseItem, Question, House, Testimony } from 'types';
import { QUERY_KEYS } from 'core/constants';
import { redirectIfUnauthenticated } from 'utils/auth';

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
      <style jsx global>{`
        #__next {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps(context: NextPageContext) {
  // This value is considered fresh for ten seconds (s-maxage=10).
  // If a request is repeated within the next 10 seconds, the previously
  // cached value will still be fresh. If the request is repeated before 59 seconds,
  // the cached value will be stale but still render (stale-while-revalidate=59).
  //
  // In the background, a revalidation request will be made to populate the cache
  // with a fresh value. If you refresh the page, you will see the new value.
  // https://nextjs.org/docs/going-to-production#caching
  context.res?.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  const queryClient = new QueryClient();
  await queryClient.fetchQuery(QUERY_KEYS.CURRENT_USER, () => redirectIfUnauthenticated(context));
  await queryClient.fetchQuery(QUERY_KEYS.QUESTION_LANDING_PAGE, () =>
    fetchServer<ResponseItem<Question>>(context.req as NextApiRequest, context.res as NextApiResponse, {
      url: '/question/all',
      params: { section: 'landing_page' },
    })
  );
  await queryClient.fetchQuery(QUERY_KEYS.HOUSE, () =>
    fetchServer<ResponseItem<House>>(context.req as NextApiRequest, context.res as NextApiResponse, {
      url: '/house/all',
      params: { size: 4 },
    })
  );
  await queryClient.fetchQuery(QUERY_KEYS.TESTIMONY, () =>
    fetchServer<ResponseItem<Testimony>>(context.req as NextApiRequest, context.res as NextApiResponse, {
      url: '/testimony/all',
      params: { size: 4 },
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: false,
  };
}
