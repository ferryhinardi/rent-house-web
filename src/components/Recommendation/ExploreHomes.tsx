import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ContainerDesktop, CalendarInput, Button, Text } from 'core/base';
import { Token } from 'core';
import FacilityIcon from './FacilityIcon';

export default function ExploreHomes() {
  const { t } = useTranslation();
  return (
    <ContainerDesktop style={styles.container}>
      <View>
        <Text variant="header-2" ink="primary">
          {t('titleExploreHomes')}
        </Text>
        <Text variant="caption" style={styles.description}>
          {t('subtitleExploreHomes')}
        </Text>

        <View style={styles.wrapperVideo}>
          <Image
            src={require('assets/video-sample-explore-home.svg')}
            alt="video explore home"
          />
        </View>

        <View style={styles.separator} />

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

        <View style={styles.separator} />
      </View>
      <View style={styles.right}>
        <Text variant="header-2" ink="dark">
          {t('rentWithUsLabel')}
        </Text>
        <View style={styles.formGroup}>
          <Text variant="tiny" style={styles.label}>
            {t('movingDateLabel')}
          </Text>
          <CalendarInput
            placeholder={t('movingDateLabel')}
            textContentType="name"
          />
        </View>
        <Button text={t('startYourApplication')} style={styles.submitButton} />
      </View>
    </ContainerDesktop>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Token.spacing.xxxxl,
    flexDirection: 'row',
    gap: Token.spacing.xxxxl,
  },
  description: {
    marginTop: Token.spacing.m,
  },
  wrapperVideo: {
    marginTop: Token.spacing.xxxxl,
    alignItems: 'flex-start',
  },
  separator: {
    marginVertical: Token.spacing.xxxxl,
    borderBottomColor: Token.colors.rynaGray,
    borderBottomWidth: 4,
  },
  right: {
    minWidth: 400,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    padding: Token.spacing.l,
    shadowOffset: { width: 20, height: 14 },
    shadowRadius: 84,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: Token.border.radius.default,
  },
  formGroup: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '100%',
    width: '100%',
    marginVertical: Token.spacing.xl,
  },
  label: {
    marginBottom: Token.spacing.xs,
  },
  submitButton: {
    width: '100%',
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
