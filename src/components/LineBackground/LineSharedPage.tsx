import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import assets from 'assets';

export default function LineSharedPage() {
  return (
    <View style={styles.lineContainer}>
      <Image src={assets.accountLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  lineContainer: {
    width: '50vw',
    top: 0,
    right: 0,
    position: 'absolute',
    height: 250,
  },
});
