import React from 'react';
import { StyleSheet } from 'react-native';
import { Token } from 'core';
import { Text, Button } from 'core/base';
import hero from 'assets/hero-0.svg';
import HeroBannerTemplate from './HeroBannerTemplate';

function HeroBannerInitial() {
  return (
    <HeroBannerTemplate
      imageSrc={hero}
      DescriptionComponent={
        <>
          <Text variant="banner-title" style={styles.heroText}>{'Homes to Empower Women'}</Text>
          <Text variant="banner-subtitle" style={[styles.heroText, styles.heroSubtitle]}>{'Young, working hard, and want those killer city views? We’ve got properties – unique to your needs.'}</Text>
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
  heroText: {
    color: Token.colors.white,
  },
  heroSubtitle: {
    paddingVertical: Token.spacing.l,
  },
});

export default HeroBannerInitial;
