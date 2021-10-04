import React from 'react';
import { View, StyleSheet } from 'react-native';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import config from 'config';
import { Token } from 'core';
import { Card, Text, Button } from 'core/base';
import Swiper from '../Swiper';
import FacilityIcon from './FacilityIcon';
import { House } from 'types';

type CardProps = House & {
  onViewDetail?: () => void;
};

export default function HomeRecommendationCard({
  name,
  description,
  amenities,
  galleries,
  onViewDetail,
}: CardProps) {
  const { t } = useTranslation();
  return (
    <Card style={styles.containerCard}>
      <Card.Body>
        <Swiper
          containerStyle={{ flex: 1 }}
          innerContainerStyle={{
            flexBasis: '100%',
            flexGrow: 0,
            flexShrink: 1,
            height: '100%',
          }}
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
          {galleries.map((galery, idx) => (
            <Image
              key={`${galery}-${idx}`}
              src={`${config.imageHost}/${galery}`}
              blurDataURL={`${config.imageHost}/${galery}`}
              className="image-galery"
              placeholder="blur"
              loading="lazy"
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="cover"
              alt="home-recommendation"
            />
          ))}
        </Swiper>
        <Text variant="header-3" style={styles.title}>
          {name}
        </Text>
        <Text variant="caption" style={styles.description}>
          {description}
        </Text>
        <View style={styles.facilityContainer}>
          {(amenities || []).map((item, i) => {
            return (
              <View key={i} style={styles.facility}>
                <FacilityIcon name={item.icon} />
                <Text ink="dark">{item.name}</Text>
              </View>
            );
          })}
        </View>
        <Button
          text={t('homeRecommendationViewButton')}
          style={styles.viewDetail}
          onPress={onViewDetail}
        />
      </Card.Body>
      <style jsx global>{`
        .image-galery {
          border-radius: 8px;
        }
      `}</style>
    </Card>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '48%',
    overflow: 'hidden',
    borderTopRightRadius: Token.border.radius.default,
    borderRadius: Token.border.radius.default,
  },
  title: { marginTop: Token.spacing.xl },
  description: { marginTop: Token.spacing.l },
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
