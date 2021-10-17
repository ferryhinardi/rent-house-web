import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'core/base';
import { Token } from 'core';
import assets from 'assets';
import Swiper from '../Swiper';
import { ApplicationData } from 'types';

type Props = {
  application?: ApplicationData;
};
var formatter = new Intl.DateTimeFormat('default', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export default function ApplicationDetailContent(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.row}>
          <Text style={styles.field}>{'City'}</Text>
          <Text style={styles.value}>{props.application?.city}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.field}>{'Budget'}</Text>
          <Text style={styles.value}>{props.application?.budget}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.field}>{'Moving Date'}</Text>
          <Text style={styles.value}>
            {props.application?.moving_date && formatter.format(Date.parse(props.application?.moving_date as string))}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.field}>{'Application Status'}</Text>
          <Text style={styles.value}>{props.application?.status as string}</Text>
        </View>

        <Text style={styles.field}>{'Deposit paid will be returned if the application is cancelled'}</Text>
      </View>
      <Swiper
        innerContainerStyle={{
          width: assets.avatar.width,
          height: assets.avatar.height,
        }}
        minDistanceForAction={0.1}
        controlsProps={{
          dotsTouchable: true,
          prevPos: 'left',
          nextPos: 'right',
          // eslint-disable-next-line
          NextComponent: ({ onPress }) => (
            <Button
              IconStart="chevron-right"
              onPress={onPress}
              variant="outline"
              elevation
              borderColor={Token.colors.white}
              style={{
                minWidth: 0,
                width: 16,
                height: 16,
                paddingHorizontal: Token.spacing.m,
              }}
            />
          ),
          // eslint-disable-next-line
          PrevComponent: ({ onPress }) => (
            <Button
              IconStart="chevron-left"
              onPress={onPress}
              variant="outline"
              elevation
              borderColor={Token.colors.white}
              style={{
                minWidth: 0,
                width: 16,
                height: 16,
                paddingHorizontal: Token.spacing.m,
              }}
            />
          ),
        }}>
        <Card imageProps={assets.avatar} />
        <Card imageProps={assets.avatar} />
        <Card imageProps={assets.avatar} />
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: Token.spacing.xxl,
  },
  wrapper: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Token.spacing.m,
  },
  field: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '10%',
  },
  value: { marginHorizontal: Token.spacing.l },
});
