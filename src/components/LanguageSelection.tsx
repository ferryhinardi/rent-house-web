import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';

import { SelectInput, Text } from 'core/base';
import { Token } from 'core';
import { languageOptions as options } from 'core/constants';

export default function LanguageSelection() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image src={options[0].icon} alt="language-flag" width={24} height={12} />
      </View>
      <Text style={styles.label} variant="body">
        {options[0].label}
      </Text>
      {/* <SelectInput instanceId="language-selection" defaultValue={options[0]} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    display: 'flex',
  },
  imageContainer: {
    justifyContent: 'center',
  },
  label: {
    marginHorizontal: Token.spacing.s,
  },
});
