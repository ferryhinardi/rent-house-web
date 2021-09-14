import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { Text, Button } from 'core/base';
import hero from 'assets/hero-0.svg';
import { imageDataBase64 } from 'assets/hero-0';
import HeroBannerTemplate from './HeroBannerTemplate';

function HeroBannerInitial() {
  const { t } = useTranslation();
  return (
    <HeroBannerTemplate
      imageProps={{
        src: hero,
        blurDataURL: imageDataBase64,
        placeholder: 'blur',
        width: hero.width,
        height: hero.height,
      }}
      DescriptionComponent={
        <>
          <Text variant="banner-title" ink="light">
            {t('bannerTitle')}
          </Text>
          <Text
            variant="banner-subtitle"
            ink="light"
            style={styles.heroSubtitle}
          >
            {t('bannerSubtitle')}
          </Text>
          <Button variant="secondary" text="Learn More" />
        </>
      }
      footerNode={'Liberty Village, Toronto'}
    />
  );
}

HeroBannerInitial.width = hero.width;
HeroBannerInitial.height = hero.height;

const styles = StyleSheet.create({
  heroSubtitle: {
    paddingVertical: Token.spacing.l,
  },
});

export default HeroBannerInitial;
