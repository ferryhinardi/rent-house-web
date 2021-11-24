import React from 'react';
import { View } from 'react-native';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Text } from 'core/base';
import assets from 'assets';
import useTailwind from 'hooks/useTailwind';

const mediaAssets = [assets.supportMedia1, assets.supportMedia2, assets.supportMedia3];

export default function SupportingMedia() {
  const { t } = useTranslation();
  const { tailwind, tailwindResponsive, md } = useTailwind();
  return (
    <View style={tailwind('flex flex-1 justify-center items-center py-16 px-4 my-16')}>
      <Text variant="header-2" ink="primary" style={tailwind('mb-16')}>
        {t('supportingMediaTitle')}
      </Text>
      <View style={tailwindResponsive('flex-row flex-wrap flex-gap-4', { md: 'flex-col' }, { md })}>
        {mediaAssets.map((image, index) => (
          <Image key={`${index}`} {...image} placeholder="blur" alt="media-1" />
        ))}
      </View>
    </View>
  );
}
