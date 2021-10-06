import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { Text } from 'core/base';
import assets from 'assets';
import HeroBannerTemplate from './HeroBannerTemplate';
import HeroTimeline from './HeroTimeline';
import { HeroStates } from '../HeroBanner';

const hero = assets.hero1;

type Props = {
  states: HeroStates;
  onChange?: (index: number) => void;
};

function HeroBannerChooseDate({ states, onChange }: Props) {
  const { t } = useTranslation();
  return (
    <HeroBannerTemplate
      imageProps={{
        src: hero,
      }}
      DescriptionComponent={
        <>
          <HeroTimeline states={states} onChange={onChange} />
          <Text variant="banner-title" ink="light">
            {t('bannerTitle')}
          </Text>
          <Text variant="caption" ink="light" style={styles.heroSubtitle}>
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
  heroSubtitle: {
    paddingTop: Token.spacing.l,
  },
});

export default HeroBannerChooseDate;
