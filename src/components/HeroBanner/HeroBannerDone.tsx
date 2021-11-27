import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { Text } from 'core/base';
import assets from 'assets';
import HeroBannerTemplate from './HeroBannerTemplate';
import HeroTimeline from './HeroTimeline';
import { HeroStates } from '../HeroBanner';
import useTailwind from 'hooks/useTailwind';

const hero = assets.hero3;

type Props = {
  states: HeroStates;
  onChange?: (index: number) => void;
};

function HeroBannerDone({ states, onChange }: Props) {
  const { t } = useTranslation();
  const { md } = useTailwind();
  return (
    <HeroBannerTemplate
      imageProps={{ ...hero, placeholder: 'blur' }}
      DescriptionComponent={
        <>
          <HeroTimeline states={states} onChange={onChange} />
          {!md && (
            <>
              <Text variant="headline-1" ink="light">
                {t('bannerTitle')}
              </Text>
              <Text variant="caption" ink="light" style={styles.heroSubtitle}>
                {t('bannerSubtitle')}
              </Text>
            </>
          )}
        </>
      }
      footerNode={md ? undefined : 'Liberty Village, Toronto'}
      width={hero.width}
      height={md ? undefined : hero.height}
    />
  );
}

const styles = StyleSheet.create({
  heroSubtitle: {
    paddingTop: Token.spacing.l,
  },
});

export default HeroBannerDone;
