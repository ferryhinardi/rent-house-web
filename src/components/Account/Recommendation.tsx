import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Element } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { Text, Badge } from 'core/base';
import { Token } from 'core';

export default function Recommendation() {
  const { t } = useTranslation();
  return (
    <Element name="recommendation">
      <View>
        <View style={styles.titleWrapper}>
          <Text variant="header-3" ink="primary" style={styles.title}>
            {t('recommendationTitle')}
          </Text>
          <Badge text="Need Action" variant="alert" />
        </View>
        <Text variant="caption" style={styles.description}>
          {t('recommendationDescription')}
        </Text>
      </View>
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
