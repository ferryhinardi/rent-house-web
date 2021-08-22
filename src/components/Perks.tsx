import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { fetcher, Token } from 'core';
import { ContainerDesktop, Card, Text, Button } from 'core/base';
import { QUERY_KEYS } from 'core/constants';
import { Perk, ResponseItem } from 'types';

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_HOST;
const perkWidths = ['45%', '45%', '30%', '30%', '30%', '100%'];

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
    <View style={styles.background}>
      <ContainerDesktop style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>{t('titlePerks')}</Text>
            <Text style={styles.headerSubtitle}>{t('subtitlePerks')}</Text>
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
            {data?.data.map((item, index) => (
              <Card
                key={item.id}
                orientation="portrait"
                style={[styles.cardStyle, { flexBasis: perkWidths[index] }]}
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
      </ContainerDesktop>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: Token.colors.pink,
  },
  container: {
    paddingVertical: Token.spacing.xxl,
  },
  containerPerks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.m,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: Token.spacing.m,
  },
  headerTitle: {
    ...Token.typography.Baseline,
    fontWeight: 'bold',
    fontSize: Token.fontSize.huge,
    marginBottom: Token.spacing.xs,
  },
  headerSubtitle: {
    ...Token.typography.Baseline,
    fontSize: Token.fontSize.medium,
  },
  cardStyle: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

export default Perks;
