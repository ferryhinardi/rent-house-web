import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import config from 'config';

import { fetcher, Token } from 'core';
import { Card, Text, Button } from 'core/base';
import { QUERY_KEYS } from 'core/constants';
import { PerksPlaceholder } from 'components/Placeholder';
import { Perk, ResponseItem } from 'types';
import assets from 'assets';

const cardWidth = ['35%', '35%', '30%', '30%', '30%'];

function Perks() {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery<ResponseItem<Perk>>(
    QUERY_KEYS.PERKS,
    async () => {
      const res = await fetcher<ResponseItem<Perk>>({
        method: 'GET',
        url: '/perks',
      });
      return res;
    }
  );

  const onNavigateToTopSection = async () => {
    const { scroller } = await import('react-scroll');
    scroller.scrollTo('find-my-home', {
      duration: 500,
      delay: 100,
      smooth: true,
      offset: -50,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.horizontalLineContainer1}>
        <Image src={assets.homeLineHorizontal} />
      </View>
      <View style={styles.horizontalLineContainer2}>
        <Image src={assets.homeLineHorizontal3} />
      </View>
      <View style={styles.header}>
        <View>
          <Text variant="header-2" font={'playfair'} style={styles.headerTitle}>
            {t('titlePerks')}
          </Text>
          <Text variant="caption">{t('subtitlePerks')}</Text>
        </View>
        <Button
          variant="secondary"
          text={t('moreButtonPerks')}
          onPress={onNavigateToTopSection}
          style={{
            zIndex: 2,
          }}
        />
      </View>
      {isLoading ? (
        <PerksPlaceholder />
      ) : (
        <View style={styles.containerPerks}>
          {data?.data.map((item, index) => (
            <Card
              activeOpacity={1}
              noShadow
              key={item.id}
              orientation="portrait"
              style={[styles.cardStyle, { flexBasis: cardWidth[index] }]}
              imageProps={{
                src: `${config.imageHost}/${item.image}`,
                blurDataURL: `${config.imageHost}/${item.image}`,
                placeholder: 'blur',
                loading: 'lazy',
                width: '100%',
                height: 180,
                alt: 'perk image',
                onError: () => console.error('error render image'),
              }}
            >
              <Card.Body>
                <Card.Title variant="large">{item.title}</Card.Title>
                <Text variant="caption" style={{ marginTop: Token.spacing.m }}>
                  {item.description}
                </Text>
              </Card.Body>
            </Card>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Token.spacing.xxxxl,
    backgroundColor: Token.colors.lightGrey,
    zIndex: 2,
  },
  containerPerks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xxxl,
    justifyContent: 'space-between',
    marginTop: Token.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Token.spacing.xxl,
  },
  headerTitle: {
    marginBottom: Token.spacing.xs,
  },
  cardStyle: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '30%',
  },
  horizontalLineContainer2: {
    width: '100vw',
    right: 0,
    top: 75,
    position: 'absolute',
  },
  horizontalLineContainer1: {
    width: '70vw',
    right: 0,
    top: -300,
    position: 'absolute',
    transform: [
      {
        rotate: '16deg',
      },
    ],
  },
});

export default Perks;
