import React from 'react';
import { useQuery } from 'react-query';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Token, fetcher } from 'core';
import config from 'config';
import { ResponseItem, House } from 'types';
import { Card, Text, Button, ContainerDesktop } from 'core/base';
import { QUERY_KEYS } from 'core/constants';
import { ExploreHomePlaceholder } from 'components/Placeholder';

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
        <ExploreHomePlaceholder />
      ) : (
        <View style={styles.containerHouses}>
          {data?.data.map((item) => (
            <View key={item.id} style={styles.cardStyle}>
              <Card
                orientation="portrait"
                imageProps={{
                  src: `${config.imageHost}/${item.lead_media}`,
                  blurDataURL: `${config.imageHost}/${item.lead_media}`,
                  placeholder: 'blur',
                  loading: 'lazy',
                  width: '100%',
                  height: 350,
                  alt: 'perk image',
                  onError: () => console.error('error render image'),
                }}
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
