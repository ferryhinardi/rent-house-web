import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import OfficeBanner from 'assets/office-banner.jpg';

import { Text } from 'core/base';
import { Token } from 'core';

export default function Banner() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.backgroundImage}>
        <View style={styles.backDrop} />
        <Image
          src={OfficeBanner}
          alt="office banner"
          loading="eager"
          layout="responsive"
          objectFit="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <Text ink="light" font="playfair" variant="header-2">
          {t('aboutUs')}
        </Text>
      </View>
    </View>
  );
}

const PreferenceBannerHeight = 200;

const styles = StyleSheet.create({
  container: {
    height: PreferenceBannerHeight,
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    height: PreferenceBannerHeight,
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
  textContainer: {
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    maxWidth: '40%',
  },
  descriptionText: {
    marginVertical: Token.spacing.m,
    textAlign: 'center',
  },
});
