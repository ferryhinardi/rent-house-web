import { NextPageContext, NextApiRequest, NextApiResponse } from 'next';
import { View } from 'react-native';
import tailwind from 'tailwind-rn';
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
    <View style={tailwind('h-full')}>
      <Head />
      <HeaderMenu />
      <Hero />
      <PartnersSection />
      {/* <ExploreHomesSection /> */}
      {/* <VideoSection /> */}
      {/* <Perks /> */}
      {/* <EasyProcessSection /> */}
      {/* <TestimonialSection /> */}
      {/* <SupportingMediaSection /> */}
      {/* <PreferenceBanner /> */}
      {/* <Footer /> */}
      <style jsx global>{`
        #__next {
          overflow-x: hidden;
        }
      `}</style>
    </View>
  );
}

export async function getServerSideProps(context: NextPageContext) {
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
      url: '/house/one-house-per-city',
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
  };
}
