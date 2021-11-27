import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Element } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import NoSSR from 'react-no-ssr';
import { Token, fetcher } from 'core';
import { Text } from 'core/base';
import { QUERY_KEYS } from 'core/constants';
import RoommateCard from 'components/Roommates/RoommateCard';
import { Roomate } from 'types';
import useTailwind from 'hooks/useTailwind';

type RoommatesProps = {
  userId: number;
};

export default function Roommates({ userId }: RoommatesProps) {
  const { t } = useTranslation();
  const { tailwindResponsive, md } = useTailwind();
  const { data } = useQuery<Roomate>([QUERY_KEYS.ROOMMATES, userId], async () => {
    const res = await fetcher<Roomate>({
      method: 'GET',
      url: `/user/${userId}`,
    });
    return res;
  });

  const roomates = data?.roomates;

  if (!Boolean(roomates)) return null;

  return (
    <Element name="roommates">
      <NoSSR>
        <View style={styles.titleWrapper}>
          <Text variant="header-3" ink="primary" style={styles.title}>
            {t('roommatesTitle')}
          </Text>
        </View>
        <Text variant="caption" style={styles.description}>
          {t('roommatesSubtitle')}
        </Text>

        <View style={tailwindResponsive('flex-row flex-wrap flex-gap-4 mt-10', { md: 'flex-col' }, { md })}>
          {roomates?.map((roomate) => {
            return <RoommateCard roomate={roomate} key={roomate.id} />;
          })}
        </View>
      </NoSSR>
    </Element>
  );
}

const styles = StyleSheet.create({
  titleWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    marginRight: Token.spacing.s,
  },
  description: {
    marginTop: Token.spacing.xs,
  },
});
