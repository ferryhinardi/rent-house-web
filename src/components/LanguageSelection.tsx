import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';

import { SelectInput } from 'core/base';
import { languageOptions as options } from 'core/constants';

export default function LanguageSelection() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          src={options[0].icon}
          blurDataURL={options[0].icon}
          placeholder="blur"
          alt="language-flag"
          width={24}
          height={12}
        />
      </View>
      <SelectInput
        instanceId="language-selection"
        defaultValue={options[0]}
        options={options}
      />
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
});
