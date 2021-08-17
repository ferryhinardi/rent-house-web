import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { Text } from 'core/base';
import hero from 'assets/hero-1.svg';
import HeroBannerTemplate from './HeroBannerTemplate';
import HeroTimeline from './HeroTimeline';

function HeroBannerChooseDate() {
  const { t } = useTranslation();
  return (
    <HeroBannerTemplate
      imageSrc={hero}
      DescriptionComponent={
        <>
          <HeroTimeline
            states={[
              { name: t('timelineCity'), value: 'toronto' },
              { name: t('timelineMoveDate') },
              { name: t('timelineBudget'), },
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

HeroBannerChooseDate.width = hero.width;
HeroBannerChooseDate.height = hero.height;

const styles = StyleSheet.create({
  heroText: {
    color: Token.colors.white,
  },
  heroSubtitle: {
    paddingTop: Token.spacing.l,
  },
});


export default HeroBannerChooseDate;