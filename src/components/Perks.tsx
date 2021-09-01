import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { fetcher, Token } from 'core';
import { Card, Text, Button } from 'core/base';
import { QUERY_KEYS } from 'core/constants';
import { Perk, ResponseItem } from 'types';

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_HOST;

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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text variant="header-2" style={styles.headerTitle}>
            {t('titlePerks')}
          </Text>
          <Text>{t('subtitlePerks')}</Text>
          <button
            type="button"
            onClick={() => {
              fetch('/api/handler');
            }}
          >
            Test Sentry Integration
          </button>
        </View>
        <Button variant="secondary" text={t('moreButtonPerks')} />
      </View>
      {isLoading ? (
        <Text>{'Loading...'}</Text>
      ) : (
        <View style={styles.containerPerks}>
          {data?.data.map((item) => (
            <Card
              key={item.id}
              orientation="portrait"
              style={styles.cardStyle}
              imageProps={{
                src: `${BASE_IMAGE_URL}/${item.image}`,
                blurDataURL: `${BASE_IMAGE_URL}/${item.image}`,
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
    backgroundColor: Token.colors.pink,
  },
  containerPerks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.m,
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
