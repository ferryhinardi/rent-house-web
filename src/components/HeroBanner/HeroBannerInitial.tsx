import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { Text, Button } from 'core/base';
import hero from 'assets/hero-0.svg';
import HeroBannerTemplate from './HeroBannerTemplate';
import { HeroStates } from '../HeroBanner';

type Props = {
  states: HeroStates;
  onChange?: (index: number) => void;
};

function HeroBannerInitial(_: Props) {
  const { t } = useTranslation();
  return (
    <HeroBannerTemplate
      imageSrc={hero}
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
