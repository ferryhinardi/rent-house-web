import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Text } from 'core/base';
import { Token } from 'core';

import assets from 'assets';
import useTailwind from 'hooks/useTailwind';

export default function BannerWelcome() {
  const { t } = useTranslation();
  const { tailwind } = useTailwind();

  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      <Image {...assets.videoSection} placeholder="blur" alt="video-section" />
      <View style={tailwind('absolute ml-8 z-10 top-1/3')}>
        <Text style={tailwind('text-5xl leading-10 text-center')} font="playfair" variant="headline-1" ink="light">
          {t('welcomingBannerTitle')}
        </Text>
        <Text variant="caption" ink="light" style={tailwind('p-6 text-center')}>
          {t('welcomingBannerDescription')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 370,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(12, 27, 64, 0.5)',
    width: '100%',
    height: 370,
    position: 'absolute',
    zIndex: 2,
  },
});
