import React from 'react';
import { StyleSheet } from 'react-native';
import { Token } from 'core';
import { Text } from 'core/base';
import hero from 'assets/hero-1.svg';
import HeroBannerTemplate from './HeroBannerTemplate';

function HeroBannerChooseDate() {
  return (
    <HeroBannerTemplate
      imageSrc={hero}
      DescriptionComponent={
        <>
          <Text variant="banner-title" style={styles.heroText}>{'Homes to Empower Women'}</Text>
          <Text variant="banner-subtitle" style={[styles.heroText, styles.heroSubtitle]}>{'Young, working hard, and want those killer city views? We’ve got properties – unique to your needs.'}</Text>
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