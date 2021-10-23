import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { Text, Button } from 'core/base';
import assets from 'assets';
import HeroBannerTemplate from './HeroBannerTemplate';
import config from 'config';

const hero = assets.hero0;

const videoSrc = `${config.imageHost}/assets/home-banner.mp4`;
function HeroBannerInitial() {
  const { t } = useTranslation();
  return (
    <HeroBannerTemplate
      video={
        <video muted autoPlay>
          <source src={videoSrc} />
        </video>
      }
      DescriptionComponent={
        <>
          <Text font="playfair" variant="headline-1" ink="light">
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
