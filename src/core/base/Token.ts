import { TextStyle } from 'react-native';

export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  red: '#F4555A',
  dark: '#03121A',
  grey: '#CDD0D1',
  gold: '#D69E2E',
  blue: '#1A365D',
  pink: '#FFF7F5',
  google: '#E2E8F0',
  fb: '#385898',
};
export const spacing = {
  xxs: 4,
  xs: 8,
  s: 12,
  m: 16,
  ml: 20,
  l: 24,
  xl: 32,
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
    default: 6,
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
  huge: 32,
  big: 24,
  large: 20,
  medium: 16,
  small: 14,
  tiny: 12,
  micro: 11,
};

// Text Typography

const textWeightRegularStyle: TextStyle = {
  fontFamily: 'System',
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
}
