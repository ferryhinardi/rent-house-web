import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { spacing, colors, typography, fontSize } from './Token';

export type Props = {
  text: string;
  errorMessageId?: string;
};

export default function ErrorMessage(props: Props) {
  return (
    <View nativeID={props.errorMessageId} style={styles.container}>
      <Text style={styles.error} numberOfLines={3}>
        {props.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  error: {
    ...typography.Baseline,
    color: colors.red,
    fontSize: fontSize.tiny
  },
});
