import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import assets from 'assets';

import { Text } from 'core/base';
import { Token } from 'core';
import useTailwind from 'hooks/useTailwind';

export default function Banner() {
  const { t } = useTranslation();
  const { tailwindResponsive, md } = useTailwind();
  return (
    <View style={styles.container}>
      <View style={styles.backgroundImage}>
        <View style={styles.backDrop} />
        <Image {...assets.preferenceBanner} alt="preference banner" placeholder="blur" objectFit="cover" />
      </View>
      <View style={tailwindResponsive('z-10 m-auto items-center text-center w-1/2-full', { md: 'w-full' }, { md })}>
        <Text ink="light" variant="header-2">
          {t('preferenceBannerTitle')}
        </Text>
        <Text style={styles.descriptionText} ink="light" variant="caption">
          {t('preferenceBannerDescription')}
        </Text>
      </View>
    </View>
  );
}

const PreferenceBannerHeight = 437;

const styles = StyleSheet.create({
  container: {
    height: PreferenceBannerHeight,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100vw',
  },
  backDrop: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(12, 27, 64, 0.6)',
    zIndex: 1,
  },
  descriptionText: {
    marginVertical: Token.spacing.m,
    paddingHorizontal: Token.spacing.m,
    textAlign: 'center',
  },
});
