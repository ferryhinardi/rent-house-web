import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Token } from 'core';
import {
  Head,
  HeaderMenu,
  HomeRecommendationHeaderSection,
  PrivateAmenities,
  FloorPlan,
  MapLocation,
  Footer,
} from 'components';

export default function HomeRecommendation() {
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

const styles = StyleSheet.create({
  separator: {
    marginVertical: Token.spacing.xxxxl,
    borderBottomColor: Token.colors.rynaGray,
    borderBottomWidth: 4,
  },
});
