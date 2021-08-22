import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'core/base';
import { Token } from 'core';

type Props = {
  variant?: 'info' | 'alert';
  text: string;
};

export default function Badge({ text, variant = 'info' }: Props) {
  let borderColor, inkVariant: React.ComponentProps<typeof Text>['ink'];

  switch (variant) {
    case 'alert':
      borderColor = Token.colors.red;
      inkVariant = 'alert';
      break;
    case 'info':
      borderColor = Token.colors.rynaBlue;
    default:
      break;
  }

  return (
    <View style={[styles.container, { borderColor }]}>
      <Text variant="tiny" ink={inkVariant}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Token.border.radius.extra,
    borderWidth: Token.border.width.thin,
    paddingVertical: Token.spacing.xs,
    paddingHorizontal: Token.spacing.s,
  },
});
