import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text, ContainerDesktop } from 'core/base';
import { Token } from 'core';
import MapWrapper from './MapWrapper';

type Props = {
  lat: number;
  lon: number;
};

function MapLocation(props: Props) {
  const { t } = useTranslation();

  return (
    <ContainerDesktop style={styles.container}>
      <Text variant="header-2" ink="primary" style={styles.title}>
        {t('mapLocationTitle')}
      </Text>
      <Text variant="caption" style={styles.description}>
        {t('mapLocationDescription')}
      </Text>

      <MapWrapper lat={props.lat} lon={props.lon} />
    </ContainerDesktop>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Token.spacing.xxxxl,
  },
  title: {
    marginBottom: Token.spacing.m,
  },
  description: {
    marginBottom: Token.spacing.xxl,
  },
});

export default MapLocation;
