import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Placeholder as RNPlaceholder,
  PlaceholderLine,
  PlaceholderMedia,
  ShineOverlay,
} from 'rn-placeholder';
import { Token } from 'core';

export default function Placeholder() {
  return (
    <RNPlaceholder Animation={ShineOverlay} style={styles.container}>
      <View style={styles.container}>
        <View style={styles.line}>
          <View style={styles.wrapper}>
            <PlaceholderMedia size={150} />
            <View style={styles.wrapperInfo}>
              <PlaceholderLine width={30} style={styles.placeholderTitle} />
              <PlaceholderLine style={styles.placeholderDescription} />
              <PlaceholderLine style={styles.placeholderDescription} />
              <PlaceholderLine style={styles.placeholderDescription} />
            </View>
          </View>
        </View>
        <View style={styles.line}>
          <View style={styles.wrapper}>
            <PlaceholderMedia size={150} />
            <View style={styles.wrapperInfo}>
              <PlaceholderLine width={30} style={styles.placeholderTitle} />
              <PlaceholderLine style={styles.placeholderDescription} />
              <PlaceholderLine style={styles.placeholderDescription} />
              <PlaceholderLine style={styles.placeholderDescription} />
            </View>
          </View>
        </View>
      </View>
    </RNPlaceholder>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Token.spacing.xs,
    paddingHorizontal: Token.spacing.xxxxl,
    marginBottom: Token.spacing.xxxxl,
  },
  line: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '48%',
  },
  wrapper: {
    flexDirection: 'row',
    marginRight: Token.spacing.l,
  },
  wrapperInfo: {
    flex: 1,
  },
  placeholderTitle: {
    marginTop: Token.spacing.xs,
    marginLeft: Token.spacing.m,
    marginBottom: Token.spacing.l,
  },
  placeholderDescription: {
    marginLeft: Token.spacing.m,
  },
});
