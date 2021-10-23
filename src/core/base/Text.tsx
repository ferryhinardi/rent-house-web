import React from 'react';
import { StyleSheet, Text as RNText, TextProps } from 'react-native';
import { fontSize, colors, typography } from './Token';

interface Props extends TextProps {
  children: React.ReactNode;
  variant?:
    | 'headline-1'
    | 'header-1'
    | 'header-2'
    | 'header-3'
    | 'header-4'
    | 'body'
    | 'button'
    | 'large'
    | 'small'
    | 'caption';
  ink?: 'normal' | 'light' | 'primary' | 'secondary' | 'caption' | 'neutral' | 'dark' | 'alert' | 'link';
  font?: 'standard' | 'playfair';
}

function Text({ children, variant = 'caption', ink = 'normal', style, font, ...restProps }: Props) {
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
    case 'headline-1':
      variantStyle = StyleSheet.flatten([variantStyle, styles.headline1]);
      break;
    case 'header-1':
      variantStyle = StyleSheet.flatten([variantStyle, styles.header1]);
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
    case 'large':
      variantStyle = StyleSheet.flatten([variantStyle, styles.large]);
      break;
    case 'body':
      variantStyle = StyleSheet.flatten([variantStyle, styles.body]);
      break;
    case 'button':
      variantStyle = StyleSheet.flatten([variantStyle, styles.button]);
      break;
    case 'small':
      variantStyle = StyleSheet.flatten([variantStyle, styles.small]);
      break;
    case 'caption':
      variantStyle = StyleSheet.flatten([variantStyle, styles.caption]);
      break;
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
  headline1: {
    ...typography.Baseline,
    fontSize: fontSize.super,
    lineHeight: 80,
    fontWeight: '700',
  },
  header1: {
    ...typography.Baseline,
    fontSize: fontSize.gigantic,
    lineHeight: 48,
    fontWeight: '600',
  },
  header2: {
    ...typography.Baseline,
    fontSize: fontSize.xlarge,
    lineHeight: 48,
    fontWeight: '600',
  },
  header3: {
    ...typography.Baseline,
    fontSize: fontSize.bigger,
    lineHeight: 42,
    fontWeight: '700',
  },
  header4: {
    ...typography.Baseline,
    fontSize: fontSize.jumbo,
    lineHeight: 18,
    fontWeight: '600',
  },
  body: {
    fontSize: fontSize.medium,
    lineHeight: 28,
  },
  button: {
    fontSize: fontSize.medium,
    lineHeight: 16,
    fontWeight: '600',
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
  large: {
    fontSize: fontSize.large,
    fontWeight: '400',
  },
  small: {
    fontSize: fontSize.tiny,
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
