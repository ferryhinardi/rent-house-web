import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text, Button, ContainerDesktop } from 'core/base';
import { Token } from 'core';

export default function HomeRecommendationHeaderSection() {
  const { t } = useTranslation();
  return (
    <ContainerDesktop style={styles.container}>
      <View style={styles.homeInfoContainer}>
        <Text variant="banner-title" ink="dark">
          {'Toronto for You'}
        </Text>
        <Text
          variant="caption"
          style={styles.homeInfoDescription}
        >{`Young, working hard, and want those killer city views? We’ve got properties – unique to your needs.`}</Text>
        <Button variant="secondary" text={t('viewRecommendationButton')} />
      </View>

      <View style={styles.imageCollections}>
        {Array(4)
          .fill(4)
          .map((_, i) => (
            <Image
              key={i}
              src={require(`assets/home-recommendation-${i + 1}.svg`)}
              alt={`galery-${i + 1}`}
            />
          ))}
      </View>
    </ContainerDesktop>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Token.spacing.xxxxl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xxxxl,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  homeInfoContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '30%',
  },
  homeInfoDescription: {
    marginTop: Token.spacing.l,
    marginBottom: Token.spacing.xxl,
  },
  imageCollections: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '66%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Token.spacing.l,
  },
});
