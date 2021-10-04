import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Element } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { Text, Badge } from 'core/base';
import { Token } from 'core';
import RoommateCard from 'components/Roommates/RoommateCard';

export default function Roommates() {
  const { t } = useTranslation();
  return (
    <Element name="roommates">
      <View style={styles.titleWrapper}>
        <Text
          font="playfair"
          variant="header-3"
          ink="primary"
          style={styles.title}
        >
          {t('roommatesTitle')}
        </Text>
        <Badge text="Need Action" variant="alert" />
      </View>
      <Text variant="caption" style={styles.description}>
        {t('roommatesSubtitle')}
      </Text>

      <View style={styles.wrapperCard}>
        <RoommateCard />
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
