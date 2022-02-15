import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text, Image, ContainerDesktop } from 'core/base';
import { fetcher, Token } from 'core';
import config from 'config';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { House } from 'types';
import { QUERY_KEYS } from 'core/constants';

export default function FloorPlan() {
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

  return (
    <ContainerDesktop>
      <Text variant="header-2" ink="primary" style={styles.title}>
        {t('floorPlanTitle')}
      </Text>
      <Text variant="caption" style={styles.description}>
        {t('floorPlanDescription')}
      </Text>
      <View style={styles.imageWrapper}>
        <Image src={`${config.imageHost}/${data?.floor_plan_image}`} alt="floor plan" width="530" height="610" />
      </View>
    </ContainerDesktop>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: Token.spacing.m,
  },
  description: {
    marginBottom: Token.spacing.xxl,
  },
  imageWrapper: {
    alignItems: 'flex-start',
  },
});
