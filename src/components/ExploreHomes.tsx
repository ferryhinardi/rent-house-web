import React from 'react';
import { useQuery } from 'react-query';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Token, fetcher } from 'core';
import { ResponseItem, House } from 'types';
import { Text, Button, ContainerDesktop } from 'core/base';
import Image from 'next/image';
import { QUERY_KEYS } from 'core/constants';

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_HOST;

export default function ExploreHomes() {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery<ResponseItem<House>>(
    QUERY_KEYS.HOUSE,
    async () => {
      const res = await fetcher<ResponseItem<House>>({
        method: 'GET',
        url: '/house?size=4',
      });
      return res;
    }
  );

  return (
    <ContainerDesktop style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text variant="header-2" style={styles.headerTitle}>
            {t('titleExploreHomes')}
          </Text>
          <Text>{t('subtitleExploreHomes')}</Text>
        </View>
        <Button variant="secondary" text={t('moreButtonExploreHomes')} />
      </View>
      {isLoading ? (
        <Text>{'Loading...'}</Text>
      ) : (
        <View style={styles.containerHouses}>
          {data?.data.map((item) => (
            <View key={item.id} style={styles.cardStyle}>
              <Image
                src={(BASE_IMAGE_URL + '/' + item.lead_media) as any}
                blurDataURL={(BASE_IMAGE_URL + '/' + item.lead_media) as any}
                alt={item.name}
                width="100%"
                objectFit="cover"
                height={350}
                className="house-card"
              />
              <Text variant="header-4" style={styles.cardTitle}>
                {item.name}
              </Text>
            </View>
          ))}
          <style jsx global>{`
            .house-card {
              border-top-right-radius: 50px;
            }
          `}</style>
        </View>
      )}
    </ContainerDesktop>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Token.spacing.xxxxl,
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
    gap: Token.spacing.m,
    justifyContent: 'space-between',
    marginTop: Token.spacing.xxl,
  },
  cardTitle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: Token.spacing.s,
    marginTop: Token.spacing.xs,
    alignItems: 'center',
  },
  cardStyle: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '40%',
  },
});
