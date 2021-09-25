import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Element } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { Text } from 'core/base';
import { Token } from 'core';
import { HomeRecommendationColletion } from 'components';

export default function Recommendation() {
  const { t } = useTranslation();
  return (
    <Element name="recommendation">
      <View>
        <View style={styles.titleWrapper}>
          <Text variant="header-3" ink="primary" style={styles.title}>
            {t('recommendationTitle')}
          </Text>
        </View>
        <Text variant="caption" style={styles.description}>
          {t('recommendationDescription')}
        </Text>
      </View>

      <HomeRecommendationColletion />
    </Element>
  );
}

const styles = StyleSheet.create({
  titleWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  title: {
    marginRight: Token.spacing.s,
  },
  description: {
    marginTop: Token.spacing.xs,
  },
});
