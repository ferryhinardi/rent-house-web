import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'core/base';
import { Token } from 'core';

type Props = {
  variant?: 'info' | 'alert' | 'neutral';
  text: string;
};

export default function Badge({ text, variant = 'info' }: Props) {
  let borderColor, inkVariant: React.ComponentProps<typeof Text>['ink'];

  switch (variant) {
    case 'alert':
      borderColor = Token.colors.red;
      inkVariant = 'alert';
      break;
    case 'neutral':
      borderColor = Token.colors.darkGrey;
      inkVariant = 'neutral';
      break;
    case 'info':
      borderColor = Token.colors.black;
      break;
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
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Token.border.radius.extra,
    borderWidth: Token.border.width.thin,
    paddingVertical: Token.spacing.xs,
    paddingHorizontal: Token.spacing.s,
  },
});
