import React from 'react';
import { StyleSheet, View } from 'react-native';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Text, ContainerDesktop } from 'core/base';
import { Token } from 'core';

export default function FloorPlan() {
  const { t } = useTranslation();
  return (
    <ContainerDesktop>
      <Text variant="header-2" ink="primary" style={styles.title}>
        {t('floorPlanTitle')}
      </Text>
      <Text variant="caption" style={styles.description}>
        {t('floorPlanDescription')}
      </Text>
      <View style={styles.imageWrapper}>
        <Image src={require('assets/floor-plan-sample.svg')} alt="floor plan" />
      </View>
    </ContainerDesktop>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: Token.spacing.m,
  },
  description: {
    marginBottom: Token.spacing.xxl,
  },
  imageWrapper: {
    alignItems: 'flex-start',
  },
});
