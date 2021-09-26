import React from 'react';
import { useQuery } from 'react-query';
import { useFormContext } from 'react-hook-form';
import { House, User } from 'types';
import { QUERY_KEYS } from 'core/constants';
import { useRouter } from 'next/router';
import { View, StyleSheet } from 'react-native';
import { Token, fetcher } from 'core';
import { routePaths } from 'routePaths';
import HomeRecommendationCard from './HomeRecommendationCard';
import { HomeRecommendationPlaceholder } from 'components/Placeholder';

export default function HomeRecommendationColletion() {
  const router = useRouter();
  const { getValues } = useFormContext<User>();
  const { data, isLoading } = useQuery<Array<House>>(
    [QUERY_KEYS.HOUSE_MATCH, getValues().id],
    async () =>
      fetcher<Array<House>>({
        method: 'GET',
        url: '/house-matching',
        params: { userId: getValues().id },
        // Testing
        // params: { userId: 11 },
      })
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <HomeRecommendationPlaceholder />
      ) : (
        <View style={styles.container}>
          {data?.map((item) => (
            <HomeRecommendationCard
              key={item.id}
              {...item}
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
