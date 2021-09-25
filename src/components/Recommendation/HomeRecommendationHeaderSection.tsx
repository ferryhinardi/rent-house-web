import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import { Text, ContainerDesktop } from 'core/base';
import { Token } from 'core';
import ScheduleTourForm from './ScheduleTourForm';
import { House } from 'types';
import config from 'config';

type Props = {
  house: House;
};

export default function HomeRecommendationHeaderSection(props: Props) {
  return (
    <ContainerDesktop style={styles.container}>
      <View style={styles.homeInfoContainer}>
        <Text variant="banner-title" ink="dark">
          {props.house.name}
        </Text>
        <Text variant="caption" style={styles.homeInfoDescription}>
          {props.house.description}
        </Text>
        <ScheduleTourForm house={props.house} />
      </View>

      <View>
        <Image
          src={`${config.imageHost}/${props.house.lead_media}`}
          alt={`galery-1`}
          width={744}
          height={378}
          objectFit="cover"
        />
        <View style={styles.imageCollections}>
          {props.house.galleries.map((item, i) => (
            <Image
              key={i}
              src={`${config.imageHost}/${item}`}
              alt={`galery-${i + 1}`}
              width={243}
              height={205}
              objectFit="cover"
            />
          ))}
        </View>
      </View>
    </ContainerDesktop>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Token.spacing.xxxxl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xxxxl,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  homeInfoContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '30%',
  },
  homeInfoDescription: {
    marginTop: Token.spacing.l,
  },
  imageCollections: {
    marginTop: 38,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '66%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Token.spacing.l,
  },
});
