import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ContainerDesktop } from 'core/base';
import { fetcher, Token } from 'core';
import FacilityIcon from './FacilityIcon';
import { House } from 'types';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'core/constants';

export default function PrivateAmenities() {
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
    <ContainerDesktop>
      <Text variant="header-2" ink="primary">
        {'Private Amenities'}
      </Text>
      <Text variant="caption" style={styles.description}>
        {data?.amenities_description}
      </Text>

      <View style={styles.facilityContainer}>
        {(data?.amenities || []).map((item, i) => {
          return (
            <View key={i} style={styles.facility}>
              <FacilityIcon name={item.icon} />
              <Text ink="dark">{item.name}</Text>
            </View>
          );
        })}
      </View>
    </ContainerDesktop>
  );
}

const styles = StyleSheet.create({
  description: {
    marginTop: Token.spacing.m,
  },
  facilityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xs,
    marginTop: Token.spacing.xl,
  },
  facility: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '30%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.s,
  },
});
