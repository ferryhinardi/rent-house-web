import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';

import parnerLogo from 'assets/partner-logo.svg';
import mintoLogo from 'assets/partner-minto.svg';
import kingsetLogo from 'assets/partner-kingset.svg';
import bentallGreenOakLogo from 'assets/partner-bentallGreenOak.svg';
import { imageDataBase64 as mintoBase64 } from 'assets/partner-minto';
import { imageDataBase64 as kingsetBase64 } from 'assets/partner-kingset';
import { imageDataBase64 as bentallGreenOakBase64 } from 'assets/partner-bentallGreenOak';

import { Token } from 'core';

export default function Partners() {
  return (
    <View style={styles.container}>
      <Image src={parnerLogo} alt="partner-logo" />
      <Image
        src={mintoLogo}
        blurDataURL={mintoBase64}
        placeholder="blur"
        width={mintoLogo.width}
        height={mintoLogo.height}
        alt="partner-logo"
      />
      <Image
        src={kingsetLogo}
        blurDataURL={kingsetBase64}
        placeholder="blur"
        width={kingsetLogo.width}
        height={kingsetLogo.height}
        alt="partner-logo"
      />
      <Image
        src={bentallGreenOakLogo}
        blurDataURL={bentallGreenOakBase64}
        placeholder="blur"
        width={bentallGreenOakLogo.width}
        height={bentallGreenOakLogo.height}
        alt="partner-logo"
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
