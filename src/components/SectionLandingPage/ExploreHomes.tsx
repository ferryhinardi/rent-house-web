import React from 'react';
import { useQuery } from 'react-query';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import NoSSR from 'react-no-ssr';
import Image from 'next/image';

import config from 'config';
import { ResponseItem, House } from 'types';
import { Token, fetcher } from 'core';
import { Card, Text, ContainerDesktop } from 'core/base';
import { QUERY_KEYS } from 'core/constants';

import { ExploreHomePlaceholder } from 'components/Placeholder';
import assets from 'assets';
import useTailwind from 'hooks/useTailwind';

const allCityList = ['toronto', 'montreal', 'ottawa', 'vancouver'];

export default function ExploreHomes() {
  const { t } = useTranslation();
  const { tailwind, tailwindResponsive, md } = useTailwind();
  const { data, isLoading } = useQuery<ResponseItem<House>>(QUERY_KEYS.HOUSE, async () => {
    const res = await fetcher<ResponseItem<House>>({
      method: 'GET',
      url: '/house/one-house-per-city',
    });
    return res;
  });
  const homeData = data?.data;

  // mitigate if the data from API doesn't contain all required cities
  const fillWithDummyHouses = () => {
    const cityList = homeData?.map((h) => h.city.toLowerCase());
    const cityNotExistInAPI = allCityList.filter((item) => !cityList?.includes(item));

    cityNotExistInAPI.map((city) => {
      var randomNumber = Math.floor(Math.random() * (9999 - 1234 + 1)) + 1234;
      const h: House = {
        city: city,
        name: 'Coming Soon',
        lead_media: config.comingSoonImage,
        id: randomNumber,
        partner_id: 0,
        address: '',
        minimum_term_length: '',
        galleries: [],
        floor_plan_image: '',
        location_lat: {
          Float64: 0,
          Valid: false,
        },
        location_lon: {
          Float64: 0,
          Valid: false,
        },
        tags: [],
        embed_map: '',
        description: '',
        amenities: [],
      };
      homeData?.push(h);
    });
  };

  fillWithDummyHouses();
  const [firstHome, secondHome, otherHomes] = [homeData?.[0], homeData?.[1], homeData?.slice(2)];

  return (
    <NoSSR>
      <ContainerDesktop style={styles.container}>
        {/* pink line */}
        <View style={styles.horizontalLineContainer}>
          <Image src={assets.homeLineHorizontal} />
        </View>
        <View style={tailwind('w-full flex-col')}>
          <View>
            <Text ink="primary" variant="header-2" style={styles.headerTitle}>
              {t('titleExploreHomes')}
            </Text>
            <Text variant="caption">{t('subtitleExploreHomes')}</Text>
          </View>
        </View>

        {isLoading ? (
          <ExploreHomePlaceholder />
        ) : (
          <View
            style={tailwindResponsive(
              'mt-10 grid grid-cols-custom grid-cols-gap-3 h-3/4-screen',
              { md: 'flex flex-gap-3 h-full' },
              { md }
            )}>
            {!md ? (
              <>
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
                    <Text variant="header-2" style={styles.cardTitle}>
                      {firstHome?.city}
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
                      <Text variant="header-2" style={styles.cardTitle}>
                        {secondHome?.city}
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
                            layout: 'intrinsic',
                            alt: 'house explore image',
                            objectFit: 'contain',
                            onError: () => console.error('error render image'),
                          }}
                          imageContainerStyle={styles.cardImage}
                        />
                        <Text variant="header-2" style={styles.cardTitle}>
                          {item.city}
                        </Text>
                        <Text variant="caption">{item.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </>
            ) : (
              homeData?.map((item) => (
                <View key={item.name}>
                  <Text variant="header-2" style={styles.cardTitle}>
                    {item.city}
                  </Text>
                  <Card
                    noShadow
                    activeOpacity={1}
                    orientation="portrait"
                    imageProps={{
                      src: `${config.imageHost}/${item.lead_media}`,
                      blurDataURL: `${config.imageHost}/${item.lead_media}`,
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
                    style={styles.cardContainer}
                  />
                </View>
              ))
            )}
          </View>
        )}
      </ContainerDesktop>
    </NoSSR>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Token.spacing.xxxxl,
    backgroundColor: Token.colors.lightGrey,
    zIndex: -1,
  },
  headerTitle: {
    marginBottom: Token.spacing.xs,
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
    textTransform: 'capitalize',
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
