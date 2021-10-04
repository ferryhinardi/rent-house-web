import React from 'react';
import { StyleSheet, Text as RNText, TextProps } from 'react-native';
import { fontSize, colors, typography } from './Token';

interface Props extends TextProps {
  children: React.ReactNode;
  variant?:
    | 'banner-title'
    | 'banner-subtitle'
    | 'sidebar-menu'
    | 'header-2'
    | 'header-3'
    | 'header-4'
    | 'title-1'
    | 'title-2'
    | 'title-3'
    | 'huge'
    | 'big'
    | 'large'
    | 'caption'
    | 'baseline'
    | 'small'
    | 'tiny';
  ink?:
    | 'normal'
    | 'primary'
    | 'secondary'
    | 'caption'
    | 'neutral'
    | 'dark'
    | 'light'
    | 'alert'
    | 'link';
  font?: 'standard' | 'playfair';
}

function Text({
  children,
  variant = 'baseline',
  ink = 'normal',
  style,
  font,
  ...restProps
}: Props) {
  let variantStyle = {};

  switch (font) {
    case 'playfair':
      variantStyle = StyleSheet.flatten([styles.playfair]);
      break;
    case 'standard':
    default:
      variantStyle = StyleSheet.flatten([styles.defaultFont]);
      break;
  }

  switch (variant) {
    case 'banner-title':
      variantStyle = StyleSheet.flatten([variantStyle, styles.bannerTitle]);
      break;
    case 'banner-subtitle':
      variantStyle = StyleSheet.flatten([variantStyle, styles.bannerSubtitle]);
      break;
    case 'sidebar-menu':
      variantStyle = StyleSheet.flatten([variantStyle, styles.sidebarMenu]);
      break;
    case 'header-2':
      variantStyle = StyleSheet.flatten([variantStyle, styles.header2]);
      break;
    case 'header-3':
      variantStyle = StyleSheet.flatten([variantStyle, styles.header3]);
      break;
    case 'header-4':
      variantStyle = StyleSheet.flatten([variantStyle, styles.header4]);
      break;
    case 'title-1':
      variantStyle = StyleSheet.flatten([variantStyle, styles.title1]);
      break;
    case 'title-2':
      variantStyle = StyleSheet.flatten([variantStyle, styles.title2]);
      break;
    case 'title-3':
      variantStyle = StyleSheet.flatten([variantStyle, styles.title3]);
      break;
    case 'huge':
      variantStyle = StyleSheet.flatten([variantStyle, styles.huge]);
      break;
    case 'big':
      variantStyle = StyleSheet.flatten([variantStyle, styles.big]);
      break;
    case 'large':
      variantStyle = StyleSheet.flatten([variantStyle, styles.large]);
      break;
    case 'caption':
      variantStyle = StyleSheet.flatten([variantStyle, styles.caption]);
      break;
    case 'small':
      variantStyle = StyleSheet.flatten([variantStyle, styles.small]);
      break;
    case 'tiny':
      variantStyle = StyleSheet.flatten([variantStyle, styles.tiny]);
      break;
    case 'baseline':
    default:
      variantStyle = StyleSheet.flatten([variantStyle, styles.baseline]);
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
    case 'caption':
      variantStyle = StyleSheet.flatten([variantStyle, styles.captionInk]);
      break;
    case 'neutral':
      variantStyle = StyleSheet.flatten([variantStyle, styles.neutral]);
      break;
    case 'link':
      variantStyle = StyleSheet.flatten([variantStyle, styles.link]);
      break;
    case 'normal':
    default:
      variantStyle = StyleSheet.flatten([variantStyle, styles.normal]);
      break;
  }

  variantStyle = StyleSheet.flatten([variantStyle, style]);

  return (
    <RNText {...restProps} style={variantStyle}>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  bannerTitle: {
    fontSize: fontSize.super,
    fontWeight: '700',
    lineHeight: 80,
  },
  bannerSubtitle: {
    fontSize: fontSize.large,
    fontWeight: '400',
  },
  sidebarMenu: {
    fontSize: fontSize.medium,
    lineHeight: 20,
    fontWeight: '600',
  },
  header2: {
    fontSize: fontSize.xlarge,
    lineHeight: 48,
    fontWeight: '600',
  },
  header3: {
    fontSize: fontSize.bigger,
    lineHeight: 42,
    fontWeight: '700',
  },
  header4: {
    fontSize: fontSize.big,
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
  huge: {
    fontSize: fontSize.huge,
    fontWeight: '400',
  },
  big: {
    fontSize: fontSize.big,
    fontWeight: '400',
  },
  large: {
    fontSize: fontSize.large,
    fontWeight: '400',
  },
  caption: {
    fontSize: fontSize.jumbo,
    fontWeight: '400',
    lineHeight: 32,
  },
  baseline: {
    fontSize: fontSize.medium,
    lineHeight: 24,
  },
  small: {
    fontSize: fontSize.small,
    fontWeight: '400',
  },
  tiny: {
    fontSize: fontSize.tiny,
    fontWeight: '400',
  },
  button: {
    fontSize: fontSize.medium,
  },
  dark: {
    color: colors.rynaBlack,
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
    color: colors.rynaBlue,
  },
  secondary: {
    color: colors.gold,
  },
  neutral: {
    color: colors.darkGrey,
  },
  link: {
    color: colors.rynaLink,
  },
  captionInk: {
    color: colors.lightGrey,
  },
  defaultFont: {},
  playfair: {
    ...typography.Baseline,
  },
});

export default Text;
