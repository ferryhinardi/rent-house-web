import { Footer, Head, HeaderMenu } from 'components';
import { HomeRecommendationPlaceholder } from 'components/Placeholder';
import HomeRecommendationCard from 'components/Recommendation/HomeRecommendationCard';
import { fetcher, Token } from 'core';
import { Text } from 'core/base';
import { QUERY_KEYS } from 'core/constants';
import { useRouter } from 'next/router';
import { StyleSheet, View } from 'react-native';
import { useQuery } from 'react-query';
import { routePaths } from 'routePaths';
import { House, ResponseItem } from 'types';

type HousesPerCity = {
  [key: string]: House[];
};

export default function RentalHomes() {
  const router = useRouter();
  const { data, isLoading } = useQuery<HousesPerCity>(QUERY_KEYS.RENTAL_HOMES, async () => {
    const size = 50;
    const res = await fetcher<ResponseItem<House>>({
      method: 'GET',
      url: '/house',
      params: { size },
    });

    var houses: HousesPerCity = {
      Toronto: [],
      Ottawa: [],
      Montreal: [],
      Vancouver: [],
    };

    res?.data.filter(function (o1) {
      if (o1.city === 'Toronto') {
        houses['Toronto'].push(o1);
      }
    });

    res?.data.filter(function (o1) {
      if (o1.city === 'Ottawa') {
        houses['Ottawa'].push(o1);
      }
    });

    res?.data.filter(function (o1) {
      if (o1.city === 'Montreal') {
        houses['Montreal'].push(o1);
      }
    });

    res?.data.filter(function (o1) {
      if (o1.city === 'Vancouver') {
        houses['Vancouver'].push(o1);
      }
    });

    return houses;
  });

  return (
    <div>
      <Head />
      <HeaderMenu />

      <Text variant="header-2" style={styles.headerTitle}>
        Toronto
      </Text>
      <View style={styles.container}>
        {isLoading ? (
          <HomeRecommendationPlaceholder />
        ) : (
          <>
            {data &&
              data['Toronto'].map((item) => {
                var galleryWithCover = item.galleries;
                galleryWithCover.unshift(item.lead_media);
                return (
                  <HomeRecommendationCard
                    key={item.id}
                    {...item}
                    galleries={galleryWithCover}
                    onViewDetail={() => {
                      router.push({
                        pathname: routePaths.rentalHomesDetail,
                        query: { homeId: item.id },
                      });
                    }}
                  />
                );
              })}
          </>
        )}
      </View>
      <Text variant="header-2" style={styles.headerTitle}>
        Ottawa
      </Text>
      <View style={styles.container}>
        {isLoading ? (
          <HomeRecommendationPlaceholder />
        ) : (
          <>
            {data &&
              data['Ottawa'].map((item) => {
                var galleryWithCover = item.galleries;
                galleryWithCover.unshift(item.lead_media);
                return (
                  <HomeRecommendationCard
                    key={item.id}
                    {...item}
                    galleries={galleryWithCover}
                    onViewDetail={() => {
                      router.push({
                        pathname: routePaths.rentalHomesDetail,
                        query: { homeId: item.id },
                      });
                    }}
                  />
                );
              })}
          </>
        )}
      </View>
      <Text variant="header-2" style={styles.headerTitle}>
        Montreal
      </Text>
      <View style={styles.container}>
        {isLoading ? (
          <HomeRecommendationPlaceholder />
        ) : (
          <>
            {data &&
              data['Montreal'].map((item) => {
                var galleryWithCover = item.galleries;
                galleryWithCover.unshift(item.lead_media);
                return (
                  <HomeRecommendationCard
                    key={item.id}
                    {...item}
                    galleries={galleryWithCover}
                    onViewDetail={() => {
                      router.push({
                        pathname: routePaths.rentalHomesDetail,
                        query: { homeId: item.id },
                      });
                    }}
                  />
                );
              })}
          </>
        )}
      </View>

      <Text variant="header-2" style={styles.headerTitle}>
        Vancouver
      </Text>
      <View style={styles.container}>
        {isLoading ? (
          <HomeRecommendationPlaceholder />
        ) : (
          <>
            {data &&
              data['Vancouver'].map((item) => {
                var galleryWithCover = item.galleries;
                galleryWithCover.unshift(item.lead_media);
                return (
                  <HomeRecommendationCard
                    key={item.id}
                    {...item}
                    galleries={galleryWithCover}
                    onViewDetail={() => {
                      router.push({
                        pathname: routePaths.rentalHomesDetail,
                        query: { homeId: item.id },
                      });
                    }}
                  />
                );
              })}
          </>
        )}
      </View>
      <Footer />
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    /* @ts-ignore */
    display: 'grid',
    gridTemplateColumns: `1fr 1fr 1fr`,
    gap: Token.spacing.l,
    padding: Token.spacing.xxxl,
  },
  headerTitle: {
    paddingLeft: Token.spacing.xxxl,
  },
});
