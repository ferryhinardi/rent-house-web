import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'core/base';
import { Token } from 'core';
import avatar from 'assets/avatar-sample.svg';

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

      <Card
        imageProps={{
          src: avatar,
          layout: 'fixed',
        }}
        style={{ alignItems: 'flex-end' }}
      />
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
