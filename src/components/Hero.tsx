import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSpring, animated, config } from 'react-spring';
import Image from 'next/image';
import hero from '../assets/hero.svg';
import Questionaire from './Questionaire';

const AnimatedView = animated(View);

function Hero() {
  const animateStyleVideo = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.molasses,
  });
  const animateStyleQuestionaire = useSpring({
    from: { opacity: 0, transform: "translate3d(-25%, 0px, 0px)" },
    to: { opacity: 1, transform: "translate3d(0%, 0px, 0px)" },
    config: config.molasses,
  });
  return (
    <View style={styles.container}>
      <AnimatedView
        // @ts-ignore
        style={animateStyleVideo}
      >
        <Image src={hero} loading="eager" alt="hero-image" />
      </AnimatedView>
      <AnimatedView
        // @ts-ignore
        style={animateStyleQuestionaire}
      >
        <View style={styles.containerSignUpForm}>
          <Questionaire />
        </View>
      </AnimatedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: -1,
  },
  containerSignUpForm: {
    marginLeft: -250,
  },
});

export default Hero;
