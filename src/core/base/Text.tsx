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
}

function Text({
  children,
  variant = 'baseline',
  ink = 'normal',
  style,
  ...restProps
}: Props) {
  let variantStyle = {};

  switch (variant) {
    case 'banner-title':
      variantStyle = StyleSheet.flatten([style, styles.bannerTitle]);
      break;
    case 'banner-subtitle':
      variantStyle = StyleSheet.flatten([style, styles.bannerSubtitle]);
      break;
    case 'sidebar-menu':
      variantStyle = StyleSheet.flatten([style, styles.sidebarMenu]);
      break;
    case 'header-2':
      variantStyle = StyleSheet.flatten([style, styles.header2]);
      break;
    case 'header-3':
      variantStyle = StyleSheet.flatten([style, styles.header3]);
      break;
    case 'header-4':
      variantStyle = StyleSheet.flatten([style, styles.header4]);
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
    case 'huge':
      variantStyle = StyleSheet.flatten([style, styles.huge]);
      break;
    case 'big':
      variantStyle = StyleSheet.flatten([style, styles.big]);
      break;
    case 'large':
      variantStyle = StyleSheet.flatten([style, styles.large]);
      break;
    case 'caption':
      variantStyle = StyleSheet.flatten([style, styles.caption]);
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

  return (
    <RNText {...restProps} style={variantStyle}>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  bannerTitle: {
    ...typography.Baseline,
    fontSize: fontSize.super,
    fontWeight: '700',
    lineHeight: 80,
  },
  bannerSubtitle: {
    ...typography.Baseline,
    fontSize: fontSize.large,
    fontWeight: '400',
  },
  sidebarMenu: {
    ...typography.Baseline,
    fontSize: fontSize.medium,
    lineHeight: 20,
    fontWeight: '600',
  },
  header2: {
    ...typography.Baseline,
    fontSize: fontSize.xlarge,
    lineHeight: 48,
    fontWeight: '700',
  },
  header3: {
    ...typography.Baseline,
    fontSize: fontSize.bigger,
    lineHeight: 42,
    fontWeight: '700',
  },
  header4: {
    ...typography.Baseline,
    fontSize: fontSize.big,
    lineHeight: 42,
    fontWeight: '700',
  },
  title1: {
    ...typography.Baseline,
    fontSize: fontSize.huge,
    fontWeight: '700',
  },
  title2: {
    ...typography.Baseline,
    fontSize: fontSize.large,
    fontWeight: '700',
  },
  title3: {
    ...typography.Baseline,
    fontSize: fontSize.medium,
    fontWeight: '700',
  },
  huge: {
    ...typography.Baseline,
    fontSize: fontSize.huge,
    fontWeight: '400',
  },
  big: {
    ...typography.Baseline,
    fontSize: fontSize.big,
    fontWeight: '400',
  },
  large: {
    ...typography.Baseline,
    fontSize: fontSize.large,
    fontWeight: '400',
  },
  caption: {
    ...typography.Baseline,
    fontSize: fontSize.jumbo,
    fontWeight: '400',
    lineHeight: 32,
  },
  baseline: {
    ...typography.Baseline,
  },
  small: {
    ...typography.Baseline,
    fontSize: fontSize.small,
    fontWeight: '400',
  },
  tiny: {
    ...typography.Baseline,
    fontSize: fontSize.tiny,
    fontWeight: '400',
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
});

export default Text;
