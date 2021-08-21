import React from 'react';
import { StyleSheet, Text as RNText, TextProps } from 'react-native';
import { fontSize, colors, typography } from './Token';

interface Props extends TextProps {
  children: React.ReactNode;
  variant?:
    | 'banner-title'
    | 'banner-subtitle'
    | 'header-navigate'
    | 'title-1'
    | 'title-2'
    | 'title-3'
    | 'large'
    | 'medium-large'
    | 'baseline'
    | 'small'
    | 'tiny';
  ink?: 'normal' | 'primary' | 'secondary' | 'dark' | 'light' | 'alert';
}

function Text({ children, variant = 'baseline', ink = 'normal', style, ...restProps }: Props) {
  let variantStyle = {};

  switch (variant) {
  case 'banner-title':
    variantStyle = StyleSheet.flatten([style, styles.bannerTitle]);
    break;
  case 'banner-subtitle':
    variantStyle = StyleSheet.flatten([style, styles.bannerSubtitle]);
    break;
  case 'header-navigate':
    variantStyle = StyleSheet.flatten([style, styles.headerNavigate]);
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
  case 'large':
    variantStyle = StyleSheet.flatten([style, styles.large]);
    break;
  case 'medium-large':
    variantStyle = StyleSheet.flatten([style, styles.mediumLarge]);
    break;
  case 'small':
    variantStyle = StyleSheet.flatten([style, styles.small]);
    break;
  case 'tiny':
    variantStyle = StyleSheet.flatten([style, styles.tiny]);
    break;
  case 'baseline':
  default:
    variantStyle = StyleSheet.flatten([style, styles.baseline]);
    break;
  }

  switch (ink) {
  case 'dark':
    variantStyle = StyleSheet.flatten([variantStyle, styles.dark]);
    break;
  case 'light':
    variantStyle = StyleSheet.flatten([variantStyle, styles.light]);
    break;
  case 'alert':
    variantStyle = StyleSheet.flatten([variantStyle, styles.alert]);
    break;
  case 'primary':
    variantStyle = StyleSheet.flatten([variantStyle, styles.primary]);
    break;
  case 'secondary':
    variantStyle = StyleSheet.flatten([variantStyle, styles.secondary]);
    break;
  case 'normal':
  default:
    variantStyle = StyleSheet.flatten([variantStyle, styles.normal]);
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
  headerNavigate: {
    fontSize: fontSize.bigger,
    lineHeight: 42,
    fontWeight: '700',
  },
  title1: {
    fontSize: fontSize.huge,
    fontWeight: '700',
  },
  title2: {
    fontSize: fontSize.large,
    fontWeight: '700',
  },
  title3: {
    fontSize: fontSize.medium,
    fontWeight: '700',
  },
  large: {
    fontSize: fontSize.large,
    fontWeight: '400',
  },
  mediumLarge: {
    fontSize: fontSize.jumbo,
    fontWeight: '400',
  },
  baseline: {
    ...typography.Baseline,
  },
  small: {
    fontSize: fontSize.small,
    fontWeight: '400',
  },
  tiny: {
    fontSize: fontSize.tiny,
    fontWeight: '400',
  },
  dark: {
    color: colors.dark,
  },
  light: {
    color: colors.white,
  },
  alert: {
    color: colors.red,
  },
  normal: {
    color: colors.black,
  },
  primary: {
    color: colors.blue,
  },
  secondary: {
    color: colors.gold,
  },
});

export default Text;
