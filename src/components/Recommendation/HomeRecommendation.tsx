import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { Card, Text, Button } from 'core/base';
import Swiper from '../Swiper';
import HomeRecommendationSample from 'assets/home-recommendation-sample.svg';
import FacilityIcon from './FacilityIcon';

export default function HomeRecommendation() {
  return (
    <View style={styles.container}>
      <HomeRecommendationCard />
      <HomeRecommendationCard />
    </View>
  );
}

function HomeRecommendationCard() {
  const { t } = useTranslation();
  return (
    <Card style={styles.containerCard}>
      <Card.Body>
        <Swiper
          containerStyle={{ flex: 1 }}
          innerContainerStyle={{ width: '100%', height: 170 }}
          minDistanceForAction={0.1}
          controlsProps={{
            dotsTouchable: true,
            prevPos: 'left',
            nextPos: 'right',
            // eslint-disable-next-line
            NextComponent: ({ onPress }) => (
              <Button
                IconStart="chevron-right"
                onPress={onPress}
                variant="outline"
                elevation
                borderColor={Token.colors.white}
                style={{
                  minWidth: 0,
                  width: 16,
                  height: 16,
                  paddingHorizontal: Token.spacing.m,
                }}
              />
            ),
            // eslint-disable-next-line
            PrevComponent: ({ onPress }) => (
              <Button
                IconStart="chevron-left"
                onPress={onPress}
                variant="outline"
                elevation
                borderColor={Token.colors.white}
                style={{
                  minWidth: 0,
                  width: 16,
                  height: 16,
                  paddingHorizontal: Token.spacing.m,
                }}
              />
            ),
          }}
        >
          <Image
            src={HomeRecommendationSample}
            alt="home-recommendation"
            layout="responsive"
            loading="eager"
            objectFit="cover"
          />
          <Image
            src={HomeRecommendationSample}
            alt="home-recommendation"
            layout="responsive"
            loading="eager"
            objectFit="cover"
          />
          <Image
            src={HomeRecommendationSample}
            alt="home-recommendation"
            layout="responsive"
            loading="eager"
            objectFit="cover"
          />
        </Swiper>
        <Text variant="header-3" style={styles.title}>
          {'Beautiful Minto Apartment'}
        </Text>
        <Text variant="title-2" ink="primary" style={styles.subtitle}>
          {'$1500 - $1700'}
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
        </View>
        <Button
          text={t('homeRecommendationViewButton')}
          style={styles.viewDetail}
        />
      </Card.Body>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.l,
    marginTop: Token.spacing.xxl,
  },
  containerCard: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '48%',
    overflow: 'hidden',
    borderTopRightRadius: Token.border.radius.default,
    borderRadius: Token.border.radius.default,
  },
  title: { marginTop: Token.spacing.xl },
  subtitle: { marginTop: Token.spacing.l },
  facilityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xs,
    marginTop: Token.spacing.xl,
  },
  facility: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '48%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.s,
  },
  viewDetail: {
    marginTop: Token.spacing.xl,
  },
});
