import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Placeholder as RNPlaceholder,
  PlaceholderLine,
  ShineOverlay,
} from 'rn-placeholder';
import { Token } from 'core';

export default function Placeholder() {
  return (
    <RNPlaceholder Animation={ShineOverlay} style={styles.container}>
      <View style={styles.container}>
        <View style={styles.line}>
          <PlaceholderLine height={200} noMargin />
        </View>
        <View style={styles.line}>
          <PlaceholderLine height={200} noMargin />
        </View>
        <View style={styles.line}>
          <PlaceholderLine height={200} noMargin />
        </View>
        <View style={styles.line}>
          <PlaceholderLine height={200} noMargin />
        </View>
      </View>
    </RNPlaceholder>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xs,
  },
  line: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '48%',
  },
});
