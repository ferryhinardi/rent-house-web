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

function Perks() {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery<ResponseItem<Perk>>(QUERY_KEYS.PERKS, async () => {
    const res = await fetcher<ResponseItem<Perk>>({
      method: 'GET',
      url: '/perks',
    });
    return res;
  });

  const onNavigateToTopSection = async () => {
    const { scroller } = await import('react-scroll');
    scroller.scrollTo('find-my-home', {
      duration: 500,
      delay: 100,
      smooth: true,
      offset: -50,
    });
  };

  const perks = data?.data;
  const [upperSection, bottomSection] = [perks?.slice(0, 2), perks?.slice(2)];

  return (
    <View style={styles.container}>
      {/* line */}
      <View style={styles.horizontalLineContainer1}>
        <Image src={assets.homeLineHorizontal} />
      </View>
      <View style={styles.horizontalLineContainer2}>
        <Image src={assets.homeLineHorizontal3} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text variant="header-2" style={styles.headerTitle}>
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
          <View style={styles.upperSection}>
            {upperSection &&
              upperSection.map((item) => (
                <Card
                  activeOpacity={1}
                  noShadow
                  key={item.id}
                  orientation="portrait"
                  style={[styles.upperSectionCard]}
                  imageProps={{
                    src: `${config.imageHost}/${item.image}`,
                    blurDataURL: `${config.imageHost}/${item.image}`,
                    placeholder: 'blur',
                    loading: 'lazy',
                    width: '100%',
                    height: 180,
                    alt: 'perk image',
                    onError: () => console.error('error render image'),
                  }}>
                  <Card.Body>
                    <Card.Title variant="header-2">{item.title}</Card.Title>
                    <Text variant="caption" style={{ marginTop: Token.spacing.m }}>
                      {item.description}
                    </Text>
                  </Card.Body>
                </Card>
              ))}
          </View>
          <View style={styles.bottomSection}>
            {bottomSection &&
              bottomSection?.map((item) => (
                <Card
                  activeOpacity={1}
                  noShadow
                  key={item.id}
                  orientation="portrait"
                  imageProps={{
                    src: `${config.imageHost}/${item.image}`,
                    blurDataURL: `${config.imageHost}/${item.image}`,
                    placeholder: 'blur',
                    loading: 'lazy',
                    width: '100%',
                    height: 180,
                    alt: 'perk image',
                    onError: () => console.error('error render image'),
                  }}>
                  <Card.Body>
                    <Card.Title variant="header-2">{item.title}</Card.Title>
                    <Text variant="caption" style={{ marginTop: Token.spacing.m }}>
                      {item.description}
                    </Text>
                  </Card.Body>
                </Card>
              ))}
          </View>
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
    flexDirection: 'column',
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
  upperSectionCard: {
    maxWidth: '46%',
    minHeight: 406,
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
  upperSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Token.spacing.l,
  },
  bottomSection: {
    marginTop: Token.spacing.xxl,
    /* @ts-ignore */
    display: 'grid',
    gridTemplateColumns: `1fr 1fr 1fr`,
    columnGap: Token.spacing.xxxxxl,
  },
});

export default Perks;