import React from 'react';
import { View, StyleSheet } from 'react-native';
import Image from 'next/image';
import hero from '../assets/hero.svg';
import Questionaire from './Questionaire';

function Hero() {
  return (
    <View style={styles.container}>
      <Image src={hero} alt="hero-image" />
      <View style={styles.containerSignUpForm}>
        <Questionaire />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerSignUpForm: {
    marginLeft: -250,
  },
});

export default Hero;
