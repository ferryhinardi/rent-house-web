import React from 'react';
import { View, StyleSheet } from 'react-native';
import config from 'config';

import { Text } from 'core/base';
import { Token } from 'core';
import { useTranslation } from 'react-i18next';

const videoSrc = `${config.imageHost}/assets/home-banner.mp4`;

export default function VideoSection() {
  const { t } = useTranslation();
  return (
    <View>
      <View>
        <View style={styles.overlay} />
        <video muted autoPlay loop>
          <source src={videoSrc} />
        </video>
      </View>

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
  overlay: {
    backgroundColor: 'rgba(12, 27, 64, 0.5)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 10,
  },
  heroSubtitle: {
    paddingVertical: Token.spacing.l,
  },
  textContainer: {
    position: 'absolute',
    top: '40%',
    marginLeft: Token.spacing.xl,
  },
});
