import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { Text, Button } from 'core/base';
import assets from 'assets';
import HeroBannerTemplate from './HeroBannerTemplate';

const hero = assets.hero0;

function HeroBannerInitial() {
  const { t } = useTranslation();
  return (
    <HeroBannerTemplate
      imageProps={{ ...hero, placeholder: 'blur' }}
      DescriptionComponent={
        <>
          <Text font="playfair" variant="banner-title" ink="light">
            {t('bannerTitle')}
          </Text>
          <Text variant="caption" ink="light" style={styles.heroSubtitle}>
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
