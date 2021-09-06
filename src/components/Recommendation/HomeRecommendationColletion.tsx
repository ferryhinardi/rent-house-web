import React from 'react';
import { useRouter } from 'next/router';
import { View, StyleSheet } from 'react-native';
import { Token } from 'core';
import { routePaths } from 'routePaths';
import HomeRecommendationCard from './HomeRecommendationCard';

export default function HomeRecommendationColletion() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <HomeRecommendationCard
        onViewDetail={() => router.push(routePaths.homeRecommendation)}
      />
      <HomeRecommendationCard
        onViewDetail={() => router.push(routePaths.homeRecommendation)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.l,
    marginTop: Token.spacing.xxl,
  },
});
