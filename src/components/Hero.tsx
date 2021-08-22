import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSpring, useSprings, animated, config } from 'react-spring';
import {
  HeroBannerInitial,
  HeroBannerChooseDate,
  HeroBannerChooseBudget,
  HeroBannerDone,
} from './HeroBanner';
import Questionaire from './Questionaire';

const AnimatedView = animated(View);
const heros = [
  HeroBannerInitial,
  HeroBannerChooseDate,
  HeroBannerChooseBudget,
  HeroBannerDone,
];

function Hero() {
  const [heroImageIdx, setHeroImageIdx] = useState(0);
  const herosSprings = useSprings(
    heros.length,
    heros.map((item, index) =>
      index === heroImageIdx
        ? {
            opacity: 1,
            width: item.width,
            height: item.height,
            position: 'relative',
          }
        : { opacity: 0, position: 'absolute' }
    )
  );
  const animateStyleQuestionaire = useSpring({
    from: { opacity: 0, transform: 'translate3d(-25%, 0px, 0px)' },
    to: { opacity: 1, transform: 'translate3d(0%, 0px, 0px)' },
    config: config.molasses,
  });
  const onSubmit = () => {
    if (heroImageIdx + 1 < heros.length) setHeroImageIdx((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      {herosSprings.map((animateStyle, idx) => {
        const HeroDescription = heros[idx];
        return (
          <AnimatedView
            key={`${idx}`}
            // @ts-ignore
            style={animateStyle}
          >
            <HeroDescription />
          </AnimatedView>
        );
      })}
      <AnimatedView
        // @ts-ignore
        style={animateStyleQuestionaire}
      >
        <View style={styles.containerSignUpForm}>
          <Questionaire onSubmit={onSubmit} />
        </View>
      </AnimatedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerSignUpForm: {
    marginLeft: -200,
  },
});

export default Hero;
