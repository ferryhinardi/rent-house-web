import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Element } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Token, fetcher } from 'core';
import { Text } from 'core/base';
import { QUERY_KEYS } from 'core/constants';
import RoommateCard from 'components/Roommates/RoommateCard';
import { Roomate } from 'types';

type RoommatesProps = {
  userId: number;
};

export default function Roommates({ userId }: RoommatesProps) {
  const { t } = useTranslation();
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
      <View style={styles.titleWrapper}>
        <Text variant="header-3" ink="primary" style={styles.title}>
          {t('roommatesTitle')}
        </Text>
      </View>
      <Text variant="caption" style={styles.description}>
        {t('roommatesSubtitle')}
      </Text>

      <View style={styles.wrapperCard}>
        {roomates?.map((roomate) => {
          return <RoommateCard roomate={roomate} key={roomate.id} />;
        })}
      </View>
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
  wrapperCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Token.spacing.xxl,
  },
});
