import React from 'react';
import { NextPageContext, NextApiRequest, NextApiResponse } from 'next';
import { View, StyleSheet } from 'react-native';
import { fetchServer, Token } from 'core';
import {
  Head,
  HeaderMenu,
  HomeRecommendationHeaderSection,
  PrivateAmenities,
  FloorPlan,
  MapLocation,
  Footer,
} from 'components';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { House, ResponseItem, Room } from 'types';
import { QUERY_KEYS } from 'core/constants';

export default function HouseRecommendation() {
  return (
    <>
      <Head />
      <HeaderMenu />
      <HomeRecommendationHeaderSection />
      <View style={styles.separator} />
      <PrivateAmenities />
      <View style={styles.separator} />
      <FloorPlan />
      <View style={styles.separator} />
      <MapLocation />
      <Footer />
    </>
  );
}

export async function getServerSideProps({ res, req, query }: NextPageContext) {
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

  if (!query.homeID) {
    return {
      notFound: true,
    };
  }

  const queryClient = new QueryClient();
  await queryClient.fetchQuery([QUERY_KEYS.HOME_DETAIL, query.homeID], () =>
    fetchServer<House>(req as NextApiRequest, res as NextApiResponse, {
      method: 'GET',
      url: `/house/${query.homeID}`,
    })
  );
  await queryClient.fetchQuery([QUERY_KEYS.HOME_ROOM, query.homeID], () =>
    fetchServer<ResponseItem<Room>>(
      req as NextApiRequest,
      res as NextApiResponse,
      {
        method: 'GET',
        url: '/room/all',
        params: { house_id: query.homeID },
      }
    )
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: Token.spacing.xxxxl,
    borderBottomColor: Token.colors.rynaGray,
    borderBottomWidth: 4,
  },
});
