import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import PreferenceBanner from 'assets/preference-banner.svg';

export default function Banner() {
  return (
    <View style={styles.container}>
      <Image
        src={PreferenceBanner}
        alt="preference banner"
        loading="eager"
        layout="fill"
        objectFit="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: PreferenceBanner.height,
  },
});
