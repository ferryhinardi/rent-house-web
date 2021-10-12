import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import assets from 'assets';

import { Token } from 'core';

export default function Partners() {
  return (
    <View style={styles.container}>
      <Image {...assets.parnerLogo} placeholder="blur" alt="partner-logo" />
      <Image {...assets.mintoLogo} placeholder="blur" alt="minto-logo" />
      <Image {...assets.kingsetLogo} placeholder="blur" alt="kingset-logo" />
      <Image
        {...assets.bentallGreenOakLogo}
        placeholder="blur"
        alt="bentallGreenOak-logo"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: Token.spacing.xxxl,
    zIndex: -1,
  },
});
