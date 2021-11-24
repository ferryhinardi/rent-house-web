import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import tailwind from 'tailwind-rn';
import { Text } from 'core/base';
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
        <View style={styles.container}>
          <View style={[styles.overlay, styles.assetContainer]} />
          <video
            style={{ ...tailwind('rounded-br-3xl'), ...{}, height: hero.height, objectFit: 'cover' }}
            muted
            autoPlay
            loop>
            <source src={videoSrc} />
          </video>
        </View>
      }
      DescriptionComponent={
        <>
          <Text font="playfair" variant="headline-1" ink="light" style={tailwind('flex-wrap')}>
            {t('bannerTitle')}
          </Text>
          <Text variant="caption" ink="light" style={tailwind('py-5')}>
            {t('bannerSubtitle')}
          </Text>
        </>
      }
      footerNode={'Liberty Village, Toronto'}
      width={hero.width}
      height={hero.height}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  assetContainer: {
    borderBottomRightRadius: 40,
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: 'rgba(12, 27, 64, 0.5)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 10,
  },
});

export default HeroBannerInitial;
