import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import assets from 'assets';

import { Token } from 'core';

export default function Partners() {
  return (
    <View style={styles.container}>
      <Image src={assets.parnerLogo} alt="partner-logo" />
      <Image
        src={assets.mintoLogo}
        blurDataURL={assets.mintoLogo}
        placeholder="blur"
        width={assets.mintoLogo.width}
        height={assets.mintoLogo.height}
        alt="minto-logo"
      />
      <Image
        src={assets.kingsetLogo}
        blurDataURL={assets.kingsetLogo}
        placeholder="blur"
        width={assets.kingsetLogo.width}
        height={assets.kingsetLogo.height}
        alt="kingset-logo"
      />
      <Image
        src={assets.bentallGreenOakLogo}
        blurDataURL={assets.bentallGreenOakLogo}
        placeholder="blur"
        width={assets.bentallGreenOakLogo.width}
        height={assets.bentallGreenOakLogo.height}
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
