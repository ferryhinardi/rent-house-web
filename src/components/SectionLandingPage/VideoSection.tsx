import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';

import assets from 'assets';

export default function VideoSection() {
  return (
    <View style={styles.container}>
      <Image
        src={assets.videoSection}
        loading="eager"
        layout="fill"
        objectFit="cover"
        alt="video-section"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: assets.videoSection.height,
  },
});
