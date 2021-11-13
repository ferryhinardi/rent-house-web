import { TextStyle } from 'react-native';

export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  red: '#F75B60',
  dark: '#03121A',
  grey: '#CDD0D1',
  darkGrey: '#D3D4DD',
  lightGrey: '#FBFBFB',
  gold: '#D69E2E',
  blue: '#1A365D',
  pink: '#FFF7F5',
  google: '#E2E8F0',
  fb: '#385898',
  frame: '#F8F8F8',
  rynaBlack: '#202020',
  rynaBlue: '#1C2B4F',
  rynaGray: '#F2F2F2',
  rynaYellow: '#F5C010',
  rynaLink: '#5F7CC1',
  textDarkGrey: '#636363',
  rynaYellowLight: '#FBE59F',
};
export const spacing = {
  xxs: 4,
  xs: 8,
  s: 12,
  m: 16,
  ml: 20,
  l: 24,
  xl: 32,
  xxm: 36,
  xxl: 40,
  xxxl: 48,
  xxxxl: 56,
  xxxxxl: 64,
};
export const border = {
  width: {
    thin: 0.5,
    thick: 1,
    bold: 2,
  },
  radius: {
    default: 8,
    extra: 64,
    rounded: '50%',
  },
};

export const animation = {
  timing: {
    instant: 200,
    normal: 300,
    slow: 500,
  },
};

export const fontSize = {
  super: 60,
  gigantic: 48,
  xlarge: 36,
  huge: 32,
  bigger: 28,
  big: 24,
  large: 20,
  jumbo: 18,
  medium: 16,
  small: 14,
  tiny: 12,
  micro: 11,
};

// Text Typography

const textWeightRegularStyle: TextStyle = {
  fontFamily: 'Playfair Display',
  fontWeight: '400',
};

export const typography = {
  Baseline: {
    // common usage: paragraph, list,  cell text
    // common usage for component in normal size: input value/placeholder, tooltip text, snackbar message, button
    fontSize: fontSize.medium,
    lineHeight: 24,
    ...textWeightRegularStyle,
  },
  abelFont: {
    // used for button, paragraph, caption
    fontFamily: 'Abel',
  },
  playfairFont: {
    // used for headline
    fontFamily: 'Playfair Display',
  },

  playball: {
    // used for special headline (cursive)
    fontFamily: 'Playball',
  },

  tenorSans: {
    // used in footer
    fontFamily: 'Tenor Sans',
  },
};
