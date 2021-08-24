import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import VideoSectionImage from 'assets/video-section.svg';

export default function VideoSection() {
  return (
    <View style={styles.container}>
      <Image
        src={VideoSectionImage}
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
    width: '100%',
    height: VideoSectionImage.height,
  },
});
