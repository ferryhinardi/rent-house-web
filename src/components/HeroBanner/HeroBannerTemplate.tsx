import React from 'react';
import { View } from 'react-native';
import Image, { ImageProps } from 'next/image';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Token } from 'core';
import { Text } from 'core/base';
import useTailwind from 'hooks/useTailwind';

type Props = {
  imageProps?: ImageProps;
  DescriptionComponent: React.ReactNode;
  footerNode?: React.ReactNode;
  video?: React.ReactNode;
  width?: number;
  height?: number;
};

function HeroBannerTemplate({ imageProps, DescriptionComponent, footerNode, video, width, height }: Props) {
  const { tailwind, tailwindResponsive, md } = useTailwind();
  return (
    <View style={tailwind('justify-around')}>
      <View style={tailwindResponsive('absolute top-0 bottom-0 left-0 right-0', { md: 'w-screen' }, { md })}>
        {video ??
          (imageProps && (
            <Image
              {...imageProps}
              layout="responsive"
              objectFit="cover"
              width={imageProps.width as number}
              height={imageProps.height as number}
              alt="hero-image"
            />
          ))}
      </View>
      <View
        style={[
          { width, height },
          tailwindResponsive('flex flex-col flex-auto items-start justify-evenly', { md: 'w-0' }, { md }),
        ]}>
        <View style={tailwind('pl-10 items-start')}>{DescriptionComponent}</View>
        {footerNode && (
          <View style={tailwind('pl-10 py-8 flex-row')}>
            <Icon name="map-marker" size={24} color={Token.colors.white} />
            <Text ink="light" style={tailwind('ml-2')}>
              {footerNode}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default HeroBannerTemplate;
