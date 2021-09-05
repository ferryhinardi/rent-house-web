import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text, ContainerDesktop } from 'core/base';
import { Token } from 'core';
import HomeRecommendationColletion from './HomeRecommendationColletion';

export default function HomeOurRecommendationSection() {
  const { t } = useTranslation();
  return (
    <ContainerDesktop style={styles.container}>
      <Text variant="header-2" ink="primary">
        {t('ourRecommendationSectionTitle')}
      </Text>
      <Text variant="caption" style={styles.description}>
        {t('ourRecommendationSectionDescription')}
      </Text>
      <HomeRecommendationColletion />

      <Text variant="caption" style={styles.footer}>
        {t('showRecommendation')}
      </Text>
    </ContainerDesktop>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Token.colors.frame,
    paddingVertical: Token.spacing.xxxxl,
  },
  description: {
    marginTop: Token.spacing.xs,
    marginBottom: Token.spacing.xxxxl,
  },
  footer: {
    marginTop: Token.spacing.xxxxl,
  },
});
