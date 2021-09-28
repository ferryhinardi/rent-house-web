import React from 'react';
import { useQuery } from 'react-query';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

import config from 'config';
import { ResponseItem, House } from 'types';
import { Token, fetcher } from 'core';
import { Card, Text, Button, ContainerDesktop } from 'core/base';
import { QUERY_KEYS } from 'core/constants';

import { ExploreHomePlaceholder } from 'components/Placeholder';
import assets from 'assets';

const cardWidthSecondLayout = ['100%', '40%', '40%'];

export default function ExploreHomes() {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery<ResponseItem<House>>(
    QUERY_KEYS.HOUSE,
    async () => {
      const res = await fetcher<ResponseItem<House>>({
        method: 'GET',
        url: '/house',
      });
      return res;
    }
  );
  const homeData = data?.data;
  const [firstHome, otherHomes] = [homeData?.[0], homeData?.slice(1)];

  return (
    <ContainerDesktop style={styles.container}>
      {/* pink line */}
      <View style={styles.horizontalLineContainer}>
        <Image src={assets.homeLineHorizontal} />
      </View>
      <View style={styles.header}>
        <View>
          <Text font="playfair" variant="header-2" style={styles.headerTitle}>
            {t('titleExploreHomes')}
          </Text>
          <Text variant="caption">{t('subtitleExploreHomes')}</Text>
        </View>
        <Button variant="secondary" text={t('moreButtonExploreHomes')} />
      </View>
      {isLoading ? (
        <ExploreHomePlaceholder />
      ) : (
        <View style={styles.containerHouses}>
          {
            <View style={[styles.cardStyle, styles.layout1]}>
              <Card
                noShadow
                activeOpacity={1}
                orientation="portrait"
                imageProps={{
                  src: `${config.imageHost}/${firstHome?.lead_media}`,
                  blurDataURL: `${config.imageHost}/${firstHome?.lead_media}`,
                  placeholder: 'blur',
                  loading: 'lazy',
                  alt: 'house explore image',
                  layout: 'fill',
                  objectFit: 'contain',
                  onError: () => console.error('error render image'),
                }}
                imageContainerStyle={styles.firstCardImage}
                style={styles.cardContainer}
              />
              <Text font="playfair" variant="header-2" style={styles.cardTitle}>
                {firstHome?.name}
              </Text>
            </View>
          }
          <View style={styles.layout2}>
            {otherHomes?.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.cardStyle,
                  { flexBasis: cardWidthSecondLayout[index] },
                ]}
              >
                <Card
                  orientation="portrait"
                  imageProps={{
                    src: `${config.imageHost}/${item.lead_media}`,
                    blurDataURL: `${config.imageHost}/${item.lead_media}`,
                    placeholder: 'blur',
                    loading: 'lazy',
                    width: '100%',
                    height: 350,
                    layout: 'intrinsic',
                    alt: 'hause explore image',
                    onError: () => console.error('error render image'),
                  }}
                />
                <Text
                  font="playfair"
                  variant="header-2"
                  style={styles.cardTitle}
                >
                  {item.name}
                </Text>
                <Text variant="caption">{item.name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ContainerDesktop>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Token.spacing.xxxxl,
    backgroundColor: Token.colors.lightGrey,
    zIndex: -1,
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: Token.spacing.m,
  },
  headerTitle: {
    marginBottom: Token.spacing.xs,
  },
  containerHouses: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xxxl,
    justifyContent: 'space-between',
    marginTop: Token.spacing.xxl,
  },
  layout1: {
    flexGrow: 0.4,
    flexShrink: 1,
    flexBasis: '0%',
  },
  layout2: {
    flexGrow: 0.6,
    flexShrink: 1,
    flexBasis: '0%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xxl,
  },
  cardTitle: {
    marginBottom: Token.spacing.s,
    marginTop: Token.spacing.xs,
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: 'transparent',
  },
  cardStyle: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '40%',
  },
  firstCardImage: {
    minHeight: '100%',
  },
  horizontalLineContainer: {
    position: 'absolute',
    top: -330,
    right: 0,
    opacity: 1,
    transform: [
      {
        rotate: '-2deg',
      },
    ],
  },
});
