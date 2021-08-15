import React from 'react';
import Image from 'next/image';
import { View, Pressable, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { fetcher, Token } from 'core';
import { ContainerDesktop, Card, Text, Button } from 'core/base';
import { Perk, ResponseItem } from 'types';

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_API_HOST;

function Perks() {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery<ResponseItem<Perk>>('perks', async () => {
    const res = await fetcher<ResponseItem<Perk>>({
      method: 'GET',
      url: '/perks/all',
    });
    return res;
  });
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
          <Button
            variant="secondary"
            text={t('moreButtonPerks')}
          />
        </View>
        {
          isLoading
          ? <Text>{'Loading...'}</Text>
          : data?.data.map((item) => (
            <Card key={item.id} style={styles.cardStyle}>
              {
                /*******************************
                 * Can't Load image because host is not found
                 */
                /* <Image
                  src={`${BASE_IMAGE_URL}${item.image}`}
                  loading="eager"
                  layout="fill"
                  alt="perk image"
                  onError={() => console.error('error render image')}
                /> */
              }
              <View style={styles.containerInfoPerk}>
                <Text style={styles.titlePerk}>{item.title}</Text>
                <Text>{item.description}</Text>
              </View>
            </Card>
          ))
        }
      </ContainerDesktop>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: Token.colors.pink,
  },
  container: {
    paddingVertical: Token.spacing.xxl
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
    marginVertical: Token.spacing.m,
    flexDirection: 'row',
  },
  containerInfoPerk: {
    flex: 1,
    alignItems: 'center',
  },
  titlePerk: {
    ...Token.typography.Baseline,
    fontWeight: 'bold',
    fontSize: Token.fontSize.large,
    marginBottom: Token.spacing.m,
  },
});

export default Perks;
