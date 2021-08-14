import React from 'react';
import { StyleSheet, Text as RNText, TextProps } from 'react-native';
import { fontSize, typography } from './Token';

interface Props extends TextProps {
  children: React.ReactNode;
  variant?: 'title-1' | 'title-2' | 'title-3' | 'baseline';
}

function Text({ children, variant = 'baseline', style, ...restProps }: Props) {
  let variantStyle = {};

  switch (variant) {
  case 'title-1':
    variantStyle = StyleSheet.flatten([style, styles.title1]);
    break;
  case 'title-2':
    variantStyle = StyleSheet.flatten([style, styles.title2]);
    break;
  case 'title-3':
    variantStyle = StyleSheet.flatten([style, styles.title3]);
    break;
  case 'baseline':
  default:
    variantStyle = StyleSheet.flatten([style, styles.baseline]);
    break;
  }

  return (
    <RNText {...restProps} style={variantStyle}>{children}</RNText>
  );
}

const styles = StyleSheet.create({
  title1: {
    fontSize: fontSize.huge,
    fontWeight: 'bold',
  },
  title2: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
  },
  title3: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
  },
  baseline: {
    ...typography.Baseline,
  }
});

export default Text;
