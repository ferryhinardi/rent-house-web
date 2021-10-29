import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text, ContainerDesktop } from 'core/base';
import { fetcher, Token } from 'core';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { House } from 'types';
import { QUERY_KEYS } from 'core/constants';

const mapSourcePattern = 'src="(.*?)"';

function MapLocation() {
  const { t } = useTranslation();
  const router = useRouter();
  const { homeID } = router.query;
  const { data } = useQuery(
    [QUERY_KEYS.HOME_DETAIL, homeID],
    async () => {
      const res = await fetcher<House>({
        method: 'GET',
        url: `/house/${homeID}`,
      });
      return res;
    },
    { enabled: homeID !== undefined }
  );

  const mapSource = data?.embed_map.match(mapSourcePattern);

  return (
    <ContainerDesktop style={styles.container}>
      <Text variant="header-2" ink="primary" style={styles.title}>
        {t('mapLocationTitle')}
      </Text>
      <Text variant="caption" style={styles.description}>
        {t('mapLocationDescription')}
      </Text>
      {mapSource && mapSource[1] ? <iframe src={mapSource[1]} style={{ borderWidth: 0 }} height="450"></iframe> : null}
    </ContainerDesktop>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Token.spacing.xxxxl,
  },
  title: {
    marginBottom: Token.spacing.m,
  },
  description: {
    marginBottom: Token.spacing.xxl,
  },
});

export default MapLocation;
