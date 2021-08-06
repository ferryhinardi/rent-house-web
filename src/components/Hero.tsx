import React from 'react';
import { View, StyleSheet } from 'react-native';
import Image from 'next/image';
import hero from '../assets/hero.svg';
import SignUp from './SignUp';

function Hero() {
  return (
    <View style={styles.container}>
      <Image src={hero} />
      <View style={styles.containerSignUpForm}>
        <SignUp />
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
