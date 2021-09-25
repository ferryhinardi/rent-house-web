import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { View, StyleSheet } from 'react-native';
import { Text, ContainerDesktop } from 'core/base';
import { Token, fetcher } from 'core';
import { useQuery } from 'react-query';
import ScheduleTourForm from './ScheduleTourForm';
import { House } from 'types';
import config from 'config';
import { QUERY_KEYS } from 'core/constants';

export default function HomeRecommendationHeaderSection() {
  const router = useRouter();
  const { homeID } = router.query;
  const { data } = useQuery(
    [QUERY_KEYS.HOME_DETAIL, homeID],
    async () => {
      const res = await fetcher<House>({
        method: 'GET',
        url: `/house/${homeID}`,
      });
      return res;
    },
    { enabled: homeID !== undefined }
  );
  return (
    <ContainerDesktop style={styles.container}>
      <View style={styles.homeInfoContainer}>
        <Text variant="banner-title" ink="dark">
          {data?.name}
        </Text>
        <Text variant="caption" style={styles.homeInfoDescription}>
          {data?.description}
        </Text>
        <ScheduleTourForm external_url={data?.external_url} />
      </View>

      <View>
        <Image
          src={`${config.imageHost}/${data?.lead_media}`}
          alt={`galery-1`}
          width={744}
          height={378}
          objectFit="cover"
        />
        <View style={styles.imageCollections}>
          {(data?.galleries || []).map((item, i) => (
            <Image
              key={i}
              src={`${config.imageHost}/${item}`}
              alt={`galery-${i + 1}`}
              width={243}
              height={205}
              objectFit="cover"
            />
          ))}
        </View>
      </View>
    </ContainerDesktop>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Token.spacing.xxxxl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xxxxl,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  homeInfoContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '30%',
  },
  homeInfoDescription: {
    marginTop: Token.spacing.l,
  },
  imageCollections: {
    marginTop: 38,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '66%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Token.spacing.l,
  },
});
