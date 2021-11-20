import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import assets from 'assets';
import { Token } from 'core';
import { Text } from 'core/base';

export default function Partners() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text variant="header-2">{t('ourPartners')}</Text>
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
    alignItems: 'center',
  },
});
