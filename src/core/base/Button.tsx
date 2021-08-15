import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { spacing, colors, border } from './Token';
import Text from './Text';

type Props = React.ComponentProps<typeof Pressable> & {
  text: string;
  variant?: 'primary' | 'secondary';
};

function Button({ text, variant = 'primary', style, ...restProps }: Props) {
  let buttonStyle = {}, textStyle = {};

  switch (variant) {
  case 'primary':
  default:
    buttonStyle = { backgroundColor: colors.blue };
    textStyle = { color: colors.white };
    break;
  case 'secondary':
    buttonStyle = { backgroundColor: colors.gold };
    break;
  }

  return (
    <Pressable {...restProps} style={StyleSheet.flatten([styles.container, style, buttonStyle])}>
      <Text style={textStyle}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 150,
    alignItems: 'center',
    borderRadius: border.radius.extra,
    paddingVertical: spacing.m,
  },
});

export default Button;
