import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import PreferenceBanner from 'assets/preference-banner.svg';

import { Text, Button } from 'core/base';
import { Token } from 'core';

export default function Banner() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.backgroundImage}>
        <Image
          src={PreferenceBanner}
          alt="preference banner"
          loading="eager"
          layout="fill"
          objectFit="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <Text ink="light" font="playfair" variant="header-2">
          {t('preferenceBannerTitle')}
        </Text>
        <Text style={styles.descriptionText} ink="light" variant="caption">
          {t('preferenceBannerDescription')}
        </Text>
        <Button variant="secondary" text={t('preferenceBannerButton')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: PreferenceBanner.height,
  },
  backgroundImage: {
    position: 'absolute',
    height: PreferenceBanner.height,
    width: '100vw',
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
