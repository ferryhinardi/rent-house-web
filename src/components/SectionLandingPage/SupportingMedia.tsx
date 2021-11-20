import React from 'react';
import { View, StyleSheet } from 'react-native';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { Text } from 'core/base';
import assets from 'assets';

const mediaAssets = [assets.supportMedia1, assets.supportMedia2, assets.supportMedia3];

export default function SupportingMedia() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text variant="header-2" ink="primary" style={styles.title}>
        {t('supportingMediaTitle')}
      </Text>
      <View style={styles.imageWrapper}>
        {mediaAssets.map((image, index) => (
          <Image key={`${index}`} {...image} placeholder="blur" alt="media-1" />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Token.spacing.xxxxl,
    marginVertical: Token.spacing.xxxxl,
  },
  title: {
    marginBottom: Token.spacing.xxxxl,
  },
  imageWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xxl,
  },
});
