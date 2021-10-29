import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Text } from 'core/base';
import { Token } from 'core';

import assets from 'assets';

export default function VideoSection() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      <Image {...assets.videoSection} placeholder="blur" alt="video-section" />
      <View style={styles.textContainer}>
        <Text font="playfair" variant="headline-1" ink="light">
          {t('bannerTitle')}
        </Text>
        <Text variant="caption" ink="light" style={styles.heroSubtitle}>
          {t('bannerSubtitle')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 370,
  },
  overlay: {
    backgroundColor: 'rgba(12, 27, 64, 0.5)',
    width: '100%',
    height: 370,
    position: 'absolute',
    zIndex: 2,
  },
  heroSubtitle: {
    paddingVertical: Token.spacing.l,
  },
  textContainer: {
    position: 'absolute',
    marginLeft: Token.spacing.xl,
    zIndex: 3,
    top: '30%',
  },
});
