import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'core/base';
import { Token } from 'core';
import assets from 'assets';
import Swiper from '../Swiper';

export default function ApplicationDetailContent() {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.row}>
          <Text style={styles.field}>{'City'}</Text>
          <Text style={styles.value}>{'Toronto'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.field}>{'Budget'}</Text>
          <Text style={styles.value}>{'$1500'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.field}>{'Moving Date'}</Text>
          <Text style={styles.value}>{'21 Aug 2021'}</Text>
        </View>
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
        }}
      >
        <Card
          imageProps={{
            src: assets.avatar,
            layout: 'fixed',
          }}
        />
        <Card
          imageProps={{
            src: assets.avatar,
            layout: 'fixed',
          }}
        />
        <Card
          imageProps={{
            src: assets.avatar,
            layout: 'fixed',
          }}
        />
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
