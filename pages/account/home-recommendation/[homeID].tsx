import React from 'react';
import { View, StyleSheet } from 'react-native';
import { fetcher, Token } from 'core';
import {
  Head,
  HeaderMenu,
  HomeRecommendationHeaderSection,
  PrivateAmenities,
  FloorPlan,
  MapLocation,
  Footer,
} from 'components';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { House } from 'types';

export default function HouseRecommendation() {
  const router = useRouter();
  const { homeID } = router.query;

  const { data, isLoading } = useQuery(
    'HomeDetail',
    async () => {
      const res = await fetcher<House>({
        method: 'GET',
        url: `/house/${homeID}`,
      });
      return res;
    },
    { enabled: homeID !== undefined }
  );

  if (isLoading || data === undefined) {
    return <p>loading</p>;
  }

  return (
    <>
      <Head />
      <HeaderMenu />
      <HomeRecommendationHeaderSection house={data as House} />
      <View style={styles.separator} />
      <PrivateAmenities house={data as House} />
      <View style={styles.separator} />
      <FloorPlan floorPlanImage={data.floor_plan_image} />
      <View style={styles.separator} />
      <MapLocation
        lat={data.location_lat.Float64}
        lon={data.location_lon.Float64}
      />
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: Token.spacing.xxxxl,
    borderBottomColor: Token.colors.rynaGray,
    borderBottomWidth: 4,
  },
});
