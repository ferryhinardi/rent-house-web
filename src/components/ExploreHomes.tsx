import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { ContainerDesktop, Text, Button } from 'core/base';

export default function ExploreHomes() {
  const { t } = useTranslation();
  // @TODO: Adjust fetch to explore backend
  // const { data, isLoading } = useQuery<ResponseItem<Explore>>(
  //   QUERY_KEYS.EXPLORER,
  //   async () => {
  //     const res = await fetcher<ResponseItem<Explore>>({
  //       method: 'GET',
  //       url: '/explore',
  //     });
  //     return res;
  //   }
  // );
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
    </ContainerDesktop>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Token.spacing.xxl,
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
});
