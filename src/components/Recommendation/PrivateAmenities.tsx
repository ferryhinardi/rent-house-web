import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ContainerDesktop } from 'core/base';
import { Token } from 'core';
import FacilityIcon from './FacilityIcon';
import { House } from 'types';

type Props = {
  house: House;
};

export default function PrivateAmenities(props: Props) {
  console.log('mashok pake eko', props.house.amenities);

  return (
    <ContainerDesktop>
      <Text variant="header-2" ink="primary">
        {'Private Amenities'}
      </Text>
      <Text variant="caption" style={styles.description}>
        {props.house.amenities_description}
      </Text>

      <View style={styles.facilityContainer}>
        {props.house.amenities.map((item, i) => {
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
  showAllAmenities: {
    alignSelf: 'flex-start',
    marginTop: Token.spacing.xxl,
  },
});
