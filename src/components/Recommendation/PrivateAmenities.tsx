import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, ContainerDesktop } from 'core/base';
import { Token } from 'core';
import FacilityIcon from './FacilityIcon';

export default function PrivateAmenities() {
  return (
    <ContainerDesktop>
      <Text variant="header-2" ink="primary">
        {'Private Amenities'}
      </Text>
      <Text variant="caption" style={styles.description}>
        {
          'Spectacular outdoor rooftop pool, BBQs, tons of outdoor seating, urban garden with amazing views of King West & the CN Tower'
        }
      </Text>

      <View style={styles.facilityContainer}>
        <View style={styles.facility}>
          <FacilityIcon name="rooftop" />
          <Text ink="dark">{'Rooftop'}</Text>
        </View>
        <View style={styles.facility}>
          <FacilityIcon name="gym" />
          <Text ink="dark">{'Gym'}</Text>
        </View>
        <View style={styles.facility}>
          <FacilityIcon name="pool" />
          <Text ink="dark">{'Pool'}</Text>
        </View>
        <View style={styles.facility}>
          <FacilityIcon name="laundry" />
          <Text ink="dark">{'Laundry'}</Text>
        </View>
        <View style={styles.facility}>
          <FacilityIcon name="bedroom" />
          <Text ink="dark">{'Bedroom'}</Text>
        </View>
        <View style={styles.facility}>
          <FacilityIcon name="bathroom" />
          <Text ink="dark">{'Bathroom'}</Text>
        </View>
        <View style={styles.facility}>
          <FacilityIcon name="diningroom" />
          <Text ink="dark">{'Dining Room'}</Text>
        </View>
        <View style={styles.facility}>
          <FacilityIcon name="bedroom" />
          <Text ink="dark">{'Bedroom'}</Text>
        </View>
        <View style={styles.facility}>
          <FacilityIcon name="bathroom" />
          <Text ink="dark">{'Bathroom'}</Text>
        </View>
        <View style={styles.facility}>
          <FacilityIcon name="diningroom" />
          <Text ink="dark">{'Dining Room'}</Text>
        </View>
      </View>

      <Button
        variant="secondary"
        text={'Show All Amenities'}
        style={styles.showAllAmenities}
      />
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
