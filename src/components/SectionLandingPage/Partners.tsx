import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import { Text } from 'core/base';
import assets from 'assets';

import { Token } from 'core';

export default function Partners() {
  return (
    <View style={styles.container}>
      <Text font="playfair" variant="header-2" ink="dark" style={styles.partnersText}>
        {'Our Partners'}
      </Text>
      <Image {...assets.mintoLogo} placeholder="blur" alt="minto-logo" />
      <Image {...assets.kingsetLogo} placeholder="blur" alt="kingset-logo" />
      <Image {...assets.bentallGreenOakLogo} placeholder="blur" alt="bentallGreenOak-logo" />
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
  partnersText: {
    alignSelf: 'center',
  },
});
