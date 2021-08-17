import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { Text } from 'core/base';
import hero from 'assets/hero-2.svg';
import HeroBannerTemplate from './HeroBannerTemplate';
import HeroTimeline from './HeroTimeline';

function HeroBannerChooseBudget() {
  const { t } = useTranslation();
  return (
    <HeroBannerTemplate
      imageSrc={hero}
      DescriptionComponent={
        <>
          <HeroTimeline
            states={[
              { name: 'City', value: 'toronto' },
              { name: 'Move Date', value: '01/09/2021' },
              { name: 'Budget' },
            ]}
          />
          <Text variant="banner-title" ink="light">{t('bannerTitle')}</Text>
          <Text variant="banner-subtitle" ink="light" style={styles.heroSubtitle}>
            {t('bannerSubtitle')}
          </Text>
        </>
      }
      footerNode={'Liberty Village, Toronto'}
    />
  );
}

HeroBannerChooseBudget.width = hero.width;
HeroBannerChooseBudget.height = hero.height;

const styles = StyleSheet.create({
  heroText: {
    color: Token.colors.white,
  },
  heroSubtitle: {
    paddingTop: Token.spacing.l,
  },
});

export default HeroBannerChooseBudget;