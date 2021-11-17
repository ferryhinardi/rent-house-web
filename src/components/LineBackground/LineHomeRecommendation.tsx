import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import assets from 'assets';

export default function LineHomeRecommendation() {
  return (
    <React.Fragment>
      <View style={styles.lineContainer1}>
        <Image src={assets.homeRecommendationLine1} />
      </View>
      <View style={styles.lineContainer2}>
        <Image src={assets.homeRecommendationLine2} />
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  lineContainer1: {
    width: '100vw',
    top: '80vh',
    left: 0,
    right: 0,
    position: 'absolute',
    height: 250,
    transform: [{ rotate: '2deg' }],
    // transform: 'rotate(-165deg)',
  },
  lineContainer2: {
    width: '47vw',
    top: '87vh',
    right: 0,
    position: 'absolute',
    height: 250,
  },
});
