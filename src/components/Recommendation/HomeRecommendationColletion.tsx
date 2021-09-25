import React from 'react';
import { useQuery } from 'react-query';
import { ResponseItem, House } from 'types';
import { QUERY_KEYS } from 'core/constants';
import { useRouter } from 'next/router';
import { View, StyleSheet } from 'react-native';
import { Token, fetcher } from 'core';
import { routePaths } from 'routePaths';
import HomeRecommendationCard from './HomeRecommendationCard';
import { HomeRecommendationPlaceholder } from 'components/Placeholder';

export default function HomeRecommendationColletion() {
  const router = useRouter();

  const { data, isLoading } = useQuery<ResponseItem<House>>(
    QUERY_KEYS.HOUSE_MATCH,
    async () => {
      const res = await fetcher<ResponseItem<House>>({
        method: 'GET',
        url: '/match-property/preferences/11',
      });
      return res;
    }
  );
  const homeData = data?.data || [];
  console.log(data);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <HomeRecommendationPlaceholder />
      ) : (
        <View style={styles.container}>
          {homeData.map((item, index) => (
            <HomeRecommendationCard
              onViewDetail={() => {
                router.push({
                  pathname: routePaths.homeDetail,
                  query: { homeId: item.id },
                });
              }}
            />
          ))}
        </View>
      )}
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
