import React from 'react';
import { View, StyleSheet } from 'react-native';
import Image, { ImageProps } from 'next/image';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Token } from 'core';
import { Text } from 'core/base';

type Props = {
  imageProps: ImageProps;
  DescriptionComponent: React.ReactNode;
  footerNode: React.ReactNode;
};

function HeroBannerTemplate({
  imageProps,
  DescriptionComponent,
  footerNode,
}: Props) {
  return (
    <View style={styles.heroImageWrapper}>
      <View style={styles.imageWrapper}>
        <Image
          {...imageProps}
          loading="eager"
          objectFit="cover"
          alt="hero-image"
        />
      </View>
      <View style={styles.heroDescription}>{DescriptionComponent}</View>
      <View style={styles.footer}>
        <Icon name="map-marker" size={24} color={Token.colors.white} />
        <Text ink="light" style={styles.footerText}>
          {footerNode}
        </Text>
      </View>
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
  footer: {
    marginLeft: Token.spacing.xl,
    flexDirection: 'row',
  },
  footerText: {
    marginLeft: Token.spacing.s,
  },
});

export default HeroBannerTemplate;
