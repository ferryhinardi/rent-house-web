import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import config from 'config';
import { fetcher, Token } from 'core';
import { Card, Text, Button } from 'core/base';
import { QUERY_KEYS } from 'core/constants';
import { PerksPlaceholder } from 'components/Placeholder';
import { Perk, ResponseItem } from 'types';

const cardWidth = ['48%', '48%', '30%', '30%', '30%'];

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
        />
      </View>
      {isLoading ? (
        <PerksPlaceholder />
      ) : (
        <View style={styles.containerPerks}>
          {data?.data.map((item, index) => (
            <Card
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
                <Text style={{ marginTop: Token.spacing.m }}>
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
});

export default Perks;
