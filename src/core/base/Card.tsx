import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { colors, border } from './Token';

interface Props extends ViewProps {
  children: any;
}

function Card({ style, ...restProps }: Props) {
  return (
    <View {...restProps} style={[styles.container, style]} />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: border.radius.default,
  },
});

export default Card;
