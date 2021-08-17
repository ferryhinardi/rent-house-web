import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { spacing, colors, border } from './Token';
import Text from './Text';

type Props = React.ComponentProps<typeof Pressable> & {
  text: string;
  variant?: 'primary' | 'secondary';
};

function Button({ text, variant = 'primary', style, ...restProps }: Props) {
  let buttonStyle = {}, textInk: React.ComponentProps<typeof Text>['ink'];

  switch (variant) {
  case 'primary':
  default:
    buttonStyle = { backgroundColor: colors.blue };
    textInk = 'light';
    break;
  case 'secondary':
    buttonStyle = { backgroundColor: colors.gold };
    break;
  }

  return (
    <Pressable {...restProps} style={StyleSheet.flatten([styles.container, style, buttonStyle])}>
      <Text ink={textInk}>{text}</Text>
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
