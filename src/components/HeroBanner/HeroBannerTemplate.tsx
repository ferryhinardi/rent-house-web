import React from 'react';
import { View, StyleSheet } from 'react-native';
import Image, { ImageLoaderProps } from 'next/image';
import { Token } from 'core';
import { Text } from 'core/base';

type Props = {
  imageSrc: ImageLoaderProps['src'],
  DescriptionComponent: React.ReactNode;
  footerNode: React.ReactNode;
};

function HeroBannerTemplate({ imageSrc, DescriptionComponent, footerNode }: Props) {
  return (
    <View style={styles.heroImageWrapper}>
      <View style={styles.imageWrapper}>
        <Image
          src={imageSrc}
          loading="eager"
          layout="fill"
          objectFit="cover"
          alt="hero-image"
        />
      </View>
      <View style={styles.heroDescription}>
        {DescriptionComponent}
      </View>
      <Text ink="light" style={styles.footerText}>{footerNode}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heroImageWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
  },
  imageWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: -1,
  },
  placeholder: {
    backgroundColor: Token.colors.grey,
    width: '100%',
    height: '100%',
  },
  heroDescription: {
    paddingLeft: Token.spacing.xl,
    alignItems: 'flex-start',
    width: 600,
  },
  footerText: {
    marginLeft: Token.spacing.xl,
  },
});

export default HeroBannerTemplate;
