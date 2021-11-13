import React from 'react';
import { useQuery } from 'react-query';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

import config from 'config';
import { ResponseItem, House } from 'types';
import { Token, fetcher } from 'core';
import { Card, Text, ContainerDesktop } from 'core/base';
import { QUERY_KEYS } from 'core/constants';

import { ExploreHomePlaceholder } from 'components/Placeholder';
import assets from 'assets';

export default function ExploreHomes() {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery<ResponseItem<House>>(QUERY_KEYS.HOUSE, async () => {
    const res = await fetcher<ResponseItem<House>>({
      method: 'GET',
      url: '/house/one-house-per-city',
    });
    return res;
  });

  const homeData = data?.data;
  const [firstHome, secondHome, otherHomes] = [homeData?.[0], homeData?.[1], homeData?.slice(2)];

  return (
    <ContainerDesktop style={styles.container}>
      {/* pink line */}
      <View style={styles.horizontalLineContainer}>
        <Image src={assets.homeLineHorizontal} />
      </View>
      <View style={styles.header}>
        <View>
          <Text variant="large-cursive" style={styles.headerTitle}>
            {t('titleExploreHomes')}
          </Text>
          <Text variant="caption">{t('subtitleExploreHomes')}</Text>
        </View>
      </View>

      {isLoading ? (
        <ExploreHomePlaceholder />
      ) : (
        <View style={styles.containerHouses}>
          {firstHome && (
            <View>
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
                imageContainerStyle={styles.cardImage}
                style={styles.cardContainer}
              />
              <Text variant="large-cursive" style={styles.cardTitle}>
                {firstHome?.name}
              </Text>
            </View>
          )}

          <View style={styles.rightContainer}>
            {secondHome && (
              <View style={styles.secondCardContainer}>
                <Card
                  orientation="portrait"
                  imageProps={{
                    src: `${config.imageHost}/${secondHome?.lead_media}`,
                    blurDataURL: `${config.imageHost}/${secondHome?.lead_media}`,
                    placeholder: 'blur',
                    loading: 'lazy',
                    layout: 'responsive',
                    height: '100%',
                    width: '100%',
                    alt: 'house explore image',
                    objectFit: 'contain',
                    onError: () => console.error('error render image'),
                  }}
                  imageContainerStyle={styles.cardImage}
                />
                <Text variant="large-cursive" style={styles.cardTitle}>
                  {secondHome?.name}
                </Text>
                <Text variant="caption">{secondHome?.name}</Text>
              </View>
            )}

            <View style={styles.layout2}>
              {otherHomes?.map((item, index) => (
                <View
                  key={item.id}
                  style={[
                    styles.otherHomeCardContainer,
                    {
                      marginRight: index === 0 ? Token.spacing.xxxxl : 0,
                    },
                  ]}>
                  <Card
                    orientation="portrait"
                    imageProps={{
                      src: `${config.imageHost}/${item.lead_media}`,
                      blurDataURL: `${config.imageHost}/${item.lead_media}`,
                      placeholder: 'blur',
                      loading: 'lazy',
                      height: '100%',
                      width: '100%',
                      layout: 'responsive',
                      alt: 'house explore image',
                      objectFit: 'contain',
                      onError: () => console.error('error render image'),
                    }}
                    imageContainerStyle={styles.cardImage}
                  />
                  <Text font="playfair" variant="header-2" style={styles.cardTitle}>
                    {item.name}
                  </Text>
                  <Text variant="caption">{item.name}</Text>
                </View>
              ))}
            </View>
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
    marginTop: Token.spacing.xxl,
    /* @ts-ignore */
    display: 'grid',
    gridTemplateColumns: `1fr 1.5fr`,
    columnGap: Token.spacing.xxxxxl,
    height: '73vh',
  },
  layout2: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    marginTop: Token.spacing.xl,
  },
  cardTitle: {
    marginBottom: Token.spacing.s,
    marginTop: Token.spacing.m,
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: 'transparent',
  },
  cardImage: {
    minHeight: '100%',
    height: '100%',
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
  rightContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  secondCardContainer: {
    height: '60%',
  },
  otherHomeCardContainer: {
    width: '47%',
    height: '40%',
  },
});
