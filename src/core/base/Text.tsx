import React from 'react';
import { StyleSheet, Text as RNText, TextProps } from 'react-native';
import { fontSize, typography } from './Token';

interface Props extends TextProps {
  children: React.ReactNode;
  variant?: 'banner-title' | 'banner-subtitle' | 'title-1' | 'title-2' | 'title-3' | 'baseline';
}

function Text({ children, variant = 'baseline', style, ...restProps }: Props) {
  let variantStyle = {};

  switch (variant) {
  case 'banner-title':
    variantStyle = StyleSheet.flatten([style, styles.bannerTitle]);
    break;
  case 'banner-subtitle':
    variantStyle = StyleSheet.flatten([style, styles.bannerSubtitle]);
    break;
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
  bannerTitle: {
    fontSize: fontSize.super,
    fontWeight: '700',
  },
  bannerSubtitle: {
    fontSize: fontSize.large,
    fontWeight: '400',
  },
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
